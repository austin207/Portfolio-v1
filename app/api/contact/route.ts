import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

export const runtime = "nodejs";

// Required environment variables:
// GMAIL_CLIENT_ID=your_client_id
// GMAIL_CLIENT_SECRET=your_client_secret
// GMAIL_REDIRECT_URI=http://localhost:3000 (NO trailing slash)
// GMAIL_REFRESH_TOKEN=your_refresh_token
// GMAIL_SENDER=your_gmail_address@gmail.com
// GMAIL_RECEIVER=recipient_address@gmail.com

// Environment variable validation function
function validateEnvironmentVariables(): { isValid: boolean; missingVars: string[] } {
  const requiredVars = [
    'GMAIL_CLIENT_ID',
    'GMAIL_CLIENT_SECRET', 
    'GMAIL_REDIRECT_URI',
    'GMAIL_REFRESH_TOKEN',
    'GMAIL_SENDER',
    'GMAIL_RECEIVER'
  ];
  
  const missingVars = requiredVars.filter(varName => !process.env[varName]);
  return {
    isValid: missingVars.length === 0,
    missingVars
  };
}

// Input validation function
function validateContactInput(data: any): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (!data.name || typeof data.name !== 'string' || data.name.trim().length < 2) {
    errors.push('Name must be at least 2 characters long');
  }
  
  if (!data.email || typeof data.email !== 'string' || !data.email.includes('@')) {
    errors.push('Valid email address is required');
  }
  
  if (!data.subject || typeof data.subject !== 'string' || data.subject.trim().length < 3) {
    errors.push('Subject must be at least 3 characters long');
  }
  
  if (!data.message || typeof data.message !== 'string' || data.message.trim().length < 10) {
    errors.push('Message must be at least 10 characters long');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

export async function POST(req: NextRequest) {
  console.log('=== Gmail API Contact Form Debug ===');
  
  try {
    // Validate environment variables first
    const envValidation = validateEnvironmentVariables();
    if (!envValidation.isValid) {
      console.error('Missing environment variables:', envValidation.missingVars);
      return NextResponse.json(
        { 
          success: false, 
          error: 'Server configuration error - missing environment variables',
          details: envValidation.missingVars 
        }, 
        { status: 500 }
      );
    }

    // Log configuration (without exposing secrets)
    console.log('Environment check:');
    console.log('- Client ID configured:', !!process.env.GMAIL_CLIENT_ID);
    console.log('- Client Secret configured:', !!process.env.GMAIL_CLIENT_SECRET);
    console.log('- Redirect URI:', process.env.GMAIL_REDIRECT_URI);
    console.log('- Refresh Token configured:', !!process.env.GMAIL_REFRESH_TOKEN);
    console.log('- Sender email:', process.env.GMAIL_SENDER);
    console.log('- Receiver email:', process.env.GMAIL_RECEIVER);

    // Parse and validate request body
    const requestBody = await req.json();
    const inputValidation = validateContactInput(requestBody);
    
    if (!inputValidation.isValid) {
      console.error('Input validation failed:', inputValidation.errors);
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid input data',
          details: inputValidation.errors 
        }, 
        { status: 400 }
      );
    }

    const { name, email, subject, message } = requestBody;
    console.log('Processing contact form submission from:', email);

    // Configure OAuth2 client with proper error handling
    const oAuth2Client = new google.auth.OAuth2(
      process.env.GMAIL_CLIENT_ID,
      process.env.GMAIL_CLIENT_SECRET,
      process.env.GMAIL_REDIRECT_URI
    );

    // Set credentials and handle token refresh
    oAuth2Client.setCredentials({ 
      refresh_token: process.env.GMAIL_REFRESH_TOKEN 
    });

    // Initialize Gmail API
    const gmail = google.gmail({ version: "v1", auth: oAuth2Client });

    // Construct the email with proper headers
    const rawMessage = [
      `From: "${name}" <${process.env.GMAIL_SENDER}>`,
      `Reply-To: ${email}`,
      `To: ${process.env.GMAIL_RECEIVER}`,
      `Subject: [Portfolio Contact] ${subject}`,
      "Content-Type: text/plain; charset=utf-8",
      "MIME-Version: 1.0",
      "",
      `Portfolio Contact Form Submission`,
      `====================================`,
      "",
      `Name: ${name}`,
      `Email: ${email}`,
      `Subject: ${subject}`,
      "",
      `Message:`,
      `--------`,
      message,
      "",
      `Sent from: ${req.url}`,
      `User Agent: ${req.headers.get('user-agent') || 'Unknown'}`,
      `Timestamp: ${new Date().toISOString()}`
    ].join("\n");

    // Base64 encode the message (URL-safe)
    const encodedMessage = Buffer.from(rawMessage)
      .toString("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");

    console.log('Attempting to send email via Gmail API...');

    // Send the email with comprehensive error handling
    const response = await gmail.users.messages.send({
      userId: "me",
      requestBody: {
        raw: encodedMessage,
      },
    });

    console.log('Email sent successfully:', response.data.id);

    return NextResponse.json({ 
      success: true, 
      messageId: response.data.id,
      message: 'Email sent successfully'
    });

  } catch (error: any) {
    console.error("=== Gmail API Error Details ===");
    console.error("Error type:", error.constructor.name);
    console.error("Error message:", error.message);
    console.error("Error code:", error.code);
    console.error("Error status:", error.status);
    
    if (error.response) {
      console.error("Response status:", error.response.status);
      console.error("Response data:", error.response.data);
    }

    // Handle specific OAuth2 errors
    if (error.message.includes('invalid_grant')) {
      console.error('OAuth2 Error: Refresh token is invalid or expired');
      return NextResponse.json(
        { 
          success: false, 
          error: 'Authentication failed - refresh token expired',
          details: 'Please regenerate OAuth2 tokens in Google Cloud Console'
        }, 
        { status: 401 }
      );
    }

    if (error.message.includes('unauthorized_client')) {
      console.error('OAuth2 Error: Client credentials are invalid');
      return NextResponse.json(
        { 
          success: false, 
          error: 'Authentication failed - unauthorized client',
          details: 'Check OAuth2 client configuration and redirect URI'
        }, 
        { status: 401 }
      );
    }

    if (error.message.includes('invalid_scope')) {
      console.error('OAuth2 Error: Invalid API scope');
      return NextResponse.json(
        { 
          success: false, 
          error: 'Authentication failed - invalid scope',
          details: 'Ensure Gmail API scope is correctly configured'
        }, 
        { status: 401 }
      );
    }

    if (error.code === 'ENOTFOUND' || error.code === 'ECONNREFUSED') {
      console.error('Network Error: Cannot reach Gmail API');
      return NextResponse.json(
        { 
          success: false, 
          error: 'Network connection failed',
          details: 'Unable to connect to Gmail API servers'
        }, 
        { status: 503 }
      );
    }

    // Generic error handling
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to send email', 
        details: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
      }, 
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const postsDirectory = path.join(process.cwd(), 'content/blog');
    
    if (!fs.existsSync(postsDirectory)) {
      console.log('Blog posts directory does not exist:', postsDirectory);
      return NextResponse.json([]);
    }

    const fileNames = fs.readdirSync(postsDirectory);
    console.log('Found blog files:', fileNames.length);
    
    const allPosts = fileNames
      .filter(fileName => fileName.endsWith('.md'))
      .map((fileName, index) => {
        try {
          const slug = fileName.replace(/\.md$/, '');
          const fullPath = path.join(postsDirectory, fileName);
          const fileContents = fs.readFileSync(fullPath, 'utf8');
          const { data, content } = matter(fileContents);
          const readingStats = readingTime(content);

          return {
            id: (index + 1).toString(),
            title: data.title || 'Untitled',
            excerpt: data.excerpt || content.slice(0, 200) + '...',
            content,
            author: data.author || 'Austin',
            publishedAt: data.date || new Date().toISOString(),
            category: data.category || 'General',
            tags: Array.isArray(data.tags) ? data.tags : [],
            readingTime: Math.ceil(readingStats.minutes),
            featured: Boolean(data.featured),
            image: data.image || '/blog-images/default.jpg',
            slug
          };
        } catch (fileError) {
          console.error('Error processing blog file:', fileName, fileError);
          return null;
        }
      })
      .filter(post => post !== null) // Remove failed posts
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()); // Sort by date

    console.log('Processed blog posts:', allPosts.length);
    return NextResponse.json(allPosts);

  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog posts' }, 
      { status: 500 }
    );
  }
}
