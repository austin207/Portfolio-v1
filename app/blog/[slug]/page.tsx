import { notFound } from "next/navigation";
import { getPostBySlug } from "@/lib/data/blog-posts";
import { MarkdownRenderer } from "@/components/blog/markdown-renderer";
import { format } from "date-fns";
import { Calendar, Clock, User, ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    return {
      title: "Post Not Found",
      description: "The requested blog post could not be found.",
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.image ? [
        {
          url: post.image,
          width: 1200,
          height: 630,
          alt: post.title,
        }
      ] : [],
      type: "article",
      publishedTime: post.publishedAt,
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: post.image ? [post.image] : [],
    },
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1100px] mx-auto">
          {/* Back Navigation */}
          <div className="mb-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-[13px] text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back
            </Link>
          </div>

          <article className="max-w-4xl mx-auto">
            {/* Header Section */}
            <header className="mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground tracking-tight fade-in" style={{ animationDelay: "0.1s" }}>
                {post.title}
              </h1>

              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-6 font-mono text-[11px] text-muted-foreground uppercase tracking-widest mb-8 fade-in" style={{ animationDelay: "0.2s" }}>
                <div className="flex items-center gap-2">
                  <User className="h-3.5 w-3.5" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-3.5 w-3.5" />
                  <time dateTime={post.publishedAt}>
                    {format(new Date(post.publishedAt), "MMMM dd, yyyy")}
                  </time>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-3.5 w-3.5" />
                  <span>{post.readingTime} min read</span>
                </div>
              </div>

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-3 mb-8 fade-in" style={{ animationDelay: "0.3s" }}>
                  {post.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="divider mb-8" />

              {/* Featured Image */}
              {post.image && (
                <div className="relative aspect-video mb-12 overflow-hidden border border-border">
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
            <div className="border border-border p-8 fade-in" style={{ animationDelay: "0.4s" }}>
              <MarkdownRenderer content={post.content} />
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}
