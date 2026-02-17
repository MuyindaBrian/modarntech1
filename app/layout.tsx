import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "MODARNTECH - Building Digital Excellence",
    template: "%s | MODARNTECH",
  },
  description: "Web Development, Mobile Apps, Data Analysis & SEO Solutions. Building digital excellence for businesses worldwide.",
  keywords: ["web development", "mobile apps", "data analysis", "SEO", "Uganda", "MODARNTECH"],
  authors: [{ name: "MODARNTECH" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "MODARNTECH",
    title: "MODARNTECH - Building Digital Excellence",
    description: "Web Development, Mobile Apps, Data Analysis & SEO Solutions.",
  },
  twitter: {
    card: "summary_large_image",
    title: "MODARNTECH - Building Digital Excellence",
    description: "Web Development, Mobile Apps, Data Analysis & SEO Solutions.",
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: "#0a0a14",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark" disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
