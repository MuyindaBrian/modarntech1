"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { submitComment } from "@/lib/actions/comments"
import { toast } from "sonner"
import type { Comment } from "@/lib/types"

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

export function CommentSection({ postId, comments }: { postId: string; comments: Comment[] }) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [content, setContent] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name || !email || !content) return

    setLoading(true)
    const result = await submitComment(postId, { author_name: name, author_email: email, content })
    setLoading(false)

    if (result.success) {
      toast.success("Comment submitted! It will appear after approval.")
      setName("")
      setEmail("")
      setContent("")
    } else {
      toast.error(result.error || "Failed to submit comment")
    }
  }

  return (
    <section className="flex flex-col gap-8">
      <h2 className="text-2xl font-bold text-foreground">Comments ({comments.length})</h2>

      {comments.length > 0 && (
        <div className="flex flex-col gap-4">
          {comments.map((comment) => (
            <div key={comment.id} className="rounded-lg border border-border bg-card p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-foreground">{comment.author_name}</span>
                <span className="text-xs text-muted-foreground">{formatDate(comment.created_at)}</span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{comment.content}</p>
            </div>
          ))}
        </div>
      )}

      <div className="rounded-lg border border-border bg-card p-6">
        <h3 className="mb-4 text-lg font-semibold text-foreground">Leave a comment</h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor="comment-name">Name</Label>
              <Input id="comment-name" value={name} onChange={(e) => setName(e.target.value)} required placeholder="Your name" />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="comment-email">Email</Label>
              <Input id="comment-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="your@email.com" />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="comment-content">Comment</Label>
            <Textarea id="comment-content" value={content} onChange={(e) => setContent(e.target.value)} required placeholder="Share your thoughts..." rows={4} />
          </div>
          <Button type="submit" disabled={loading} className="w-fit">
            {loading ? "Submitting..." : "Post Comment"}
          </Button>
        </form>
      </div>
    </section>
  )
}
