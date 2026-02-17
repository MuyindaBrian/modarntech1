import type { Metadata } from "next"
import Link from "next/link"
import { Search } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { PostCard } from "@/components/blog/post-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { getPosts, getAllTags } from "@/lib/actions/posts"

export const metadata: Metadata = {
  title: "Blog",
  description: "Insights, tutorials, and industry updates from the MODARNTECH team.",
}

export default async function BlogPage({ searchParams }: { searchParams: Promise<{ search?: string; tag?: string; page?: string }> }) {
  const params = await searchParams
  const currentPage = Number(params.page) || 1
  const [{ posts, total }, tags] = await Promise.all([
    getPosts({ search: params.search, tag: params.tag, page: currentPage, limit: 9 }),
    getAllTags(),
  ])

  const totalPages = Math.ceil(total / 9)

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        <section className="border-b border-border">
          <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
            <h1 className="text-4xl font-bold tracking-tight text-foreground">Blog</h1>
            <p className="mt-3 text-lg text-muted-foreground">
              Insights, tutorials, and industry updates.
            </p>

            {/* Search & Filters */}
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <form className="relative flex-1" action="/blog" method="get">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  name="search"
                  placeholder="Search articles..."
                  defaultValue={params.search}
                  className="pl-10"
                />
                {params.tag && <input type="hidden" name="tag" value={params.tag} />}
              </form>
            </div>

            {tags.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                <Link href="/blog">
                  <Badge variant={!params.tag ? "default" : "secondary"} className="cursor-pointer">
                    All
                  </Badge>
                </Link>
                {tags.map((tag) => (
                  <Link key={tag} href={`/blog?tag=${encodeURIComponent(tag)}${params.search ? `&search=${params.search}` : ""}`}>
                    <Badge variant={params.tag === tag ? "default" : "secondary"} className="cursor-pointer">
                      {tag}
                    </Badge>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="py-12">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            {posts.length > 0 ? (
              <>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {posts.map((post) => (
                    <PostCard key={post.id} post={post} />
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className="mt-12 flex items-center justify-center gap-2">
                    {currentPage > 1 && (
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/blog?page=${currentPage - 1}${params.search ? `&search=${params.search}` : ""}${params.tag ? `&tag=${params.tag}` : ""}`}>
                          Previous
                        </Link>
                      </Button>
                    )}
                    <span className="px-4 text-sm text-muted-foreground">
                      Page {currentPage} of {totalPages}
                    </span>
                    {currentPage < totalPages && (
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/blog?page=${currentPage + 1}${params.search ? `&search=${params.search}` : ""}${params.tag ? `&tag=${params.tag}` : ""}`}>
                          Next
                        </Link>
                      </Button>
                    )}
                  </div>
                )}
              </>
            ) : (
              <div className="flex flex-col items-center py-24 text-center">
                <Search className="h-12 w-12 text-muted-foreground/50" />
                <h2 className="mt-4 text-xl font-semibold text-foreground">No posts found</h2>
                <p className="mt-2 text-muted-foreground">
                  {params.search || params.tag
                    ? "Try adjusting your search or filter criteria."
                    : "Check back soon for new content."}
                </p>
                {(params.search || params.tag) && (
                  <Button variant="outline" asChild className="mt-4">
                    <Link href="/blog">Clear filters</Link>
                  </Button>
                )}
              </div>
            )}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
