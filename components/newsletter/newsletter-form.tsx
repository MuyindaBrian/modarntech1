"use client"

import { useState } from "react"
import { Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { subscribe } from "@/lib/actions/newsletter"
import { toast } from "sonner"

export function NewsletterForm() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return

    setLoading(true)
    const result = await subscribe(email)
    setLoading(false)

    if (result.success) {
      toast.success("Successfully subscribed! Welcome aboard.")
      setEmail("")
    } else {
      toast.error(result.error || "Something went wrong. Please try again.")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-md flex-col gap-3 sm:flex-row">
      <div className="relative flex-1">
        <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="pl-10"
        />
      </div>
      <Button type="submit" disabled={loading}>
        {loading ? "Subscribing..." : "Subscribe"}
      </Button>
    </form>
  )
}
