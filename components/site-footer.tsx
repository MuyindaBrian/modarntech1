import Link from "next/link"
import { Github, Twitter, Linkedin, Facebook, Mail, MapPin, Phone } from "lucide-react"
import { SITE_NAME, CONTACT_INFO, SOCIAL_LINKS, NAV_LINKS, SERVICES } from "@/lib/constants"

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <span className="text-sm font-bold text-primary-foreground">M</span>
              </div>
              <span className="text-lg font-bold tracking-tight text-foreground">{SITE_NAME}</span>
            </Link>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Building digital excellence for businesses worldwide. We transform ideas into powerful digital solutions.
            </p>
            <div className="flex items-center gap-3">
              <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer" className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground" aria-label="GitHub">
                <Github className="h-4 w-4" />
              </a>
              <a href={SOCIAL_LINKS.twitter} target="_blank" rel="noopener noreferrer" className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground" aria-label="Twitter">
                <Twitter className="h-4 w-4" />
              </a>
              <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground" aria-label="LinkedIn">
                <Linkedin className="h-4 w-4" />
              </a>
              <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground" aria-label="Facebook">
                <Facebook className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold text-foreground">Navigation</h3>
            <nav className="flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <Link key={link.href} href={link.href} className="text-sm text-muted-foreground transition-colors hover:text-primary">
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold text-foreground">Services</h3>
            <nav className="flex flex-col gap-2">
              {SERVICES.map((service) => (
                <span key={service.id} className="text-sm text-muted-foreground">
                  {service.title}
                </span>
              ))}
            </nav>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold text-foreground">Contact</h3>
            <div className="flex flex-col gap-3">
              <a href={`mailto:${CONTACT_INFO.email}`} className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary">
                <Mail className="h-4 w-4 shrink-0" />
                {CONTACT_INFO.email}
              </a>
              <a href={`tel:${CONTACT_INFO.phone}`} className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary">
                <Phone className="h-4 w-4 shrink-0" />
                {CONTACT_INFO.phone}
              </a>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 shrink-0" />
                {CONTACT_INFO.location}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <p className="text-sm text-muted-foreground">
            {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/blog" className="text-sm text-muted-foreground transition-colors hover:text-primary">Blog</Link>
            <Link href="/portfolio" className="text-sm text-muted-foreground transition-colors hover:text-primary">Portfolio</Link>
            <Link href="/contact" className="text-sm text-muted-foreground transition-colors hover:text-primary">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
