import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock } from "lucide-react"
import type { BlogPost } from "@/lib/data/blog-posts"

interface BlogCardProps {
  post: BlogPost
  featured?: boolean
}

export default function BlogCard({ post, featured = false }: BlogCardProps) {
  const cardClass = featured ? "md:col-span-2 lg:col-span-2" : ""

  return (
    <Card
      className={`overflow-hidden glass-card-hover gradient-border transition-all duration-300 hover:-translate-y-1 ${cardClass}`}
    >
      <div className={`relative ${featured ? "h-48 sm:h-64" : "h-36 sm:h-48"} overflow-hidden`}>
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10 opacity-60"></div>
        <img
          src={post.image || "/placeholder.svg"}
          alt={post.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute top-2 sm:top-4 left-2 sm:left-4 z-20">
          <Badge variant="outline" className="px-3 py-1.5 text-xs rounded-full bg-cyan-500/[0.06] text-cyan-400/80 border-cyan-500/10 font-mono">
            {post.category}
          </Badge>
        </div>
        {featured && (
          <div className="absolute top-2 sm:top-4 right-2 sm:right-4 z-20">
            <Badge className="px-3 py-1.5 text-xs rounded-full bg-cyan-500/10 text-cyan-400 border-cyan-500/20">Featured</Badge>
          </div>
        )}
      </div>
      <CardContent className="pt-3 sm:pt-6">
        <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs text-muted-foreground mb-2 sm:mb-3 font-mono">
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3 sm:h-4 sm:w-4 text-cyan-400/40" />
            <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-cyan-400/40" />
            <span>{post.readingTime} min</span>
          </div>
        </div>
        <h3
          className={`font-semibold mb-2 sm:mb-3 text-foreground tracking-tight line-clamp-2 group-hover:text-cyan-400 transition-colors ${featured ? "text-lg sm:text-2xl" : "text-base sm:text-xl"}`}
        >
          {post.title}
        </h3>
        <p
          className={`text-muted-foreground mb-3 sm:mb-4 ${featured ? "text-sm sm:text-base line-clamp-3" : "text-xs sm:text-sm line-clamp-2"}`}
        >
          {post.excerpt}
        </p>
        <div className="flex flex-wrap gap-1 sm:gap-2 mb-3 sm:mb-4">
          {post.tags.slice(0, featured ? 3 : 2).map((tag, index) => (
            <Badge
              key={index}
              variant="outline"
              className="px-3 py-1.5 text-xs rounded-full bg-cyan-500/[0.06] text-cyan-400/80 border-cyan-500/10 font-mono"
            >
              {tag}
            </Badge>
          ))}
          {post.tags.length > (featured ? 3 : 2) && (
            <Badge variant="outline" className="px-3 py-1.5 text-xs rounded-full bg-white/[0.03] text-muted-foreground border-white/[0.06] font-mono">
              +{post.tags.length - (featured ? 3 : 2)} more
            </Badge>
          )}
        </div>
        <Link href={`/blog/${post.slug}`}>
          <div className="text-cyan-400 hover:text-cyan-300 transition-colors font-medium text-xs sm:text-sm">
            Read More →
          </div>
        </Link>
      </CardContent>
    </Card>
  )
}
