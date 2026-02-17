import Link from "next/link"
import { Plus, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getPosts } from "@/lib/actions/posts"

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
}

export default async function CmsPostsPage({ searchParams }: { searchParams: Promise<{ search?: string; page?: string }> }) {
  const params = await searchParams
  const page = Number(params.page) || 1
  const { posts, total } = await getPosts({ search: params.search, status: "all", page, limit: 20 })
  const totalPages = Math.ceil(total / 20)

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Posts</h1>
          <p className="text-sm text-muted-foreground">{total} total posts</p>
        </div>
        <Button asChild>
          <Link href="/cms/posts/new">
            <Plus className="mr-2 h-4 w-4" />
            New Post
          </Link>
        </Button>
      </div>

      <form action="/cms/posts" method="get" className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input name="search" placeholder="Search posts..." defaultValue={params.search} className="pl-10" />
      </form>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Title</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Tags</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Date</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <tr key={post.id} className="border-b border-border last:border-0 hover:bg-secondary/50">
                    <td className="px-4 py-3">
                      <Link href={`/cms/posts/${post.id}/edit`} className="text-sm font-medium text-foreground hover:text-primary">
                        {post.title}
                      </Link>
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant={post.status === "published" ? "default" : post.status === "scheduled" ? "outline" : "secondary"}>
                        {post.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {post.tags.slice(0, 2).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{formatDate(post.created_at)}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/cms/posts/${post.id}/edit`}>Edit</Link>
                        </Button>
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/blog/${post.slug}`} target="_blank">View</Link>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
                {posts.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-4 py-12 text-center text-sm text-muted-foreground">
                      No posts found. Create your first post!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          {page > 1 && (
            <Button variant="outline" size="sm" asChild>
              <Link href={`/cms/posts?page=${page - 1}${params.search ? `&search=${params.search}` : ""}`}>Previous</Link>
            </Button>
          )}
          <span className="text-sm text-muted-foreground">Page {page} of {totalPages}</span>
          {page < totalPages && (
            <Button variant="outline" size="sm" asChild>
              <Link href={`/cms/posts?page=${page + 1}${params.search ? `&search=${params.search}` : ""}`}>Next</Link>
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
