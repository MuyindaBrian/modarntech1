import Link from "next/link"
import { Calendar, Clock, Lock } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import type { Post } from "@/lib/types"

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

export function PostCard({ post }: { post: Post }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group">
      <article className="flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
        <div className="relative aspect-[16/9] overflow-hidden bg-secondary">
          {post.feature_image ? (
            <img
              src={post.feature_image}
              alt={post.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              crossOrigin="anonymous"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/20 to-secondary">
              <span className="text-4xl font-bold text-primary/30">{post.title.charAt(0)}</span>
            </div>
          )}
          {post.is_premium && (
            <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-primary px-2 py-1">
              <Lock className="h-3 w-3 text-primary-foreground" />
              <span className="text-xs font-medium text-primary-foreground">Premium</span>
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-3 p-5">
          <div className="flex flex-wrap items-center gap-2">
            {post.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>

          <h3 className="text-lg font-semibold leading-tight text-foreground transition-colors group-hover:text-primary text-balance">
            {post.title}
          </h3>

          {post.description && (
            <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
              {post.description}
            </p>
          )}

          <div className="mt-auto flex items-center gap-4 pt-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {formatDate(post.created_at)}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {post.read_time} min read
            </span>
          </div>
        </div>
      </article>
    </Link>
  )
}
