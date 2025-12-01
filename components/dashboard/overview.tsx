"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Users, Package, Briefcase, Truck } from "lucide-react"
import PersonnelOverview from "./personnel-overview"
import EquipmentOverview from "./equipment-overview"
import JobsOverview from "./jobs-overview"
import LogisticsOverview from "./logistics-overview"

const stats = [
  {
    label: "Total Personnel",
    value: "24",
    icon: Users,
    color: "from-blue-600 to-cyan-600",
  },
  {
    label: "Equipment",
    value: "58",
    icon: Package,
    color: "from-emerald-600 to-teal-600",
  },
  {
    label: "Active Jobs",
    value: "12",
    icon: Briefcase,
    color: "from-orange-600 to-red-600",
  },
  {
    label: "Vehicles",
    value: "16",
    icon: Truck,
    color: "from-purple-600 to-pink-600",
  },
]

export default function DashboardOverview() {
  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-slate-400">Welcome to PEMS 2.0 - Personnel & Equipment Maintenance System</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.label} className="border-slate-800 bg-slate-900/50 backdrop-blur">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-400 mb-2">{stat.label}</p>
                    <p className="text-3xl font-bold text-white">{stat.value}</p>
                  </div>
                  <div className={`bg-gradient-to-br ${stat.color} p-3 rounded-lg`}>
                    <Icon size={24} className="text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <PersonnelOverview />
        <EquipmentOverview />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <JobsOverview />
        <LogisticsOverview />
      </div>
    </div>
  )
}
