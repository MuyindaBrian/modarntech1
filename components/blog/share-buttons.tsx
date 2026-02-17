"use client"

import { Twitter, Linkedin, Facebook, Link2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

export function ShareButtons({ title, url }: { title: string; url: string }) {
  const encodedTitle = encodeURIComponent(title)
  const encodedUrl = encodeURIComponent(url)

  function copyLink() {
    navigator.clipboard.writeText(url)
    toast.success("Link copied to clipboard!")
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground">Share:</span>
      <a
        href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on Twitter"
      >
        <Button variant="ghost" size="icon-sm">
          <Twitter className="h-4 w-4" />
        </Button>
      </a>
      <a
        href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on LinkedIn"
      >
        <Button variant="ghost" size="icon-sm">
          <Linkedin className="h-4 w-4" />
        </Button>
      </a>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on Facebook"
      >
        <Button variant="ghost" size="icon-sm">
          <Facebook className="h-4 w-4" />
        </Button>
      </a>
      <Button variant="ghost" size="icon-sm" onClick={copyLink} aria-label="Copy link">
        <Link2 className="h-4 w-4" />
      </Button>
    </div>
  )
}
