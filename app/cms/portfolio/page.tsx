"use client"

import { useState, useEffect } from "react"
import { Plus, Pencil, Trash2, ExternalLink, GripVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose,
} from "@/components/ui/dialog"
import { getProjects, createProject, updateProject, deleteProject } from "@/lib/actions/portfolio"
import { toast } from "sonner"
import type { PortfolioProject } from "@/lib/types"

const emptyForm = {
  title: "", description: "", image_url: "", tech_stack: "", category: "Web Development",
  live_url: "", github_url: "", case_study: "", featured: false, sort_order: 0,
}

export default function CmsPortfolioPage() {
  const [projects, setProjects] = useState<PortfolioProject[]>([])
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [loading, setLoading] = useState(false)

  async function load() {
    const data = await getProjects()
    setProjects(data)
  }

  useEffect(() => { load() }, [])

  function openNew() {
    setEditingId(null)
    setForm({ ...emptyForm, sort_order: projects.length + 1 })
    setDialogOpen(true)
  }

  function openEdit(p: PortfolioProject) {
    setEditingId(p.id)
    setForm({
      title: p.title, description: p.description, image_url: p.image_url || "",
      tech_stack: p.tech_stack.join(", "), category: p.category,
      live_url: p.live_url || "", github_url: p.github_url || "",
      case_study: p.case_study || "", featured: p.featured, sort_order: p.sort_order,
    })
    setDialogOpen(true)
  }

  async function handleSave() {
    if (!form.title || !form.description) {
      toast.error("Title and description are required")
      return
    }
    setLoading(true)
    const payload = {
      title: form.title, description: form.description,
      image_url: form.image_url || null,
      tech_stack: form.tech_stack.split(",").map((t) => t.trim()).filter(Boolean),
      category: form.category, live_url: form.live_url || null,
      github_url: form.github_url || null, case_study: form.case_study || null,
      featured: form.featured, sort_order: form.sort_order,
    }

    const result = editingId
      ? await updateProject(editingId, payload)
      : await createProject(payload)

    setLoading(false)
    if (result.success) {
      toast.success(editingId ? "Project updated!" : "Project created!")
      setDialogOpen(false)
      load()
    } else {
      toast.error(result.error || "Failed to save project")
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this project?")) return
    const result = await deleteProject(id)
    if (result.success) {
      toast.success("Project deleted")
      load()
    } else {
      toast.error(result.error || "Failed to delete")
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Portfolio</h1>
          <p className="text-sm text-muted-foreground">{projects.length} projects</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openNew}>
              <Plus className="mr-2 h-4 w-4" />
              New Project
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingId ? "Edit Project" : "New Project"}</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col gap-4 py-4">
              <div className="flex flex-col gap-2">
                <Label>Title</Label>
                <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
              </div>
              <div className="flex flex-col gap-2">
                <Label>Description</Label>
                <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <Label>Category</Label>
                  <Input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder="Web Development" />
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Sort Order</Label>
                  <Input type="number" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: Number(e.target.value) })} />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Label>Tech Stack (comma-separated)</Label>
                <Input value={form.tech_stack} onChange={(e) => setForm({ ...form, tech_stack: e.target.value })} placeholder="Next.js, TypeScript, Supabase" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <Label>Live URL</Label>
                  <Input value={form.live_url} onChange={(e) => setForm({ ...form, live_url: e.target.value })} />
                </div>
                <div className="flex flex-col gap-2">
                  <Label>GitHub URL</Label>
                  <Input value={form.github_url} onChange={(e) => setForm({ ...form, github_url: e.target.value })} />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Label>Image URL</Label>
                <Input value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} />
              </div>
              <div className="flex flex-col gap-2">
                <Label>Case Study</Label>
                <Textarea value={form.case_study} onChange={(e) => setForm({ ...form, case_study: e.target.value })} rows={4} />
              </div>
              <div className="flex items-center justify-between">
                <Label>Featured</Label>
                <Switch checked={form.featured} onCheckedChange={(v) => setForm({ ...form, featured: v })} />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button onClick={handleSave} disabled={loading}>
                {loading ? "Saving..." : "Save Project"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Card key={project.id}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <GripVertical className="h-4 w-4 text-muted-foreground" />
                  <CardTitle className="text-base">{project.title}</CardTitle>
                </div>
                {project.featured && <Badge>Featured</Badge>}
              </div>
            </CardHeader>
            <CardContent>
              <p className="mb-3 line-clamp-2 text-sm text-muted-foreground">{project.description}</p>
              <div className="mb-4 flex flex-wrap gap-1">
                {project.tech_stack.slice(0, 3).map((tech) => (
                  <Badge key={tech} variant="secondary" className="text-xs">{tech}</Badge>
                ))}
                {project.tech_stack.length > 3 && (
                  <Badge variant="secondary" className="text-xs">+{project.tech_stack.length - 3}</Badge>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={() => openEdit(project)}>
                  <Pencil className="mr-1 h-3 w-3" /> Edit
                </Button>
                {project.live_url && (
                  <Button variant="ghost" size="sm" asChild>
                    <a href={project.live_url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-1 h-3 w-3" /> View
                    </a>
                  </Button>
                )}
                <Button variant="ghost" size="sm" className="ml-auto text-destructive hover:text-destructive" onClick={() => handleDelete(project.id)}>
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
