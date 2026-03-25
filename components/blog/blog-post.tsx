"use client"

import { MarkdownRenderer } from "./markdown-renderer"
import { format } from "date-fns"
import { ArrowLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import type { BlogPost as BlogPostType } from "@/lib/data/blog-posts"

interface BlogPostProps {
  post: BlogPostType
}

export const BlogPost = ({ post }: BlogPostProps) => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-[800px] mx-auto px-6 py-24">
        <Link href="/blog" className="inline-flex items-center gap-2 text-[13px] text-muted-foreground hover:text-foreground transition-colors mb-16">
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Blog
        </Link>

        <article>
          <header className="mb-12">
            <h1 className="text-3xl font-bold text-foreground tracking-tight mb-6">{post.title}</h1>
            <div className="flex items-center gap-4 font-mono text-[11px] text-muted-foreground mb-6">
              <span>{post.author || "Austin"}</span>
              <span>·</span>
              <time dateTime={post.date}>{format(new Date(post.date), "MMM dd, yyyy")}</time>
              {post.readingTime && <><span>·</span><span>{post.readingTime} min</span></>}
            </div>
            {post.tags && post.tags.length > 0 && (
              <div className="flex gap-3 font-mono text-[10px] text-muted-foreground">
                {post.tags.map((tag, i) => <span key={i}>{tag}</span>)}
              </div>
            )}
            {post.image && (
              <div className="relative aspect-video mt-8 border border-border">
                <Image src={post.image} alt={post.title} fill className="object-cover" priority />
              </div>
            )}
          </header>
          <div className="border border-border p-8">
            <MarkdownRenderer content={post.content} />
          </div>
        </article>
      </div>
    </div>
  )
}

export default BlogPost
