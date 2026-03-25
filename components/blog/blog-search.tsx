"use client"

import { useState, useMemo, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Search, X } from "lucide-react"
import type { BlogPost } from "@/lib/data/blog-posts"

interface BlogSearchProps {
  posts: BlogPost[]
  onFilteredPosts: (posts: BlogPost[]) => void
}

export default function BlogSearch({ posts, onFilteredPosts }: BlogSearchProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const categories = useMemo(() => Array.from(new Set(posts.map((p) => p.category))), [posts])

  const filteredPosts = useMemo(() => {
    let filtered = posts
    if (searchTerm) {
      filtered = filtered.filter((p) =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.tags.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }
    if (selectedCategory) filtered = filtered.filter((p) => p.category === selectedCategory)
    return filtered
  }, [posts, searchTerm, selectedCategory])

  useEffect(() => { onFilteredPosts(filteredPosts) }, [filteredPosts, onFilteredPosts])

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 bg-transparent border-border rounded-none text-sm focus:border-foreground focus:ring-0"
        />
      </div>
      <div className="flex items-center gap-2 flex-wrap">
        <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest mr-2">Filter</span>
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setSelectedCategory(selectedCategory === c ? null : c)}
            className={`text-xs px-3 py-1 border transition-colors ${
              selectedCategory === c ? "bg-foreground text-background border-foreground" : "border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            {c}
          </button>
        ))}
        {(searchTerm || selectedCategory) && (
          <button onClick={() => { setSearchTerm(""); setSelectedCategory(null) }} className="text-xs text-muted-foreground hover:text-foreground ml-2">
            <X className="h-3 w-3" />
          </button>
        )}
      </div>
      <p className="font-mono text-[11px] text-muted-foreground">{filteredPosts.length} of {posts.length}</p>
    </div>
  )
}
