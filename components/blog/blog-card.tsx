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
      className={`overflow-hidden bg-gray-800/50 border-gray-700 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-900/20 hover:-translate-y-1 ${cardClass}`}
    >
      <div className={`relative ${featured ? "h-48 sm:h-64" : "h-36 sm:h-48"} overflow-hidden`}>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent z-10 opacity-60"></div>
        <img
          src={post.image || "/placeholder.svg"}
          alt={post.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute top-2 sm:top-4 left-2 sm:left-4 z-20">
          <Badge variant="outline" className="bg-purple-950/80 text-purple-400 border-purple-800 text-xs">
            {post.category}
          </Badge>
        </div>
        {featured && (
          <div className="absolute top-2 sm:top-4 right-2 sm:right-4 z-20">
            <Badge className="bg-gradient-to-r from-cyan-600 to-purple-600 text-white text-xs">Featured</Badge>
          </div>
        )}
      </div>
      <CardContent className="pt-3 sm:pt-6">
        <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs text-gray-400 mb-2 sm:mb-3">
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
            <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
            <span>{post.readingTime} min</span>
          </div>
        </div>
        <h3
          className={`font-semibold mb-2 sm:mb-3 text-cyan-400 line-clamp-2 ${featured ? "text-lg sm:text-2xl" : "text-base sm:text-xl"}`}
        >
          {post.title}
        </h3>
        <p
          className={`text-gray-300 mb-3 sm:mb-4 ${featured ? "text-sm sm:text-base line-clamp-3" : "text-xs sm:text-sm line-clamp-2"}`}
        >
          {post.excerpt}
        </p>
        <div className="flex flex-wrap gap-1 sm:gap-2 mb-3 sm:mb-4">
          {post.tags.slice(0, featured ? 3 : 2).map((tag, index) => (
            <Badge
              key={index}
              variant="outline"
              className="bg-gray-700/50 text-gray-300 border-gray-600 text-xs px-1.5 py-0.5"
            >
              {tag}
            </Badge>
          ))}
          {post.tags.length > (featured ? 3 : 2) && (
            <Badge variant="outline" className="bg-gray-700/50 text-gray-300 border-gray-600 text-xs px-1.5 py-0.5">
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
