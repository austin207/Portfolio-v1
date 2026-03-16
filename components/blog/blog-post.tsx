"use client"

import { MarkdownRenderer } from "./markdown-renderer";
import { format } from "date-fns";
import { Calendar, Clock, User, Tag, ArrowLeft, Home } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import type { BlogPost as BlogPostType } from "@/lib/data/blog-posts";

interface BlogPostProps {
  post: BlogPostType;
}

export const BlogPost = ({ post }: BlogPostProps) => {
  return (
    <div className="min-h-screen bg-background relative">
      <div className="dot-grid fixed inset-0 pointer-events-none z-0" />
      <div className="relative z-10 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Back Navigation */}
          <div className="mb-8">
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground hover:bg-white/[0.04] transition-all duration-300 group"
              asChild
            >
              <Link href="/blog">
                <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
                <Home className="h-4 w-4 mr-2" />
                Back to Blog
              </Link>
            </Button>
          </div>

          <article className="max-w-4xl mx-auto">
            {/* Header Section */}
            <header className="mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground tracking-tight">
                {post.title}
              </h1>

              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-8 font-mono">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-cyan-400/60" />
                  <span>{post.author || "Austin"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-cyan-400/60" />
                  <time dateTime={post.date}>
                    {format(new Date(post.date), "MMMM dd, yyyy")}
                  </time>
                </div>
                {post.readingTime && (
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-cyan-400/60" />
                    <span>{post.readingTime}</span>
                  </div>
                )}
              </div>

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="flex items-center gap-2 mb-8">
                  <Tag className="h-4 w-4 text-cyan-400/60" />
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="px-3 py-1.5 text-xs rounded-full bg-cyan-500/[0.06] text-cyan-400/80 border-cyan-500/10 font-mono"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Featured Image */}
              {post.image && (
                <div className="relative aspect-video mb-12 rounded-2xl overflow-hidden border border-white/[0.08]">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              )}
            </header>

            {/* Content Section */}
            <Card className="glass-card gradient-border">
              <CardContent className="p-8">
                <MarkdownRenderer content={post.content} />
              </CardContent>
            </Card>
          </article>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
