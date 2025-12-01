"use client"

import { ProtectedRoute } from "@/components/protected-route"
import PersonnelManagement from "@/components/personnel/personnel-management"

export default function PersonnelPage() {
  return (
    <ProtectedRoute>
      <PersonnelManagement />
    </ProtectedRoute>
  )
}
