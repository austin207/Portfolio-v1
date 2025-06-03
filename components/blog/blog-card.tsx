import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, User } from "lucide-react"
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
      <div className={`relative ${featured ? "h-64" : "h-48"} overflow-hidden`}>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent z-10 opacity-60"></div>
        <img src={post.image || "/placeholder.svg"} alt={post.title} className="w-full h-full object-cover" />
        <div className="absolute top-4 left-4 z-20">
          <Badge variant="outline" className="bg-purple-950/80 text-purple-400 border-purple-800">
            {post.category}
          </Badge>
        </div>
        {featured && (
          <div className="absolute top-4 right-4 z-20">
            <Badge className="bg-gradient-to-r from-cyan-600 to-purple-600 text-white">Featured</Badge>
          </div>
        )}
      </div>
      <CardContent className="pt-6">
        <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{post.readingTime} min read</span>
          </div>
          <div className="flex items-center gap-1">
            <User className="h-4 w-4" />
            <span>{post.author}</span>
          </div>
        </div>
        <h3 className={`font-semibold mb-3 text-cyan-400 line-clamp-2 ${featured ? "text-2xl" : "text-xl"}`}>
          {post.title}
        </h3>
        <p className={`text-gray-300 mb-4 ${featured ? "text-base line-clamp-3" : "text-sm line-clamp-2"}`}>
          {post.excerpt}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.slice(0, featured ? 5 : 3).map((tag, index) => (
            <Badge key={index} variant="outline" className="bg-gray-700/50 text-gray-300 border-gray-600 text-xs">
              {tag}
            </Badge>
          ))}
          {post.tags.length > (featured ? 5 : 3) && (
            <Badge variant="outline" className="bg-gray-700/50 text-gray-300 border-gray-600 text-xs">
              +{post.tags.length - (featured ? 5 : 3)} more
            </Badge>
          )}
        </div>
        <Link href={`/blog/${post.slug}`}>
          <div className="text-cyan-400 hover:text-cyan-300 transition-colors font-medium text-sm">Read More →</div>
        </Link>
      </CardContent>
    </Card>
  )
}
