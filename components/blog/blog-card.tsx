import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import type { BlogPost } from "@/lib/data/blog-posts"

interface BlogCardProps {
  post: BlogPost
  featured?: boolean
}

export default function BlogCard({ post, featured = false }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className={`group block border border-border hover:border-foreground/20 transition-colors ${featured ? "md:col-span-2" : ""}`}>
      <div className="p-5">
        <div className="flex items-center justify-between mb-3">
          <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">{post.category}</span>
          <div className="flex items-center gap-3 font-mono text-[10px] text-muted-foreground">
            <span>{post.readingTime} min</span>
            <span>{new Date(post.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
          </div>
        </div>
        <h3 className={`text-foreground font-medium leading-tight mb-2 group-hover:opacity-70 transition-opacity ${featured ? "text-lg" : "text-[15px]"}`}>
          {post.title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>
      </div>
    </Link>
  )
}
