import { PostEditor } from "@/components/cms/post-editor"

export default function NewPostPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Create New Post</h1>
        <p className="text-sm text-muted-foreground">Write and publish a new blog post.</p>
      </div>
      <PostEditor />
    </div>
  )
}
