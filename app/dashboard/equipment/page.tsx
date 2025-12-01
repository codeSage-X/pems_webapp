"use client"

import { ProtectedRoute } from "@/components/protected-route"
import EquipmentManagement from "@/components/equipment/equipment-management"

export default function EquipmentPage() {
  return (
    <ProtectedRoute>
      <EquipmentManagement />
    </ProtectedRoute>
  )
}
