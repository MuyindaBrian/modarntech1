import type { Metadata } from "next"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ProjectCard } from "@/components/portfolio/project-card"
import { Badge } from "@/components/ui/badge"
import { getProjects } from "@/lib/actions/portfolio"

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Explore our portfolio of web development, mobile apps, and data analysis projects.",
}

const categories = ["All", "Web Development", "Mobile Development", "Data Analysis"]

export default async function PortfolioPage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const params = await searchParams
  const activeCategory = params.category || "All"
  const projects = await getProjects(activeCategory)

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        <section className="border-b border-border">
          <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
            <h1 className="text-4xl font-bold tracking-tight text-foreground">Our Portfolio</h1>
            <p className="mt-3 text-lg text-muted-foreground">
              A showcase of our work across web, mobile, and data solutions.
            </p>

            <div className="mt-8 flex flex-wrap gap-2">
              {categories.map((category) => (
                <Link key={category} href={category === "All" ? "/portfolio" : `/portfolio?category=${encodeURIComponent(category)}`}>
                  <Badge
                    variant={activeCategory === category ? "default" : "secondary"}
                    className="cursor-pointer px-4 py-1.5 text-sm"
                  >
                    {category}
                  </Badge>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            {projects.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {projects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center py-24 text-center">
                <h2 className="text-xl font-semibold text-foreground">No projects found</h2>
                <p className="mt-2 text-muted-foreground">
                  No projects in this category yet. Check back soon!
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
