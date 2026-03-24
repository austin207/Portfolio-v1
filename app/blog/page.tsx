// NO "use client" directive - this is a server component
import BlogServer from "./blog-server";
import { generateSEO } from "@/lib/seo"

export const metadata = generateSEO({
  title: "Technical Blog",
  description: "In-depth articles on robotics, AI/ML, embedded systems, web development, and automation by Antony Austin.",
  url: "https://antonyaustin.site/blog",
  keywords: ["tech blog", "robotics blog", "AI ML articles", "embedded systems tutorials", "Antony Austin blog"],
})

export default function BlogPage() {
  return <BlogServer />;
}
  