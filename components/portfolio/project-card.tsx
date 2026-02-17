import { ExternalLink, Github } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { PortfolioProject } from "@/lib/types"

export function ProjectCard({ project }: { project: PortfolioProject }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
      <div className="relative aspect-[16/10] overflow-hidden bg-secondary">
        {project.image_url ? (
          <img
            src={project.image_url}
            alt={project.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            crossOrigin="anonymous"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/10 to-secondary">
            <span className="text-5xl font-bold text-primary/20">{project.title.charAt(0)}</span>
          </div>
        )}
        <div className="absolute inset-0 flex items-center justify-center gap-3 bg-background/80 opacity-0 transition-opacity group-hover:opacity-100">
          {project.live_url && (
            <a href={project.live_url} target="_blank" rel="noopener noreferrer">
              <Button size="sm" variant="secondary">
                <ExternalLink className="mr-1 h-3 w-3" />
                Live Demo
              </Button>
            </a>
          )}
          {project.github_url && (
            <a href={project.github_url} target="_blank" rel="noopener noreferrer">
              <Button size="sm" variant="outline">
                <Github className="mr-1 h-3 w-3" />
                Code
              </Button>
            </a>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <Badge variant="outline" className="w-fit text-xs">
          {project.category}
        </Badge>
        <h3 className="text-lg font-semibold text-foreground">{project.title}</h3>
        <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">{project.description}</p>
        <div className="mt-auto flex flex-wrap gap-1.5 pt-3">
          {project.tech_stack.slice(0, 4).map((tech) => (
            <span key={tech} className="rounded-md bg-secondary px-2 py-0.5 text-xs text-muted-foreground">
              {tech}
            </span>
          ))}
          {project.tech_stack.length > 4 && (
            <span className="rounded-md bg-secondary px-2 py-0.5 text-xs text-muted-foreground">
              +{project.tech_stack.length - 4}
            </span>
          )}
        </div>
      </div>
    </article>
  )
}
