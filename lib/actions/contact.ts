"use server"

import { createClient } from "@/lib/supabase/server"
import { mockContactMessages } from "@/lib/mock-data"
import type { ContactMessage } from "@/lib/types"

export async function submitContactForm(data: {
  name: string
  email: string
  subject: string
  message: string
}): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient()
  if (!supabase) return { success: true }

  const { error } = await supabase.from("contact_messages").insert(data)
  if (error) return { success: false, error: error.message }
  return { success: true }
}

export async function getContactMessages(): Promise<ContactMessage[]> {
  const supabase = await createClient()

  if (!supabase) return mockContactMessages

  const { data, error } = await supabase
    .from("contact_messages")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) return []
  return data as ContactMessage[]
}

export async function markMessageRead(id: string): Promise<void> {
  const supabase = await createClient()
  if (!supabase) return

  await supabase.from("contact_messages").update({ read: true }).eq("id", id)
}
