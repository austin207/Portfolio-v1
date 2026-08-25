// Server Component - NO "use client" directive
import { getAllPosts, getFeaturedPosts } from "@/lib/data/blog-posts";
import BlogClient from "./blog-client"
import JsonLd from "@/components/json-ld"
import { blogListingGraph } from "@/lib/seo"

export default async function BlogServer() {
  // Server-side data fetching
  const allPosts = await getAllPosts();
  const featuredPosts = await getFeaturedPosts();

  // Pass data to client component
  return (
    <>
      <JsonLd data={blogListingGraph(allPosts)} />
      <BlogClient allPosts={allPosts} featuredPosts={featuredPosts} />
    </>
  );
}
