// Server Component - NO "use client" directive
import { getAllPosts, getFeaturedPosts } from "@/lib/data/blog-posts";
import BlogClient from "./blog-client"

export default async function BlogServer() {
  // Server-side data fetching
  const allPosts = await getAllPosts();
  const featuredPosts = await getFeaturedPosts();

  // Pass data to client component
  return <BlogClient allPosts={allPosts} featuredPosts={featuredPosts} />;
}
