"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Check, Trash2, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getAllComments, approveComment, deleteComment } from "@/lib/actions/comments"
import { toast } from "sonner"
import type { Comment } from "@/lib/types"

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" })
}

export default function CmsCommentsPage() {
  const [comments, setComments] = useState<Comment[]>([])
  const [filter, setFilter] = useState<"all" | "pending" | "approved">("all")
  const [loading, setLoading] = useState<string | null>(null)

  async function load() {
    const data = await getAllComments(filter)
    setComments(data)
  }

  useEffect(() => { load() }, [filter])

  async function handleApprove(id: string) {
    setLoading(id)
    const result = await approveComment(id)
    setLoading(null)
    if (result.success) {
      toast.success("Comment approved")
      load()
    } else {
      toast.error(result.error || "Failed to approve")
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this comment permanently?")) return
    setLoading(id)
    const result = await deleteComment(id)
    setLoading(null)
    if (result.success) {
      toast.success("Comment deleted")
      load()
    } else {
      toast.error(result.error || "Failed to delete")
    }
  }

  const pendingCount = comments.filter((c) => !c.approved).length

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Comments</h1>
          <p className="text-sm text-muted-foreground">
            {comments.length} total{pendingCount > 0 && ` / ${pendingCount} pending`}
          </p>
        </div>
      </div>

      <Tabs value={filter} onValueChange={(v) => setFilter(v as typeof filter)}>
        <TabsList>
          <TabsTrigger value="all">
            <Filter className="mr-2 h-3.5 w-3.5" /> All
          </TabsTrigger>
          <TabsTrigger value="pending">
            Pending {pendingCount > 0 && <Badge variant="destructive" className="ml-2 text-xs">{pendingCount}</Badge>}
          </TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="flex flex-col gap-4">
        {comments.map((comment) => (
          <Card key={comment.id}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="text-sm font-medium text-foreground">{comment.author_name}</span>
                    <span className="text-xs text-muted-foreground">{comment.author_email}</span>
                    <Badge variant={comment.approved ? "default" : "secondary"} className="text-xs">
                      {comment.approved ? "Approved" : "Pending"}
                    </Badge>
                  </div>
                  <p className="mb-2 text-sm text-foreground/80">{comment.content}</p>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span>{formatDate(comment.created_at)}</span>
                    {comment.post && (
                      <>
                        <span>on</span>
                        <Link href={`/blog/${(comment.post as { slug: string }).slug}`} className="text-primary hover:underline">
                          {(comment.post as { title: string }).title}
                        </Link>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {!comment.approved && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleApprove(comment.id)}
                      disabled={loading === comment.id}
                      className="text-green-500 hover:text-green-400"
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(comment.id)}
                    disabled={loading === comment.id}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {comments.length === 0 && (
          <Card>
            <CardContent className="flex items-center justify-center py-12">
              <p className="text-sm text-muted-foreground">No comments found.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
