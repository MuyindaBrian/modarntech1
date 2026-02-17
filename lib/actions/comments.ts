"use server"

import { createClient } from "@/lib/supabase/server"
import { mockComments } from "@/lib/mock-data"
import type { Comment } from "@/lib/types"

export async function submitComment(postId: string, data: { author_name: string; author_email: string; content: string }): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient()
  if (!supabase) return { success: true }

  const { error } = await supabase.from("comments").insert({
    post_id: postId,
    ...data,
  })

  if (error) return { success: false, error: error.message }
  return { success: true }
}

export async function getApprovedComments(postId: string): Promise<Comment[]> {
  const supabase = await createClient()

  if (!supabase) {
    return mockComments.filter((c) => c.post_id === postId && c.approved)
  }

  const { data, error } = await supabase
    .from("comments")
    .select("*")
    .eq("post_id", postId)
    .eq("approved", true)
    .order("created_at", { ascending: false })

  if (error) return []
  return data as Comment[]
}

export async function getAllComments(filter: "all" | "pending" | "approved" = "all"): Promise<Comment[]> {
  const supabase = await createClient()

  if (!supabase) {
    if (filter === "pending") return mockComments.filter((c) => !c.approved)
    if (filter === "approved") return mockComments.filter((c) => c.approved)
    return mockComments
  }

  let query = supabase
    .from("comments")
    .select("*, post:posts(title, slug)")
    .order("created_at", { ascending: false })

  if (filter === "pending") query = query.eq("approved", false)
  if (filter === "approved") query = query.eq("approved", true)

  const { data, error } = await query
  if (error) return []
  return data as Comment[]
}

export async function approveComment(id: string): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient()
  if (!supabase) return { success: false, error: "Database not connected" }

  const { error } = await supabase.from("comments").update({ approved: true }).eq("id", id)
  if (error) return { success: false, error: error.message }
  return { success: true }
}

export async function deleteComment(id: string): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient()
  if (!supabase) return { success: false, error: "Database not connected" }

  const { error } = await supabase.from("comments").delete().eq("id", id)
  if (error) return { success: false, error: error.message }
  return { success: true }
}
