"use server"

import { createClient } from "@/lib/supabase/server"
import { mockProjects } from "@/lib/mock-data"
import type { PortfolioProject } from "@/lib/types"

export async function getProjects(category?: string): Promise<PortfolioProject[]> {
  const supabase = await createClient()

  if (!supabase) {
    if (category && category !== "All") {
      return mockProjects.filter((p) => p.category === category)
    }
    return mockProjects
  }

  let query = supabase
    .from("portfolio_projects")
    .select("*")
    .order("sort_order", { ascending: true })

  if (category && category !== "All") {
    query = query.eq("category", category)
  }

  const { data, error } = await query
  if (error) return []
  return data as PortfolioProject[]
}

export async function getFeaturedProjects(): Promise<PortfolioProject[]> {
  const supabase = await createClient()

  if (!supabase) {
    return mockProjects.filter((p) => p.featured).slice(0, 3)
  }

  const { data, error } = await supabase
    .from("portfolio_projects")
    .select("*")
    .eq("featured", true)
    .order("sort_order", { ascending: true })
    .limit(3)

  if (error) return []
  return data as PortfolioProject[]
}

export async function createProject(project: Partial<PortfolioProject>): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient()
  if (!supabase) return { success: false, error: "Database not connected" }

  const { error } = await supabase.from("portfolio_projects").insert(project)
  if (error) return { success: false, error: error.message }
  return { success: true }
}

export async function updateProject(id: string, project: Partial<PortfolioProject>): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient()
  if (!supabase) return { success: false, error: "Database not connected" }

  const { error } = await supabase.from("portfolio_projects").update(project).eq("id", id)
  if (error) return { success: false, error: error.message }
  return { success: true }
}

export async function deleteProject(id: string): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient()
  if (!supabase) return { success: false, error: "Database not connected" }

  const { error } = await supabase.from("portfolio_projects").delete().eq("id", id)
  if (error) return { success: false, error: error.message }
  return { success: true }
}
