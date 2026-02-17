export const SITE_NAME = "MODARNTECH"
export const SITE_DESCRIPTION = "Building Digital Excellence for Your Business - Web Development, Mobile Apps, Data Analysis & SEO Solutions"
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://modantech.com"

export const CONTACT_INFO = {
  email: "info@modantech.com",
  phone: "+256 700 000 000",
  altPhone: "+256 780 000 000",
  location: "Jinja, Uganda",
  address: "Plot 12, Main Street, Jinja",
}

export const SOCIAL_LINKS = {
  github: "https://github.com/modantech",
  twitter: "https://twitter.com/modantech",
  linkedin: "https://linkedin.com/company/modantech",
  facebook: "https://facebook.com/modantech",
}

export const SERVICES = [
  {
    id: "web-development",
    title: "Web Development",
    description: "Custom web applications built with modern frameworks like React, Next.js, and Node.js. Scalable, performant, and maintainable solutions.",
    features: ["Custom Web Apps", "E-Commerce", "Progressive Web Apps", "API Development"],
    icon: "Globe",
  },
  {
    id: "web-design",
    title: "Web Design",
    description: "Beautiful, responsive designs that convert. From landing pages to full brand experiences with a focus on UX and accessibility.",
    features: ["UI/UX Design", "Responsive Design", "Brand Identity", "Prototyping"],
    icon: "Palette",
  },
  {
    id: "mobile-development",
    title: "Mobile Development",
    description: "Cross-platform mobile applications using React Native and Flutter. Native performance with a single codebase.",
    features: ["iOS Apps", "Android Apps", "Cross-Platform", "App Store Optimization"],
    icon: "Smartphone",
  },
  {
    id: "data-analysis",
    title: "Data Analysis",
    description: "Transform raw data into actionable insights. Dashboards, reports, and data-driven decision making for your business.",
    features: ["Business Intelligence", "Data Visualization", "Predictive Analytics", "Custom Reports"],
    icon: "BarChart3",
  },
  {
    id: "seo",
    title: "SEO & Digital Marketing",
    description: "Boost your online presence with proven SEO strategies and digital marketing campaigns that drive organic growth.",
    features: ["Technical SEO", "Content Strategy", "Link Building", "Performance Audits"],
    icon: "Search",
  },
] as const

export const TECHNOLOGIES = [
  "React", "Next.js", "TypeScript", "Node.js", "Python",
  "PostgreSQL", "Supabase", "Tailwind CSS", "React Native",
  "Flutter", "Docker", "AWS", "Vercel", "GraphQL",
  "Redis", "MongoDB",
] as const

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Contact", href: "/contact" },
] as const

export const CMS_NAV_LINKS = [
  { label: "Dashboard", href: "/cms", icon: "LayoutDashboard" },
  { label: "Posts", href: "/cms/posts", icon: "FileText" },
  { label: "Portfolio", href: "/cms/portfolio", icon: "FolderOpen" },
  { label: "Newsletter", href: "/cms/newsletter", icon: "Mail" },
  { label: "Comments", href: "/cms/comments", icon: "MessageSquare" },
  { label: "Analytics", href: "/cms/analytics", icon: "BarChart3" },
  { label: "AI Assistant", href: "/cms/ai", icon: "Sparkles" },
] as const
