"use client"

import { usePathname } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import DashboardLayout from "@/components/dashboard-layout"
import type { ReactNode } from "react"

export default function ClientLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const { isAuthenticated } = useAuth()

  const isAuthPage = pathname === "/login" || pathname === "/register"

  // If on auth page, render without layout
  if (isAuthPage) {
    return <>{children}</>
  }

  // If on protected page and not authenticated, render as is (will redirect from route)
  if (!isAuthenticated && !isAuthPage) {
    return <>{children}</>
  }

  // If authenticated, use dashboard layout
  if (isAuthenticated) {
    return <DashboardLayout>{children}</DashboardLayout>
  }

  return <>{children}</>
}
