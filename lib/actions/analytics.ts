"use server"

import { createClient } from "@/lib/supabase/server"
import { mockDashboardStats, mockViewsOverTime, mockTopPosts, mockPosts, mockSubscribers, mockContactMessages } from "@/lib/mock-data"
import type { DashboardStats, ViewsOverTime, TopPost } from "@/lib/types"

export async function getDashboardStats(): Promise<DashboardStats> {
  const supabase = await createClient()

  if (!supabase) return mockDashboardStats

  const [postsRes, viewsRes, subsRes, msgsRes] = await Promise.all([
    supabase.from("posts").select("*", { count: "exact", head: true }),
    supabase.from("post_views").select("*", { count: "exact", head: true }),
    supabase.from("newsletter_subscribers").select("*", { count: "exact", head: true }),
    supabase.from("contact_messages").select("*", { count: "exact", head: true }),
  ])

  return {
    totalPosts: postsRes.count || 0,
    totalViews: viewsRes.count || 0,
    totalSubscribers: subsRes.count || 0,
    totalMessages: msgsRes.count || 0,
  }
}

export async function getViewsOverTime(days: number = 30): Promise<ViewsOverTime[]> {
  const supabase = await createClient()

  if (!supabase) return mockViewsOverTime.slice(-days)

  const startDate = new Date()
  startDate.setDate(startDate.getDate() - days)

  const { data, error } = await supabase
    .from("post_views")
    .select("viewed_at")
    .gte("viewed_at", startDate.toISOString())
    .order("viewed_at", { ascending: true })

  if (error || !data) return []

  const viewsByDay: Record<string, number> = {}
  data.forEach((v) => {
    const day = v.viewed_at.split("T")[0]
    viewsByDay[day] = (viewsByDay[day] || 0) + 1
  })

  const result: ViewsOverTime[] = []
  for (let i = 0; i < days; i++) {
    const date = new Date()
    date.setDate(date.getDate() - (days - 1 - i))
    const key = date.toISOString().split("T")[0]
    result.push({ date: key, views: viewsByDay[key] || 0 })
  }

  return result
}

export async function getTopPosts(limit: number = 10): Promise<TopPost[]> {
  const supabase = await createClient()

  if (!supabase) return mockTopPosts.slice(0, limit)

  const { data, error } = await supabase
    .from("post_views")
    .select("post_id, posts(id, title, slug)")
    .limit(1000)

  if (error || !data) return []

  const viewCounts: Record<string, { id: string; title: string; slug: string; views: number }> = {}
  data.forEach((v: Record<string, unknown>) => {
    const post = v.posts as { id: string; title: string; slug: string } | null
    if (post) {
      if (!viewCounts[post.id]) {
        viewCounts[post.id] = { id: post.id, title: post.title, slug: post.slug, views: 0 }
      }
      viewCounts[post.id].views++
    }
  })

  return Object.values(viewCounts)
    .sort((a, b) => b.views - a.views)
    .slice(0, limit)
}

export async function getRecentPosts(): Promise<{ id: string; title: string; status: string; created_at: string; views: number }[]> {
  const supabase = await createClient()

  if (!supabase) {
    return mockPosts.slice(0, 5).map((p, i) => ({
      id: p.id,
      title: p.title,
      status: p.status,
      created_at: p.created_at,
      views: mockTopPosts[i]?.views || 0,
    }))
  }

  const { data, error } = await supabase
    .from("posts")
    .select("id, title, status, created_at")
    .order("created_at", { ascending: false })
    .limit(5)

  if (error || !data) return []
  return data.map((p) => ({ ...p, views: 0 }))
}

export async function getSubscriberGrowth(days: number = 30): Promise<ViewsOverTime[]> {
  const supabase = await createClient()

  if (!supabase) {
    return mockViewsOverTime.slice(-days).map((v) => ({
      ...v,
      views: Math.floor(v.views / 50),
    }))
  }

  const startDate = new Date()
  startDate.setDate(startDate.getDate() - days)

  const { data, error } = await supabase
    .from("newsletter_subscribers")
    .select("created_at")
    .gte("created_at", startDate.toISOString())

  if (error || !data) return []

  const subsByDay: Record<string, number> = {}
  data.forEach((s) => {
    const day = s.created_at.split("T")[0]
    subsByDay[day] = (subsByDay[day] || 0) + 1
  })

  const result: ViewsOverTime[] = []
  for (let i = 0; i < days; i++) {
    const date = new Date()
    date.setDate(date.getDate() - (days - 1 - i))
    const key = date.toISOString().split("T")[0]
    result.push({ date: key, views: subsByDay[key] || 0 })
  }

  return result
}
