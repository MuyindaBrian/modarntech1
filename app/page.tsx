import Link from "next/link"
import { ArrowRight, Globe, Palette, Smartphone, BarChart3, Search, Users, CheckCircle, Zap, Code2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { PostCard } from "@/components/blog/post-card"
import { ProjectCard } from "@/components/portfolio/project-card"
import { NewsletterForm } from "@/components/newsletter/newsletter-form"
import { getPosts } from "@/lib/actions/posts"
import { getFeaturedProjects } from "@/lib/actions/portfolio"
import { SERVICES, SITE_NAME } from "@/lib/constants"

const iconMap: Record<string, React.ReactNode> = {
  Globe: <Globe className="h-6 w-6" />,
  Palette: <Palette className="h-6 w-6" />,
  Smartphone: <Smartphone className="h-6 w-6" />,
  BarChart3: <BarChart3 className="h-6 w-6" />,
  Search: <Search className="h-6 w-6" />,
}

export default async function HomePage() {
  const [{ posts }, projects] = await Promise.all([
    getPosts({ limit: 3 }),
    getFeaturedProjects(),
  ])

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="bg-hero-gradient absolute inset-0" />
          <div className="bg-grid absolute inset-0 opacity-30" />
          <div className="relative mx-auto flex max-w-7xl flex-col items-center px-4 py-24 text-center lg:px-8 lg:py-36">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5">
              <Zap className="h-3.5 w-3.5 text-primary" />
              <span className="text-sm font-medium text-primary">Digital Solutions That Transform</span>
            </div>

            <h1 className="max-w-4xl text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl text-balance">
              Building Digital{" "}
              <span className="text-gradient">Excellence</span>{" "}
              for Your Business
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground text-pretty">
              We craft innovative web applications, mobile experiences, and data-driven solutions
              that help businesses grow and thrive in the digital landscape.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Button size="lg" asChild>
                <Link href="/contact">
                  Start a Project
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/portfolio">Explore Our Work</Link>
              </Button>
            </div>

            <div className="mt-16 grid grid-cols-2 gap-8 sm:grid-cols-4">
              {[
                { value: "3+", label: "Years Experience" },
                { value: "100+", label: "Happy Clients" },
                { value: "30+", label: "Projects Delivered" },
                { value: "24/7", label: "Support Available" },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col items-center">
                  <span className="text-3xl font-bold text-primary">{stat.value}</span>
                  <span className="mt-1 text-sm text-muted-foreground">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="border-t border-border bg-card/50 py-24">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
                Our Services
              </h2>
              <p className="mt-4 text-lg text-muted-foreground text-pretty">
                Comprehensive digital solutions tailored to your business needs.
              </p>
            </div>

            <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {SERVICES.map((service) => (
                <div
                  key={service.id}
                  className="group flex flex-col rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    {iconMap[service.icon]}
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-foreground">{service.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{service.description}</p>
                  <ul className="mt-4 flex flex-col gap-2">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="h-3.5 w-3.5 shrink-0 text-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Posts */}
        {posts.length > 0 && (
          <section className="py-24">
            <div className="mx-auto max-w-7xl px-4 lg:px-8">
              <div className="flex items-end justify-between">
                <div>
                  <h2 className="text-3xl font-bold tracking-tight text-foreground">Latest from the Blog</h2>
                  <p className="mt-2 text-muted-foreground">Insights, tutorials, and industry updates.</p>
                </div>
                <Button variant="ghost" asChild className="hidden sm:flex">
                  <Link href="/blog">
                    View all posts
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>

              <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>

              <div className="mt-8 text-center sm:hidden">
                <Button variant="outline" asChild>
                  <Link href="/blog">View all posts</Link>
                </Button>
              </div>
            </div>
          </section>
        )}

        {/* Portfolio Preview */}
        {projects.length > 0 && (
          <section className="border-t border-border bg-card/50 py-24">
            <div className="mx-auto max-w-7xl px-4 lg:px-8">
              <div className="flex items-end justify-between">
                <div>
                  <h2 className="text-3xl font-bold tracking-tight text-foreground">Featured Projects</h2>
                  <p className="mt-2 text-muted-foreground">A selection of our recent work.</p>
                </div>
                <Button variant="ghost" asChild className="hidden sm:flex">
                  <Link href="/portfolio">
                    View all projects
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>

              <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {projects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Newsletter Section */}
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="flex flex-col items-center rounded-2xl border border-border bg-card p-8 text-center sm:p-12">
              <Code2 className="h-10 w-10 text-primary" />
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground text-balance">
                Stay in the Loop
              </h2>
              <p className="mt-3 max-w-md text-muted-foreground text-pretty">
                Get the latest articles, tutorials, and insights delivered straight to your inbox. No spam, ever.
              </p>
              <div className="mt-8 w-full max-w-md">
                <NewsletterForm />
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="border-t border-border py-24">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="relative overflow-hidden rounded-2xl bg-primary p-8 sm:p-16">
              <div className="relative flex flex-col items-center text-center">
                <Users className="h-10 w-10 text-primary-foreground/80" />
                <h2 className="mt-4 text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl text-balance">
                  {"Let's Build Something Great Together"}
                </h2>
                <p className="mt-4 max-w-lg text-primary-foreground/80 text-pretty">
                  Ready to take your digital presence to the next level? Get in touch and
                  {"let's"} discuss how we can help your business grow.
                </p>
                <Button size="lg" variant="secondary" asChild className="mt-8">
                  <Link href="/contact">
                    Get In Touch
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
