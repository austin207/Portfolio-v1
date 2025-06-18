// app/blog/[slug]/page.tsx

import { notFound } from "next/navigation"
import { getPostBySlug } from "@/lib/data/blog-posts"
import { BlogPost } from "@/components/blog/blog-post"

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug)
  
  if (!post) {
    notFound()
  }

  return <BlogPost post={post} />
}
