import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

export const runtime = "nodejs";

// You must set these in your .env file:
// GMAIL_CLIENT_ID=...
// GMAIL_CLIENT_SECRET=...
// GMAIL_REDIRECT_URI=...
// GMAIL_REFRESH_TOKEN=...
// GMAIL_SENDER=your_gmail_address@gmail.com
// GMAIL_RECEIVER=recipient_address@gmail.com

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json();

    const oAuth2Client = new google.auth.OAuth2(
      process.env.GMAIL_CLIENT_ID,
      process.env.GMAIL_CLIENT_SECRET,
      process.env.GMAIL_REDIRECT_URI
    );
    oAuth2Client.setCredentials({ refresh_token: process.env.GMAIL_REFRESH_TOKEN });

    const gmail = google.gmail({ version: "v1", auth: oAuth2Client });

    // Construct the email
    const rawMessage = [
      `From: "${name}" <${process.env.GMAIL_SENDER}>`,
      `To: ${process.env.GMAIL_RECEIVER}`,
      `Subject: [Portfolio Contact] ${subject}`,
      "Content-Type: text/plain; charset=utf-8",
      "",
      `Name: ${name}`,
      `Email: ${email}`,
      "",
      message,
    ].join("\n");

    // Base64 encode the message
    const encodedMessage = Buffer.from(rawMessage)
      .toString("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");

    // Send the email
    await gmail.users.messages.send({
      userId: "me",
      requestBody: {
        raw: encodedMessage,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending email via Gmail API:", error);
    return NextResponse.json({ success: false, error: "Failed to send email" }, { status: 500 });
  }
}



export async function GET() {
  const postsDirectory = path.join(process.cwd(), 'content/blog');
  
  if (!fs.existsSync(postsDirectory)) {
    return NextResponse.json([]);
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const allPosts = fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map((fileName, index) => {
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
        tags: data.tags || [],
        readingTime: Math.ceil(readingStats.minutes),
        featured: data.featured || false,
        image: data.image || '/blog-images/default.jpg',
        slug
      };
    });

  return NextResponse.json(allPosts);
}