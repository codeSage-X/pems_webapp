"use client"

import { ProtectedRoute } from "@/components/protected-route"
import LogisticsManagement from "@/components/logistics/logistics-management"

export default function LogisticsPage() {
  return (
    <ProtectedRoute>
      <LogisticsManagement />
    </ProtectedRoute>
  )
}
