import type { Metadata } from "next"
import Link from "next/link"
import { LoginForm } from "@/components/login-form"
import { SITE_NAME } from "@/lib/constants"

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your MODARNTECH CMS account.",
}

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center text-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <span className="text-lg font-bold text-primary-foreground">M</span>
            </div>
          </Link>
          <h1 className="mt-4 text-2xl font-bold text-foreground">{SITE_NAME} CMS</h1>
          <p className="mt-1 text-sm text-muted-foreground">Sign in to manage your content</p>
        </div>

        <LoginForm />

        <p className="mt-6 text-center text-sm text-muted-foreground">
          <Link href="/reset-password" className="text-primary hover:underline">
            Forgot your password?
          </Link>
        </p>

        <p className="mt-4 text-center text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground">
            Back to website
          </Link>
        </p>
      </div>
    </div>
  )
}
