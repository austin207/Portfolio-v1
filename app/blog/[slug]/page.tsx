import { notFound } from "next/navigation";
import { getPostBySlug, getAllPosts } from "@/lib/data/blog-posts";
import { MarkdownRenderer } from "@/components/blog/markdown-renderer";
import { format } from "date-fns";
import { Calendar, Clock, User, ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { generateSEO, blogPostingGraph, SITE_URL } from "@/lib/seo";
import JsonLd from "@/components/json-ld";

// Prerender posts at build time instead of rendering each on demand — faster
// first byte for crawlers, and AI crawlers do not retry a slow response.
export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    return generateSEO({
      title: "Post Not Found",
      description: "The requested blog post could not be found.",
      noIndex: true,
    });
  }

  // Routed through generateSEO so this page gets its OWN canonical. Previously
  // this hand-rolled object omitted `alternates`, so every post inherited the
  // root canonical and declared itself a duplicate of the homepage.
  return generateSEO({
    title: post.title,
    description: post.excerpt,
    url: `${SITE_URL}/blog/${post.slug}`,
    type: "article",
    publishedTime: post.publishedAt,
    modifiedTime: post.updatedAt ?? post.publishedAt,
    author: post.author,
    ...(post.image && { image: `${SITE_URL}${post.image}` }),
    ...(post.tags && post.tags.length > 0 && { keywords: post.tags }),
  });
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      <JsonLd
        data={blogPostingGraph(post, [
          { name: "Blog", path: "/blog" },
          { name: post.title, path: `/blog/${post.slug}` },
        ])}
      />
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
