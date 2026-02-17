"use server"

import { createClient } from "@/lib/supabase/server"
import { mockSubscribers } from "@/lib/mock-data"
import type { NewsletterSubscriber } from "@/lib/types"

export async function subscribe(email: string): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient()
  if (!supabase) return { success: true }

  const { error } = await supabase.from("newsletter_subscribers").insert({ email })
  if (error) {
    if (error.code === "23505") return { success: false, error: "You're already subscribed!" }
    return { success: false, error: error.message }
  }
  return { success: true }
}

export async function getSubscribers(): Promise<NewsletterSubscriber[]> {
  const supabase = await createClient()

  if (!supabase) return mockSubscribers

  const { data, error } = await supabase
    .from("newsletter_subscribers")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) return []
  return data as NewsletterSubscriber[]
}

export async function getSubscriberCount(): Promise<{ total: number; confirmed: number }> {
  const supabase = await createClient()

  if (!supabase) {
    return {
      total: mockSubscribers.length,
      confirmed: mockSubscribers.filter((s) => s.confirmed).length,
    }
  }

  const { count: total } = await supabase
    .from("newsletter_subscribers")
    .select("*", { count: "exact", head: true })

  const { count: confirmed } = await supabase
    .from("newsletter_subscribers")
    .select("*", { count: "exact", head: true })
    .eq("confirmed", true)

  return { total: total || 0, confirmed: confirmed || 0 }
}

export async function exportSubscribersCSV(): Promise<string> {
  const subscribers = await getSubscribers()
  const header = "email,confirmed,created_at"
  const rows = subscribers.map(
    (s) => `${s.email},${s.confirmed},${s.created_at}`
  )
  return [header, ...rows].join("\n")
}
