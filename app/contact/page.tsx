import type { Metadata } from "next"
import { Mail, Phone, MapPin, Github, Twitter, Linkedin } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ContactForm } from "@/components/contact-form"
import { CONTACT_INFO, SOCIAL_LINKS } from "@/lib/constants"

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with MODARNTECH. We'd love to hear about your project.",
}

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        <section className="border-b border-border">
          <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
            <h1 className="text-4xl font-bold tracking-tight text-foreground">Get in Touch</h1>
            <p className="mt-3 text-lg text-muted-foreground">
              {"Have a project in mind? Let's talk about how we can help."}
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-3">
              {/* Contact Info Sidebar */}
              <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-6">
                  <h2 className="text-xl font-semibold text-foreground">Contact Information</h2>

                  <a href={`mailto:${CONTACT_INFO.email}`} className="flex items-start gap-3 rounded-lg p-3 transition-colors hover:bg-secondary">
                    <Mail className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Email</p>
                      <p className="text-sm text-muted-foreground">{CONTACT_INFO.email}</p>
                    </div>
                  </a>

                  <a href={`tel:${CONTACT_INFO.phone}`} className="flex items-start gap-3 rounded-lg p-3 transition-colors hover:bg-secondary">
                    <Phone className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Phone</p>
                      <p className="text-sm text-muted-foreground">{CONTACT_INFO.phone}</p>
                      <p className="text-sm text-muted-foreground">{CONTACT_INFO.altPhone}</p>
                    </div>
                  </a>

                  <div className="flex items-start gap-3 rounded-lg p-3">
                    <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Location</p>
                      <p className="text-sm text-muted-foreground">{CONTACT_INFO.address}</p>
                      <p className="text-sm text-muted-foreground">{CONTACT_INFO.location}</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <h3 className="text-sm font-semibold text-foreground">Follow Us</h3>
                  <div className="flex items-center gap-3">
                    <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer" className="rounded-md border border-border p-2.5 text-muted-foreground transition-colors hover:border-primary hover:text-primary" aria-label="GitHub">
                      <Github className="h-4 w-4" />
                    </a>
                    <a href={SOCIAL_LINKS.twitter} target="_blank" rel="noopener noreferrer" className="rounded-md border border-border p-2.5 text-muted-foreground transition-colors hover:border-primary hover:text-primary" aria-label="Twitter">
                      <Twitter className="h-4 w-4" />
                    </a>
                    <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="rounded-md border border-border p-2.5 text-muted-foreground transition-colors hover:border-primary hover:text-primary" aria-label="LinkedIn">
                      <Linkedin className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-2">
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
