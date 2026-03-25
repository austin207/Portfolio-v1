"use client"

import { useState, useMemo } from "react"
import { Search, X, Calendar, Clock, User, ArrowLeft } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import Image from "next/image"
import { format } from "date-fns"
import { useReveal } from "@/hooks/use-reveal"

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
  const featuredReveal = useReveal()
  const postsReveal = useReveal()

  return (
    <div className="min-h-screen bg-background">
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1100px] mx-auto">
          {/* Back Navigation */}
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-[13px] text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back
            </Link>
          </div>

          {/* Header */}
          <div className="text-left mb-12">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-foreground tracking-tight">
              Technical Blog
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed">
              In-depth articles covering web development, AI/ML, robotics, and modern technology trends.
              Explore tutorials, insights, and technical deep-dives from my development journey.
            </p>
          </div>

          <div className="divider mb-16" />

          {/* Featured Posts */}
          {featuredPosts.length > 0 && (
            <div ref={featuredReveal.ref} className="mb-16">
              <span className="font-mono text-[11px] text-muted-foreground uppercase tracking-widest">Featured Articles</span>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {featuredPosts.slice(0, 3).map((post, i) => (
                  <Card
                    key={post.id}
                    className={`group border border-border rounded-none overflow-hidden bg-transparent reveal ${featuredReveal.visible ? "visible" : ""}`}
                    style={{ transitionDelay: `${i * 0.06}s` }}
                  >
                    {post.image && (
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                      </div>
                    )}
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
                          {post.category}
                        </span>
                        <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
                          Featured
                        </span>
                      </div>
                      <CardTitle className="text-foreground text-lg leading-tight group-hover:text-muted-foreground transition-colors duration-300">
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
                        <div className="flex items-center gap-4 font-mono">
                          <span>{post.author}</span>
                          <span>{format(new Date(post.publishedAt), "MMM dd, yyyy")}</span>
                          <span>{post.readingTime} min read</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {post.tags.slice(0, 3).map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="font-mono text-[10px] text-muted-foreground"
                          >
                            {tag}
                          </span>
                        ))}
                        {post.tags.length > 3 && (
                          <span className="font-mono text-[10px] text-muted-foreground">
                            +{post.tags.length - 3}
                          </span>
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
            <div className="relative max-w-2xl">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="Search articles by title, content, author, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-3 bg-transparent border-border rounded-none focus:border-foreground focus:ring-0 text-foreground placeholder-muted-foreground text-sm transition-colors"
              />
            </div>

            {/* Filters */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="font-mono text-[11px] text-muted-foreground uppercase tracking-widest">
                  Filters
                </span>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="inline-flex items-center gap-1.5 font-mono text-[11px] text-muted-foreground hover:text-foreground uppercase tracking-widest transition-colors"
                  >
                    <X className="h-3 w-3" />
                    Clear
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Category Filter */}
                <div className="space-y-3">
                  <span className="font-mono text-[11px] text-muted-foreground uppercase tracking-widest">Category</span>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <button
                        key={category}
                        className={`px-3 py-1 font-mono text-[10px] uppercase tracking-widest transition-colors ${
                          selectedCategory === category
                            ? "bg-foreground text-background"
                            : "text-muted-foreground border border-border hover:text-foreground"
                        }`}
                        onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tags Filter */}
                <div className="space-y-3">
                  <span className="font-mono text-[11px] text-muted-foreground uppercase tracking-widest">Tags</span>
                  <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
                    {allTags.map((tag) => (
                      <button
                        key={tag}
                        className={`px-3 py-1 font-mono text-[10px] uppercase tracking-widest transition-colors ${
                          selectedTags.includes(tag)
                            ? "bg-foreground text-background"
                            : "text-muted-foreground border border-border hover:text-foreground"
                        }`}
                        onClick={() => toggleTag(tag)}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Results Count */}
            <div>
              <p className="font-mono text-[11px] text-muted-foreground uppercase tracking-widest">
                Showing <span className="text-foreground">{filteredPosts.length}</span> of{" "}
                <span className="text-foreground">{allPosts.length}</span> articles
              </p>
            </div>
          </div>

          <div className="divider mb-12" />

          {/* All Posts Grid */}
          <div ref={postsReveal.ref} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredPosts.map((post, i) => (
              <Card
                key={post.id}
                className={`group border border-border rounded-none overflow-hidden bg-transparent reveal ${postsReveal.visible ? "visible" : ""}`}
                style={{ transitionDelay: `${i * 0.06}s` }}
              >
                {post.image && (
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                  </div>
                )}
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
                      {post.category}
                    </span>
                  </div>
                  <CardTitle className="text-foreground text-lg leading-tight group-hover:text-muted-foreground transition-colors duration-300">
                    <Link href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pb-4">
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center text-xs text-muted-foreground mb-3">
                    <div className="flex items-center gap-4 font-mono">
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
                  <div className="flex flex-wrap gap-2">
                    {post.tags.slice(0, 3).map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="font-mono text-[10px] text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                    {post.tags.length > 3 && (
                      <span className="font-mono text-[10px] text-muted-foreground">
                        +{post.tags.length - 3}
                      </span>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="w-full inline-flex items-center justify-center py-2 border border-border text-foreground text-sm hover:bg-foreground hover:text-background transition-colors"
                  >
                    Read Article
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* No Results */}
          {filteredPosts.length === 0 && (
            <div className="text-center py-16">
              <h3 className="text-2xl font-semibold text-foreground mb-3 tracking-tight">
                No articles found matching your criteria
              </h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Try adjusting your search terms or filters to discover more content.
              </p>
              <button
                onClick={clearFilters}
                className="inline-flex items-center gap-2 px-4 py-2 border border-border text-foreground hover:bg-foreground hover:text-background transition-colors"
              >
                <X className="h-4 w-4" />
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
