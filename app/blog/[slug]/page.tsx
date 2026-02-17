import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Calendar, Clock, User } from "lucide-react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ShareButtons } from "@/components/blog/share-buttons"
import { CommentSection } from "@/components/blog/comment-section"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getPostBySlug } from "@/lib/actions/posts"
import { getApprovedComments } from "@/lib/actions/comments"
import { SITE_URL } from "@/lib/constants"

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return { title: "Post Not Found" }

  return {
    title: post.seo_title || post.title,
    description: post.seo_description || post.description,
    openGraph: {
      title: post.seo_title || post.title,
      description: post.seo_description || post.description || "",
      type: "article",
      publishedTime: post.created_at,
      authors: [post.author?.full_name || "MODARNTECH"],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.seo_title || post.title,
      description: post.seo_description || post.description || "",
    },
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const [post, comments] = await Promise.all([
    getPostBySlug(slug),
    getApprovedComments(slug),
  ])

  if (!post) notFound()

  const postUrl = `${SITE_URL}/blog/${post.slug}`

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        <article className="mx-auto max-w-4xl px-4 py-12 lg:px-8">
          <Button variant="ghost" size="sm" asChild className="mb-8">
            <Link href="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
          </Button>

          {/* Post Header */}
          <header className="flex flex-col gap-4">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="secondary">{tag}</Badge>
              ))}
            </div>

            <h1 className="text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-5xl text-balance">
              {post.title}
            </h1>

            {post.description && (
              <p className="text-lg leading-relaxed text-muted-foreground text-pretty">{post.description}</p>
            )}

            <div className="flex flex-wrap items-center gap-4 border-b border-border pb-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <User className="h-4 w-4" />
                {post.author?.full_name || "MODARNTECH"}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                {formatDate(post.created_at)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                {post.read_time} min read
              </span>
              <div className="ml-auto">
                <ShareButtons title={post.title} url={postUrl} />
              </div>
            </div>
          </header>

          {/* Post Content */}
          <div className="prose prose-invert mt-8 max-w-none prose-headings:text-foreground prose-headings:font-bold prose-p:text-muted-foreground prose-p:leading-relaxed prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-strong:text-foreground prose-code:rounded-md prose-code:bg-secondary prose-code:px-1.5 prose-code:py-0.5 prose-code:text-foreground prose-code:font-mono prose-pre:rounded-xl prose-pre:border prose-pre:border-border prose-pre:bg-card prose-li:text-muted-foreground prose-blockquote:border-primary prose-blockquote:text-muted-foreground">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {post.content}
            </ReactMarkdown>
          </div>

          {/* Share + Tags */}
          <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Link key={tag} href={`/blog?tag=${encodeURIComponent(tag)}`}>
                  <Badge variant="outline">{tag}</Badge>
                </Link>
              ))}
            </div>
            <ShareButtons title={post.title} url={postUrl} />
          </div>

          {/* Comments */}
          <div className="mt-16">
            <CommentSection postId={post.id} comments={comments} />
          </div>
        </article>
      </main>

      <SiteFooter />
    </div>
  )
}
