import { PostEditor } from "@/components/cms/post-editor"
import { mockPosts } from "@/lib/mock-data"

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  // In production, fetch from Supabase. For now, use mock data
  const post = mockPosts.find((p) => p.id === id) || mockPosts[0]

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Edit Post</h1>
        <p className="text-sm text-muted-foreground">Update your blog post content and settings.</p>
      </div>
      <PostEditor initialData={post} />
    </div>
  )
}
