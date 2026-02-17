"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { submitContactForm } from "@/lib/actions/contact"
import { toast } from "sonner"

export function ContactForm() {
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    const result = await submitContactForm(form)
    setLoading(false)

    if (result.success) {
      toast.success("Message sent successfully! We'll get back to you soon.")
      setForm({ name: "", email: "", subject: "", message: "" })
    } else {
      toast.error(result.error || "Failed to send message. Please try again.")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-xl border border-border bg-card p-6 sm:p-8">
      <h2 className="text-xl font-semibold text-foreground">Send us a message</h2>
      <p className="mt-1 text-sm text-muted-foreground">Fill out the form below and {"we'll"} get back to you as soon as possible.</p>

      <div className="mt-6 flex flex-col gap-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required placeholder="John Doe" />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required placeholder="john@example.com" />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="subject">Subject</Label>
          <Input id="subject" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} required placeholder="Project Inquiry" />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="message">Message</Label>
          <Textarea id="message" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required placeholder="Tell us about your project..." rows={6} />
        </div>

        <Button type="submit" disabled={loading} className="w-fit">
          {loading ? "Sending..." : "Send Message"}
        </Button>
      </div>
    </form>
  )
}
