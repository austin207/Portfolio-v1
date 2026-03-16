"use client"

import { useState, useMemo, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Search, X, Filter } from "lucide-react"
import type { BlogPost } from "@/lib/data/blog-posts"

interface BlogSearchProps {
  posts: BlogPost[]
  onFilteredPosts: (posts: BlogPost[]) => void
}

export default function BlogSearch({ posts, onFilteredPosts }: BlogSearchProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  const categories = useMemo(() => {
    return Array.from(new Set(posts.map((p) => p.category)))
  }, [posts])

  const allTags = useMemo(() => {
    const tags = new Set<string>()
    posts.forEach((post) => {
      post.tags.forEach((tag: string) => tags.add(tag))
    })
    return Array.from(tags)
  }, [posts])

  const filteredPosts = useMemo(() => {
    let filtered = posts

    if (searchTerm) {
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.tags.some((tag: string) => tag.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    if (selectedCategory) {
      filtered = filtered.filter((post) => post.category === selectedCategory)
    }

    if (selectedTags.length > 0) {
      filtered = filtered.filter((post) => selectedTags.some((tag) => post.tags.includes(tag)))
    }

    return filtered
  }, [posts, searchTerm, selectedCategory, selectedTags])

  useEffect(() => {
    onFilteredPosts(filteredPosts)
  }, [filteredPosts, onFilteredPosts])

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  const clearFilters = () => {
    setSearchTerm("")
    setSelectedCategory(null)
    setSelectedTags([])
  }

  const hasActiveFilters = searchTerm || selectedCategory || selectedTags.length > 0

  return (
    <div className="space-y-6">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-cyan-400/60" />
        <Input
          placeholder="Search articles by title, content, or technology..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 glass-card border-white/[0.06] focus:border-cyan-500/30 focus:ring-cyan-500/20 text-foreground placeholder-muted-foreground"
        />
      </div>

      {/* Filters */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-cyan-400/60" />
          <span className="text-xs font-mono text-cyan-400/70 uppercase tracking-wider">Filters</span>
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={clearFilters} className="text-muted-foreground hover:text-cyan-400">
              <X className="h-3 w-3 mr-1" />
              Clear All
            </Button>
          )}
        </div>

        {/* Category Filter */}
        <div>
          <h4 className="text-xs font-mono text-cyan-400/70 uppercase tracking-wider mb-2">Category</h4>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className={`cursor-pointer transition-colors rounded-full ${
                  selectedCategory === category
                    ? "bg-cyan-500/10 text-cyan-400 border-cyan-500/20"
                    : "bg-white/[0.03] text-muted-foreground border-white/[0.06] hover:bg-white/[0.06] hover:text-foreground"
                }`}
                onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>

        {/* Technology Tags Filter */}
        <div>
          <h4 className="text-xs font-mono text-cyan-400/70 uppercase tracking-wider mb-2">Technologies</h4>
          <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
            {allTags.map((tag) => (
              <Badge
                key={tag}
                variant={selectedTags.includes(tag) ? "default" : "outline"}
                className={`cursor-pointer transition-colors rounded-full ${
                  selectedTags.includes(tag)
                    ? "bg-cyan-500/10 text-cyan-400 border-cyan-500/20"
                    : "bg-white/[0.03] text-muted-foreground border-white/[0.06] hover:bg-white/[0.06] hover:text-foreground"
                }`}
                onClick={() => toggleTag(tag)}
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="text-sm text-muted-foreground">
        Showing <span className="text-foreground font-semibold">{filteredPosts.length}</span> of <span className="text-foreground font-semibold">{posts.length}</span> articles
      </div>
    </div>
  )
}
