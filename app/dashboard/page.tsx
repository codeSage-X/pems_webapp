"use client"

import { ProtectedRoute } from "@/components/protected-route"
import DashboardOverview from "@/components/dashboard/overview"

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardOverview />
    </ProtectedRoute>
  )
}
