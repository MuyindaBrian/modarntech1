import type { Metadata } from "next"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { CmsSidebar } from "@/components/cms/cms-sidebar"
import { Separator } from "@/components/ui/separator"

export const metadata: Metadata = {
  title: {
    default: "CMS Dashboard",
    template: "%s | MODARNTECH CMS",
  },
}

export default function CmsLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <CmsSidebar />
      <SidebarInset>
        <header className="flex h-14 items-center gap-2 border-b border-border px-4">
          <SidebarTrigger />
          <Separator orientation="vertical" className="h-6" />
          <span className="text-sm text-muted-foreground">CMS</span>
        </header>
        <div className="flex-1 p-4 lg:p-6">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
