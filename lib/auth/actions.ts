"use server"

import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export async function login(email: string, password: string): Promise<{ error?: string }> {
  const supabase = await createClient()
  if (!supabase) return { error: "Database not connected. Please configure Supabase." }

  const { error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) return { error: error.message }

  redirect("/cms")
}

export async function logout(): Promise<void> {
  const supabase = await createClient()
  if (!supabase) return

  await supabase.auth.signOut()
  redirect("/login")
}

export async function resetPassword(email: string): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient()
  if (!supabase) return { success: false, error: "Database not connected" }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/reset-password`,
  })

  if (error) return { success: false, error: error.message }
  return { success: true }
}

export async function updatePassword(password: string): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient()
  if (!supabase) return { success: false, error: "Database not connected" }

  const { error } = await supabase.auth.updateUser({ password })
  if (error) return { success: false, error: error.message }
  return { success: true }
}

export async function getCurrentUser() {
  const supabase = await createClient()
  if (!supabase) return null

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single()

  return profile
}
