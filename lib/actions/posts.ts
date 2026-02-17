"use server"

import { createClient } from "@/lib/supabase/server"
import { mockPosts } from "@/lib/mock-data"
import type { Post } from "@/lib/types"

interface GetPostsParams {
  search?: string
  tag?: string
  status?: string
  page?: number
  limit?: number
  sort?: "latest" | "popular"
}

export async function getPosts(params: GetPostsParams = {}): Promise<{ posts: Post[]; total: number }> {
  const { search, tag, status = "published", page = 1, limit = 9, sort = "latest" } = params
  const supabase = await createClient()

  if (!supabase) {
    let filtered = mockPosts.filter((p) => status === "all" || p.status === status)
    if (search) {
      const q = search.toLowerCase()
      filtered = filtered.filter(
        (p) => p.title.toLowerCase().includes(q) || p.description?.toLowerCase().includes(q)
      )
    }
    if (tag) {
      filtered = filtered.filter((p) => p.tags.includes(tag))
    }
    const start = (page - 1) * limit
    return { posts: filtered.slice(start, start + limit), total: filtered.length }
  }

  let query = supabase
    .from("posts")
    .select("*, author:profiles(*)", { count: "exact" })

  if (status !== "all") {
    query = query.eq("status", status)
  }
  if (search) {
    query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%`)
  }
  if (tag) {
    query = query.contains("tags", [tag])
  }
  if (sort === "latest") {
    query = query.order("created_at", { ascending: false })
  }

  const from = (page - 1) * limit
  query = query.range(from, from + limit - 1)

  const { data, count, error } = await query
  if (error) {
    console.error("Error fetching posts:", error)
    return { posts: [], total: 0 }
  }

  return { posts: (data as Post[]) || [], total: count || 0 }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const supabase = await createClient()

  if (!supabase) {
    return mockPosts.find((p) => p.slug === slug) || null
  }

  const { data, error } = await supabase
    .from("posts")
    .select("*, author:profiles(*)")
    .eq("slug", slug)
    .single()

  if (error) return null
  return data as Post
}

export async function createPost(postData: Partial<Post>): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient()
  if (!supabase) return { success: false, error: "Database not connected" }

  const slug = postData.slug || postData.title?.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || ""
  const readTime = Math.max(1, Math.ceil((postData.content?.split(/\s+/).length || 0) / 200))

  const { error } = await supabase.from("posts").insert({
    ...postData,
    slug,
    read_time: readTime,
  })

  if (error) return { success: false, error: error.message }
  return { success: true }
}

export async function updatePost(id: string, postData: Partial<Post>): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient()
  if (!supabase) return { success: false, error: "Database not connected" }

  const readTime = postData.content
    ? Math.max(1, Math.ceil(postData.content.split(/\s+/).length / 200))
    : undefined

  const { error } = await supabase
    .from("posts")
    .update({ ...postData, ...(readTime ? { read_time: readTime } : {}) })
    .eq("id", id)

  if (error) return { success: false, error: error.message }
  return { success: true }
}

export async function deletePost(id: string): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient()
  if (!supabase) return { success: false, error: "Database not connected" }

  const { error } = await supabase.from("posts").delete().eq("id", id)
  if (error) return { success: false, error: error.message }
  return { success: true }
}

export async function togglePublish(id: string, currentStatus: string): Promise<{ success: boolean; error?: string }> {
  const newStatus = currentStatus === "published" ? "draft" : "published"
  return updatePost(id, { status: newStatus } as Partial<Post>)
}

export async function incrementViews(postId: string, referrer?: string): Promise<void> {
  const supabase = await createClient()
  if (!supabase) return

  await supabase.rpc("increment_post_views", {
    p_post_id: postId,
    p_referrer: referrer || null,
  })
}

export async function getAllTags(): Promise<string[]> {
  const supabase = await createClient()

  if (!supabase) {
    const allTags = mockPosts.flatMap((p) => p.tags)
    return [...new Set(allTags)]
  }

  const { data } = await supabase
    .from("posts")
    .select("tags")
    .eq("status", "published")

  if (!data) return []
  const allTags = data.flatMap((p) => p.tags || [])
  return [...new Set(allTags)]
}
