import Link from "next/link"
import { FileText, Eye, Users, MessageSquare, Plus, ExternalLink, TrendingUp } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { getDashboardStats, getRecentPosts, getViewsOverTime } from "@/lib/actions/analytics"
import { CmsMiniChart } from "@/components/cms/mini-chart"

export default async function CmsDashboardPage() {
  const [stats, recentPosts, viewsData] = await Promise.all([
    getDashboardStats(),
    getRecentPosts(),
    getViewsOverTime(14),
  ])

  const statCards = [
    { label: "Total Posts", value: stats.totalPosts, icon: FileText, color: "text-chart-1" },
    { label: "Total Views", value: stats.totalViews.toLocaleString(), icon: Eye, color: "text-chart-2" },
    { label: "Subscribers", value: stats.totalSubscribers, icon: Users, color: "text-chart-3" },
    { label: "Messages", value: stats.totalMessages, icon: MessageSquare, color: "text-chart-4" },
  ]

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-sm text-muted-foreground">Overview of your content and analytics.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href="/" target="_blank">
              <ExternalLink className="mr-2 h-3.5 w-3.5" />
              View Site
            </Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/cms/posts/new">
              <Plus className="mr-2 h-3.5 w-3.5" />
              New Post
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.label}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts & Recent Posts */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Views Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              Views (Last 14 Days)
            </CardTitle>
            <CardDescription>Page views over the last two weeks</CardDescription>
          </CardHeader>
          <CardContent>
            <CmsMiniChart data={viewsData} />
          </CardContent>
        </Card>

        {/* Recent Posts */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Posts</CardTitle>
            <CardDescription>Your latest content</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">
              {recentPosts.map((post) => (
                <div key={post.id} className="flex items-center justify-between rounded-lg border border-border p-3">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-sm font-medium text-foreground">{post.title}</span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(post.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <Badge variant={post.status === "published" ? "default" : "secondary"}>
                    {post.status}
                  </Badge>
                </div>
              ))}
              {recentPosts.length === 0 && (
                <p className="text-sm text-muted-foreground">No posts yet. Create your first post!</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
