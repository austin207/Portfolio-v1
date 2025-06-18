import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  category: string;
  tags: string[];
  readingTime: number;
  featured: boolean;
  image: string;
  slug: string;
}

// Server-side function to read markdown files
export async function getBlogPostsFromMarkdown(): Promise<BlogPost[]> {
  try {
    const postsDirectory = path.join(process.cwd(), 'content/blog');
    
    if (!fs.existsSync(postsDirectory)) {
      console.log('Blog directory does not exist:', postsDirectory);
      return [];
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
          excerpt: data.excerpt || content.slice(0, 200).replace(/#+\s/g, '') + '...',
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

    return allPosts.sort((a, b) => 
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  } catch (error) {
    console.error('Error reading blog posts:', error);
    return [];
  }
}

// Fallback static data for immediate functionality
export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "The Ultimate n8n Automation Guide",
    excerpt: "This guide takes you from automation fundamentals to building complex AI-powered agents using n8n. Learn workflow creation, API integrations, and advanced automation techniques.",
    content: `## The Ultimate n8n Automation Guide

### Introduction to n8n Automation

n8n is a powerful workflow automation tool that revolutionizes how we handle repetitive tasks and complex integrations. This comprehensive guide will take you through everything from basic concepts to advanced AI-powered automation strategies.

### Core Concepts

**Workflow Automation Fundamentals:**
- Node-based visual editor for creating automation flows
- 600+ pre-built integrations with popular services
- Self-hosting capabilities for complete data control
- Webhook support for real-time event handling

### Building Your First Automation

The foundation of any n8n workflow consists of trigger nodes and action nodes connected in logical sequences. Start with simple automations like email notifications or data synchronization between platforms.

### Advanced Techniques

**AI Integration Strategies:**
- Connect large language models for content generation
- Implement decision trees with conditional logic
- Create multi-step workflows with error handling
- Build agentic systems that can make autonomous decisions

### Best Practices

- Always implement proper error handling
- Use environment variables for sensitive data
- Test workflows thoroughly before production deployment
- Monitor automation performance and optimize bottlenecks

This guide provides the foundation for creating sophisticated automation systems that scale with your needs.`,
    author: "Austin",
    publishedAt: "2025-06-18",
    category: "AI Automation", 
    tags: ["n8n", "AI Automation", "Agentic AI", "Workflow"],
    readingTime: 15,
    featured: true,
    image: "/blog-images/n8n-automation.jpg",
    slug: "n8n-automation-guide"
  },
  {
    id: "2",
    title: "Modern React Patterns with TypeScript",
    excerpt: "Explore advanced React patterns, custom hooks, and TypeScript integration for building scalable web applications with better developer experience.",
    content: `## Modern React Patterns with TypeScript

### Component Composition Strategies

Modern React development emphasizes composition over inheritance, creating reusable and maintainable component architectures.

### Custom Hooks and State Management

Learn to extract component logic into custom hooks, improving code reusability and testing capabilities.

### TypeScript Integration Best Practices

Implement proper TypeScript patterns for React components, ensuring type safety and excellent developer experience.`,
    author: "Austin",
    publishedAt: "2025-06-15",
    category: "Web Development",
    tags: ["React", "TypeScript", "Frontend", "Patterns"],
    readingTime: 8,
    featured: false,
    image: "/blog-images/react-typescript.jpg",
    slug: "react-typescript-patterns"
  },
  {
    id: "3",
    title: "Robotics Control Systems Design",
    excerpt: "Deep dive into control theory applications in robotics, covering PID controllers, state-space methods, and real-world implementation strategies.",
    content: `## Robotics Control Systems Design

### Control Theory Fundamentals

Understanding the mathematical foundations of control systems is crucial for robotics applications.

### PID Controller Implementation

Learn to design and tune PID controllers for various robotic systems, from simple motor control to complex multi-joint manipulators.

### Advanced Control Strategies

Explore state-space methods, optimal control, and adaptive control techniques for sophisticated robotic systems.`,
    author: "Austin",
    publishedAt: "2025-06-10",
    category: "Robotics",
    tags: ["Robotics", "Control Systems", "PID", "Engineering"],
    readingTime: 12,
    featured: true,
    image: "/blog-images/robotics-control.jpg",
    slug: "robotics-control-systems"
  }
];

export async function getFeaturedPosts(): Promise<BlogPost[]> {
  try {
    const posts = await getBlogPostsFromMarkdown();
    return posts.length > 0 ? posts.filter(post => post.featured) : blogPosts.filter(post => post.featured);
  } catch (error) {
    return blogPosts.filter(post => post.featured);
  }
}

export async function getAllPosts(): Promise<BlogPost[]> {
  try {
    const posts = await getBlogPostsFromMarkdown();
    return posts.length > 0 ? posts : blogPosts;
  } catch (error) {
    return blogPosts;
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | undefined> {
  try {
    const posts = await getBlogPostsFromMarkdown();
    return posts.length > 0 
      ? posts.find(post => post.slug === slug)
      : blogPosts.find(post => post.slug === slug);
  } catch (error) {
    return blogPosts.find(post => post.slug === slug);
  }
}
