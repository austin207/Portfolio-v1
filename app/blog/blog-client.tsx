"use client"

import { useState, useMemo } from "react"
import { Search, Filter, X, Calendar, Clock, User, Tag, ArrowLeft, Home } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import Image from "next/image"
import { format } from "date-fns"

interface BlogPost {
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

interface BlogClientProps {
  allPosts: BlogPost[];
  featuredPosts: BlogPost[];
}

export default function BlogClient({ allPosts, featuredPosts }: BlogClientProps) {
  // ... (keep all your existing code)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  // Get unique categories and tags
  const categories = useMemo(() => {
    return Array.from(new Set(allPosts.map((post) => post.category)))
  }, [allPosts])

  const allTags = useMemo(() => {
    const tags = new Set<string>()
    allPosts.forEach((post) => {
      post.tags.forEach((tag) => tags.add(tag))
    })
    return Array.from(tags)
  }, [allPosts])

  // Filter posts based on search criteria
  const filteredPosts = useMemo(() => {
    let filtered = allPosts

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter((post) => post.category === selectedCategory)
    }

    // Filter by tags
    if (selectedTags.length > 0) {
      filtered = filtered.filter((post) =>
        selectedTags.some((tag) => post.tags.includes(tag))
      )
    }

    return filtered
  }, [allPosts, searchTerm, selectedCategory, selectedTags])

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    )
  }

  const clearFilters = () => {
    setSearchTerm("")
    setSelectedCategory(null)
    setSelectedTags([])
  }

  const hasActiveFilters = searchTerm || selectedCategory || selectedTags.length > 0

  return (
    <div className="min-h-screen bg-background relative">
      <div className="dot-grid fixed inset-0 pointer-events-none z-0" />
      <div className="relative z-10 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Back Navigation */}
          <div className="mb-8">
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground hover:bg-white/[0.04] transition-all duration-300 group"
              asChild
            >
              <Link href="/">
                <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
                <Home className="h-4 w-4 mr-2" />
                Back to Home
              </Link>
            </Button>
          </div>

          {/* Header */}
          <div className="text-left mb-12">
            <div className="flex items-center gap-4 mb-6">
              <div className="inline-flex items-center justify-center p-2 glass-card rounded-full border border-white/[0.06]">
                <Tag className="h-8 w-8 text-cyan-400" />
              </div>
              <div className="flex items-center gap-4 flex-1">
                <span className="font-mono text-cyan-400 text-sm">04</span>
                <div className="h-px flex-1 bg-white/[0.06]" />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-foreground tracking-tight">
              Technical Blog
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed">
              In-depth articles covering web development, AI/ML, robotics, and modern technology trends.
              Explore tutorials, insights, and technical deep-dives from my development journey.
            </p>
          </div>

          {/* Featured Posts */}
          {featuredPosts.length > 0 && (
            <div className="mb-16">
              <h2 className="text-2xl font-bold text-foreground mb-8 tracking-tight">
                Featured Articles
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredPosts.slice(0, 3).map((post, index) => (
                  <Card
                    key={post.id}
                    className="group rounded-2xl glass-card-hover gradient-border transition-all duration-500 hover:scale-[1.02] overflow-hidden"
                    style={{
                      animationDelay: `${index * 100}ms`,
                      animation: "fadeInUp 0.6s ease-out forwards"
                    }}
                  >
                    {post.image && (
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                      </div>
                    )}
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between mb-2">
                        <Badge className="px-3 py-1.5 text-xs rounded-full bg-cyan-500/[0.06] text-cyan-400/80 border border-cyan-500/10 font-mono">
                          {post.category}
                        </Badge>
                        <Badge className="px-3 py-1.5 text-xs rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                          Featured
                        </Badge>
                      </div>
                      <CardTitle className="text-foreground text-lg leading-tight group-hover:text-cyan-400 transition-colors duration-300">
                        <Link href={`/blog/${post.slug}`}>
                          {post.title}
                        </Link>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pb-4">
                      <p className="text-muted-foreground text-sm mb-4 leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            <span>{post.author}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            <span>{format(new Date(post.publishedAt), "MMM dd, yyyy")}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>{post.readingTime} min read</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {post.tags.slice(0, 3).map((tag, tagIndex) => (
                          <Badge
                            key={tagIndex}
                            variant="secondary"
                            className="px-3 py-1.5 text-xs rounded-full bg-cyan-500/[0.06] text-cyan-400/80 border border-cyan-500/10 font-mono"
                          >
                            {tag}
                          </Badge>
                        ))}
                        {post.tags.length > 3 && (
                          <Badge variant="outline" className="px-3 py-1.5 text-xs rounded-full bg-cyan-500/[0.06] text-cyan-400/80 border border-cyan-500/10 font-mono">
                            +{post.tags.length - 3}
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Search and Filters */}
          <div className="mb-12 space-y-8">
            {/* Search Input */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                type="text"
                placeholder="Search articles by title, content, author, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-4 py-4 glass-card border-white/[0.06] focus:border-cyan-500/30 focus:ring-2 focus:ring-cyan-500/20 text-foreground placeholder-muted-foreground text-lg rounded-xl transition-all duration-300"
              />
            </div>

            {/* Filters */}
            <div className="rounded-2xl glass-card border border-white/[0.06] p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-foreground flex items-center tracking-tight">
                  <Filter className="h-6 w-6 mr-3 text-cyan-400" />
                  Content Filters
                </h3>
                {hasActiveFilters && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clearFilters}
                    className="border-white/[0.06] text-muted-foreground hover:bg-cyan-500/10 hover:text-cyan-400 hover:border-cyan-500/20 rounded-full transition-all duration-300"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Clear All Filters
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Category Filter */}
                <div className="space-y-4">
                  <h4 className="text-xs font-mono text-cyan-400 uppercase tracking-wider">Category</h4>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <Badge
                        key={category}
                        variant={selectedCategory === category ? "default" : "outline"}
                        className={`cursor-pointer transition-all duration-300 rounded-full ${
                          selectedCategory === category
                            ? "bg-cyan-500/10 text-cyan-400 border-cyan-500/20"
                            : "bg-white/[0.03] text-muted-foreground border border-white/[0.06] hover:bg-white/[0.06] hover:text-foreground"
                        }`}
                        onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
                      >
                        {category}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Tags Filter */}
                <div className="space-y-4">
                  <h4 className="text-xs font-mono text-cyan-400 uppercase tracking-wider">Tags</h4>
                  <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto custom-scrollbar">
                    {allTags.map((tag) => (
                      <Badge
                        key={tag}
                        variant={selectedTags.includes(tag) ? "default" : "outline"}
                        className={`cursor-pointer transition-all duration-300 text-xs rounded-full ${
                          selectedTags.includes(tag)
                            ? "bg-cyan-500/10 text-cyan-400 border-cyan-500/20"
                            : "bg-white/[0.03] text-muted-foreground border border-white/[0.06] hover:bg-white/[0.06] hover:text-foreground"
                        }`}
                        onClick={() => toggleTag(tag)}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Results Count */}
            <div className="text-center">
              <p className="text-muted-foreground text-lg">
                Showing <span className="text-foreground font-semibold">{filteredPosts.length}</span> of{" "}
                <span className="text-foreground font-semibold">{allPosts.length}</span> articles
              </p>
            </div>
          </div>

          {/* All Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <Card
                key={post.id}
                className="group rounded-2xl glass-card-hover gradient-border transition-all duration-500 hover:scale-[1.02] overflow-hidden"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: "fadeInUp 0.6s ease-out forwards"
                }}
              >
                {post.image && (
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                  </div>
                )}
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <Badge className="px-3 py-1.5 text-xs rounded-full bg-cyan-500/[0.06] text-cyan-400/80 border border-cyan-500/10 font-mono">
                      {post.category}
                    </Badge>
                  </div>
                  <CardTitle className="text-foreground text-lg leading-tight group-hover:text-cyan-400 transition-colors duration-300">
                    <Link href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pb-4">
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>{format(new Date(post.publishedAt), "MMM dd")}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{post.readingTime}m</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {post.tags.slice(0, 3).map((tag, tagIndex) => (
                      <Badge
                        key={tagIndex}
                        variant="secondary"
                        className="px-3 py-1.5 text-xs rounded-full bg-cyan-500/[0.06] text-cyan-400/80 border border-cyan-500/10 font-mono"
                      >
                        {tag}
                      </Badge>
                    ))}
                    {post.tags.length > 3 && (
                      <Badge variant="outline" className="px-3 py-1.5 text-xs rounded-full bg-cyan-500/[0.06] text-cyan-400/80 border border-cyan-500/10 font-mono">
                        +{post.tags.length - 3}
                      </Badge>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-white/[0.06] text-muted-foreground hover:bg-cyan-500/10 hover:text-cyan-400 hover:border-cyan-500/20 rounded-full transition-all duration-300"
                    asChild
                  >
                    <Link href={`/blog/${post.slug}`}>
                      Read Article
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* No Results */}
          {filteredPosts.length === 0 && (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center p-4 glass-card rounded-full mb-6 border border-white/[0.06]">
                <Tag className="h-12 w-12 text-cyan-400" />
              </div>
              <h3 className="text-2xl font-semibold text-foreground mb-3 tracking-tight">
                No articles found matching your criteria
              </h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Try adjusting your search terms or filters to discover more content.
              </p>
              <Button
                variant="outline"
                onClick={clearFilters}
                className="border-white/[0.06] text-muted-foreground hover:bg-cyan-500/10 hover:text-cyan-400 hover:border-cyan-500/20 rounded-full"
              >
                <X className="h-4 w-4 mr-2" />
                Clear All Filters
              </Button>
            </div>
          )}
        </div>
      </div>

      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(38, 38, 38, 0.3);
          border-radius: 2px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(115, 115, 115, 0.5);
          border-radius: 2px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(115, 115, 115, 0.7);
        }
      `}</style>
    </div>
  )
}
