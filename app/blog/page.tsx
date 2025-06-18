"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Home } from "lucide-react"
import BlogCard from "@/components/blog/blog-card"
import BlogSearch from "@/components/blog/blog-search"
import { blogPosts, getFeaturedPosts } from "@/lib/data/blog-posts"
import { useState, useEffect } from "react"

export default function BlogPage() {
  const [filteredPosts, setFilteredPosts] = useState(blogPosts)
  const [isLoading, setIsLoading] = useState(true)
  const featuredPosts = getFeaturedPosts()

  useEffect(() => {
    // Simulate loading for better UX
    const timer = setTimeout(() => setIsLoading(false), 100)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
        <div className="container mx-auto px-4 md:px-6 py-20">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-700 rounded w-1/4 mb-4"></div>
            <div className="h-12 bg-gray-700 rounded w-1/2 mb-4"></div>
            <div className="h-6 bg-gray-700 rounded w-3/4 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-64 bg-gray-700 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="container mx-auto px-4 md:px-6 py-20">
        <div className="mb-8">
        <Button
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-white hover:bg-gray-800/50 backdrop-blur-sm transition-all duration-300 group"
              asChild
            >
              <Link href="/">
                <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
                <Home className="h-4 w-4 mr-2" />
                Back to Home
              </Link>
            </Button>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-600">
            Technical Blog
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl">
            Deep dives into electronics engineering, AI/ML, embedded systems, and cutting-edge technology
            implementations.
          </p>
        </div>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 text-cyan-400">Featured Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredPosts.map((post) => (
                <BlogCard key={post.id} post={post} featured={true} />
              ))}
            </div>
          </section>
        )}

        {/* Search and Filter */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <BlogSearch posts={blogPosts} onFilteredPosts={setFilteredPosts} />
          </div>

          {/* All Posts */}
          <div className="lg:col-span-3">
            <h2 className="text-2xl font-semibold mb-6 text-cyan-400">All Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>

            {filteredPosts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg">No articles found matching your criteria.</p>
                <p className="text-gray-500 text-sm mt-2">Try adjusting your search terms or filters.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
