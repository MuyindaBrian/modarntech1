"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { resetPassword } from "@/lib/auth/actions"
import { toast } from "sonner"
import { SITE_NAME } from "@/lib/constants"

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    const result = await resetPassword(email)
    setLoading(false)

    if (result.success) {
      setSent(true)
      toast.success("Check your email for a reset link!")
    } else {
      toast.error(result.error || "Something went wrong")
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center text-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <span className="text-lg font-bold text-primary-foreground">M</span>
            </div>
          </Link>
          <h1 className="mt-4 text-2xl font-bold text-foreground">Reset Password</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {"Enter your email to receive a reset link"}
          </p>
        </div>

        {sent ? (
          <div className="rounded-xl border border-border bg-card p-6 text-center">
            <p className="text-sm text-muted-foreground">
              {"We've sent a password reset link to"} <strong className="text-foreground">{email}</strong>. Check your inbox.
            </p>
            <Button variant="outline" asChild className="mt-4">
              <Link href="/login">Back to Sign In</Link>
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 rounded-xl border border-border bg-card p-6">
            <div className="flex flex-col gap-2">
              <Label htmlFor="reset-email">Email</Label>
              <Input
                id="reset-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
              />
            </div>
            <Button type="submit" disabled={loading}>
              {loading ? "Sending..." : "Send Reset Link"}
            </Button>
          </form>
        )}

        <p className="mt-6 text-center text-sm text-muted-foreground">
          <Link href="/login" className="text-primary hover:underline">
            Back to Sign In
          </Link>
        </p>
      </div>
    </div>
  )
}
