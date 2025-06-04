import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, Clock, User, Share2, BookOpen } from "lucide-react"
import { getBlogPostBySlug, blogPosts } from "@/lib/data/blog-posts"
import MarkdownRenderer from "@/components/blog/markdown-renderer"
import BlogCard from "@/components/blog/blog-card"
import { notFound } from "next/navigation"
import { generateSEO } from "@/lib/seo"
import type { Metadata } from "next"

interface BlogPostPageProps {
  params: { slug: string }
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = getBlogPostBySlug(params.slug)

  if (!post) {
    return generateSEO({
      title: "Blog Post Not Found",
      description: "The requested blog post could not be found.",
    })
  }

  return generateSEO({
    title: post.title,
    description: post.excerpt,
    keywords: [...post.tags, "blog", "technical article", "tutorial"],
    type: "article",
    publishedTime: post.publishedAt,
    author: post.author,
    url: `https://antonyaustin.dev/blog/${post.slug}`,
  })
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getBlogPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  // Get related posts (same category, excluding current post)
  const relatedPosts = blogPosts.filter((p) => p.category === post.category && p.id !== post.id).slice(0, 3)

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="container mx-auto px-4 md:px-6 py-20">
        {/* Header */}
        <div className="mb-8">
          <Link href="/blog">
            <Button variant="outline" className="border-cyan-700 text-cyan-400 hover:bg-cyan-950/30 mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Button>
          </Link>
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <Badge variant="outline" className="bg-purple-950/30 text-purple-400 border-purple-800">
              {post.category}
            </Badge>
            {post.featured && (
              <Badge className="bg-gradient-to-r from-cyan-600 to-purple-600 text-white">Featured</Badge>
            )}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-600">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-6 text-gray-400 mb-6">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              <span>{post.readingTime} min read</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="h-5 w-5" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              <span>{post.content.split(" ").length} words</span>
            </div>
          </div>
          <p className="text-xl text-gray-300 max-w-4xl mb-8">{post.excerpt}</p>
          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map((tag, index) => (
              <Badge key={index} variant="outline" className="bg-gray-700/50 text-gray-300 border-gray-600">
                {tag}
              </Badge>
            ))}
          </div>
          <div className="flex gap-4">
            <Button variant="outline" className="border-cyan-700 text-cyan-400 hover:bg-cyan-950/30">
              <Share2 className="mr-2 h-4 w-4" />
              Share Article
            </Button>
          </div>
        </div>

        {/* Hero Image */}
        <div className="relative h-64 md:h-96 rounded-lg overflow-hidden mb-12">
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent z-10 opacity-40"></div>
          <img src={post.image || "/placeholder.svg"} alt={post.title} className="w-full h-full object-cover" />
        </div>

        {/* Article Content */}
        <article className="max-w-4xl mx-auto">
          <MarkdownRenderer content={post.content} />
        </article>

        {/* Author Bio */}
        <div className="max-w-4xl mx-auto mt-12 p-6 bg-gray-800/50 border border-gray-700 rounded-lg">
          <div className="flex items-start gap-4">
            <img
              src="/Profile.png?height=80&width=80"
              alt={post.author}
              className="w-20 h-20 rounded-full border-2 border-cyan-500"
            />
            <div>
              <h3 className="text-xl font-semibold text-cyan-400 mb-2">{post.author}</h3>
              <p className="text-gray-300 mb-4">
                Electronics Engineer & Tech Innovator specializing in robotics, AI/ML, and automation. Founder of
                VirtusCo and passionate about sharing knowledge through technical writing.
              </p>
              <div className="flex gap-4">
                <Link href="/#contact" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                  Get in Touch
                </Link>
                <Link href="/projects" className="text-purple-400 hover:text-purple-300 transition-colors">
                  View Projects
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="max-w-6xl mx-auto mt-16">
            <h2 className="text-3xl font-semibold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-600">
              Related Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <BlogCard key={relatedPost.id} post={relatedPost} />
              ))}
            </div>
          </section>
        )}

        {/* Navigation */}
        <div className="max-w-4xl mx-auto mt-12 flex justify-between">
          <Link href="/blog">
            <Button variant="outline" className="border-cyan-700 text-cyan-400 hover:bg-cyan-950/30">
              <ArrowLeft className="mr-2 h-4 w-4" />
              All Articles
            </Button>
          </Link>
          <Link href="/#contact">
            <Button className="bg-gradient-to-r from-cyan-600 to-cyan-700 hover:from-cyan-500 hover:to-cyan-600">
              Get In Touch
            </Button>
          </Link>
        </div>
      </div>
    </main>
  )
}
