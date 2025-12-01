"use client"

import { ProtectedRoute } from "@/components/protected-route"
import JobsManagement from "@/components/jobs/jobs-management"

export default function JobsPage() {
  return (
    <ProtectedRoute>
      <JobsManagement />
    </ProtectedRoute>
  )
}
