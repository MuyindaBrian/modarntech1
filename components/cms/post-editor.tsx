"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { Save, Eye, EyeOff, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { createPost, updatePost } from "@/lib/actions/posts"
import { toast } from "sonner"
import type { Post } from "@/lib/types"

interface PostEditorProps {
  initialData?: Partial<Post>
}

export function PostEditor({ initialData }: PostEditorProps) {
  const router = useRouter()
  const isEditing = !!initialData?.id
  const [loading, setLoading] = useState(false)

  const [title, setTitle] = useState(initialData?.title || "")
  const [slug, setSlug] = useState(initialData?.slug || "")
  const [description, setDescription] = useState(initialData?.description || "")
  const [content, setContent] = useState(initialData?.content || "")
  const [tags, setTags] = useState(initialData?.tags?.join(", ") || "")
  const [featureImage, setFeatureImage] = useState(initialData?.feature_image || "")
  const [isPremium, setIsPremium] = useState(initialData?.is_premium || false)
  const [seoTitle, setSeoTitle] = useState(initialData?.seo_title || "")
  const [seoDescription, setSeoDescription] = useState(initialData?.seo_description || "")
  const [activeTab, setActiveTab] = useState<string>("write")

  function handleTitleChange(val: string) {
    setTitle(val)
    if (!isEditing) {
      setSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""))
    }
  }

  async function handleSave(status: "draft" | "published") {
    if (!title || !content) {
      toast.error("Title and content are required")
      return
    }
    setLoading(true)

    const postData = {
      title,
      slug,
      description,
      content,
      feature_image: featureImage || null,
      tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
      is_premium: isPremium,
      seo_title: seoTitle || null,
      seo_description: seoDescription || null,
      status,
    }

    const result = isEditing
      ? await updatePost(initialData!.id!, postData)
      : await createPost(postData)

    setLoading(false)

    if (result.success) {
      toast.success(status === "published" ? "Post published!" : "Post saved as draft!")
      router.push("/cms/posts")
    } else {
      toast.error(result.error || "Failed to save post")
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <Card>
          <CardContent className="p-0">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <div className="flex items-center justify-between border-b border-border px-4 py-2">
                <TabsList>
                  <TabsTrigger value="write">Write</TabsTrigger>
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                </TabsList>
                <Button variant="ghost" size="sm" asChild>
                  <a href="/cms/ai" target="_blank">
                    <Sparkles className="mr-2 h-3.5 w-3.5" />
                    AI Assist
                  </a>
                </Button>
              </div>

              <div className="p-4">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <Input
                      value={title}
                      onChange={(e) => handleTitleChange(e.target.value)}
                      placeholder="Post title..."
                      className="border-0 bg-transparent text-2xl font-bold shadow-none focus-visible:ring-0 placeholder:text-muted-foreground/50"
                    />
                  </div>

                  <TabsContent value="write" className="m-0">
                    <Textarea
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder="Write your content in Markdown..."
                      className="min-h-[500px] resize-none border-0 bg-transparent font-mono text-sm shadow-none focus-visible:ring-0"
                    />
                  </TabsContent>

                  <TabsContent value="preview" className="m-0">
                    <div className="prose prose-invert min-h-[500px] max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-primary prose-strong:text-foreground prose-code:bg-secondary prose-code:rounded-md prose-code:px-1 prose-code:text-foreground">
                      {content ? (
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
                      ) : (
                        <p className="text-muted-foreground">Nothing to preview yet. Start writing!</p>
                      )}
                    </div>
                  </TabsContent>
                </div>
              </div>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* Sidebar */}
      <div className="flex flex-col gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Publish</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <Button onClick={() => handleSave("published")} disabled={loading}>
              <Save className="mr-2 h-4 w-4" />
              {loading ? "Saving..." : "Publish"}
            </Button>
            <Button variant="outline" onClick={() => handleSave("draft")} disabled={loading}>
              Save as Draft
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Details</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label className="text-xs">Slug</Label>
              <Input value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="post-slug" className="text-sm" />
            </div>
            <div className="flex flex-col gap-2">
              <Label className="text-xs">Description</Label>
              <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Brief description..." rows={3} className="text-sm" />
            </div>
            <div className="flex flex-col gap-2">
              <Label className="text-xs">Tags (comma-separated)</Label>
              <Input value={tags} onChange={(e) => setTags(e.target.value)} placeholder="React, Next.js, TypeScript" className="text-sm" />
            </div>
            <div className="flex flex-col gap-2">
              <Label className="text-xs">Feature Image URL</Label>
              <Input value={featureImage} onChange={(e) => setFeatureImage(e.target.value)} placeholder="https://..." className="text-sm" />
            </div>
            <div className="flex items-center justify-between">
              <Label className="text-xs">Premium Content</Label>
              <Switch checked={isPremium} onCheckedChange={setIsPremium} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">SEO</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label className="text-xs">SEO Title</Label>
              <Input value={seoTitle} onChange={(e) => setSeoTitle(e.target.value)} placeholder="Custom SEO title..." className="text-sm" />
            </div>
            <div className="flex flex-col gap-2">
              <Label className="text-xs">SEO Description</Label>
              <Textarea value={seoDescription} onChange={(e) => setSeoDescription(e.target.value)} placeholder="Custom meta description..." rows={3} className="text-sm" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
