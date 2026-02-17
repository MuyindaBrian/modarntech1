import type { Metadata } from "next"
import { Code2, Users, Target, Eye, CheckCircle } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Progress } from "@/components/ui/progress"
import { TECHNOLOGIES, SITE_NAME } from "@/lib/constants"

export const metadata: Metadata = {
  title: "About",
  description: `Learn about ${SITE_NAME} - our mission, vision, and the team behind the digital solutions.`,
}

const skills = [
  { name: "Web Development", level: 95 },
  { name: "Mobile Development", level: 90 },
  { name: "Data Analysis", level: 85 },
  { name: "UI/UX Design", level: 88 },
  { name: "SEO & Marketing", level: 82 },
]

const stats = [
  { value: "3+", label: "Years of Experience" },
  { value: "100+", label: "Happy Clients" },
  { value: "30+", label: "Projects Completed" },
  { value: "24/7", label: "Support Available" },
]

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-border">
          <div className="bg-hero-gradient absolute inset-0" />
          <div className="relative mx-auto max-w-7xl px-4 py-20 lg:px-8 lg:py-28">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl text-balance">
                About <span className="text-gradient">{SITE_NAME}</span>
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground text-pretty">
                We are a digital solutions company based in Jinja, Uganda, dedicated to building
                innovative technology solutions that transform businesses and empower communities.
              </p>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-foreground">Our Story</h2>
                <div className="mt-6 flex flex-col gap-4 text-muted-foreground leading-relaxed">
                  <p>
                    {SITE_NAME} was founded with a simple yet powerful mission: to bridge the digital divide
                    by providing world-class technology solutions to businesses of all sizes. What started as a
                    small web development studio has grown into a full-service digital agency.
                  </p>
                  <p>
                    Our team brings together expertise in web development, mobile applications, data analysis,
                    and digital marketing to deliver comprehensive solutions that drive real business results.
                  </p>
                  <p>
                    We believe technology should be accessible, intuitive, and transformative. Every project
                    we take on is an opportunity to push boundaries and create something exceptional.
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-8">
                <div className="grid grid-cols-2 gap-4">
                  {stats.map((stat) => (
                    <div key={stat.label} className="flex flex-col items-center rounded-xl border border-border bg-card p-6">
                      <span className="text-3xl font-bold text-primary">{stat.value}</span>
                      <span className="mt-1 text-center text-sm text-muted-foreground">{stat.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="border-t border-border bg-card/50 py-24">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-2">
              <div className="flex flex-col rounded-xl border border-border bg-card p-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Target className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-xl font-bold text-foreground">Our Mission</h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">
                  To empower businesses with cutting-edge digital solutions that drive growth,
                  efficiency, and innovation. We strive to make technology accessible and impactful
                  for every client we serve.
                </p>
              </div>

              <div className="flex flex-col rounded-xl border border-border bg-card p-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Eye className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-xl font-bold text-foreground">Our Vision</h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">
                  {"To be East Africa's"} leading digital agency, recognized for delivering exceptional
                  technology solutions that set the standard for innovation, quality, and client satisfaction.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Skills */}
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="grid gap-16 lg:grid-cols-2">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-foreground">Our Expertise</h2>
                <p className="mt-4 text-muted-foreground">
                  We bring deep expertise across multiple technology domains to deliver holistic solutions.
                </p>
                <div className="mt-8 flex flex-col gap-6">
                  {skills.map((skill) => (
                    <div key={skill.name} className="flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-foreground">{skill.name}</span>
                        <span className="text-sm text-muted-foreground">{skill.level}%</span>
                      </div>
                      <Progress value={skill.level} className="h-2" />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-3xl font-bold tracking-tight text-foreground">Technologies</h2>
                <p className="mt-4 text-muted-foreground">
                  We work with the latest and most reliable technologies to build robust solutions.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  {TECHNOLOGIES.map((tech) => (
                    <span
                      key={tech}
                      className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-foreground"
                    >
                      <Code2 className="h-3.5 w-3.5 text-primary" />
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="border-t border-border bg-card/50 py-24">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <h2 className="text-center text-3xl font-bold tracking-tight text-foreground">What Drives Us</h2>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { title: "Innovation", desc: "We push boundaries and embrace new technologies to stay ahead." },
                { title: "Quality", desc: "Every line of code and design pixel reflects our commitment to excellence." },
                { title: "Collaboration", desc: "We work closely with clients to ensure their vision comes to life." },
                { title: "Integrity", desc: "Transparency and honesty guide every decision we make." },
              ].map((value) => (
                <div key={value.title} className="flex flex-col rounded-xl border border-border bg-card p-6">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <h3 className="mt-3 text-lg font-semibold text-foreground">{value.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{value.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
