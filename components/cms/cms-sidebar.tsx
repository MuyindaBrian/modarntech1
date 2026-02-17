"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard, FileText, FolderOpen, Mail, MessageSquare, BarChart3, Sparkles,
  ExternalLink, LogOut, ChevronUp,
} from "lucide-react"
import {
  Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
  SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarSeparator,
} from "@/components/ui/sidebar"
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SITE_NAME } from "@/lib/constants"

const navItems = [
  { label: "Dashboard", href: "/cms", icon: LayoutDashboard },
  { label: "Posts", href: "/cms/posts", icon: FileText },
  { label: "Portfolio", href: "/cms/portfolio", icon: FolderOpen },
  { label: "Newsletter", href: "/cms/newsletter", icon: Mail },
  { label: "Comments", href: "/cms/comments", icon: MessageSquare },
  { label: "Analytics", href: "/cms/analytics", icon: BarChart3 },
  { label: "AI Assistant", href: "/cms/ai", icon: Sparkles },
]

export function CmsSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <Link href="/cms" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <span className="text-sm font-bold text-primary-foreground">M</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-foreground">{SITE_NAME}</span>
            <span className="text-xs text-muted-foreground">Content Management</span>
          </div>
        </Link>
      </SidebarHeader>

      <SidebarSeparator />

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                const isActive = pathname === item.href || (item.href !== "/cms" && pathname.startsWith(item.href))
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton asChild isActive={isActive}>
                      <Link href={item.href}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                    A
                  </div>
                  <span>Admin</span>
                  <ChevronUp className="ml-auto h-4 w-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="top" className="w-48">
                <DropdownMenuItem asChild>
                  <Link href="/" className="flex items-center gap-2">
                    <ExternalLink className="h-4 w-4" />
                    View Site
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/login" className="flex items-center gap-2">
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
