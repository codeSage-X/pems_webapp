"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Package } from "lucide-react"

const equipmentStatus = [
  { id: 1, name: "Compressor Unit A", status: "Operational", availability: "95%" },
  { id: 2, name: "Pressure Gauge Kit", status: "Maintenance", availability: "60%" },
  { id: 3, name: "Pipeline Cleaner B", status: "Operational", availability: "92%" },
  { id: 4, name: "Seal Replacement Kit", status: "Operational", availability: "100%" },
]

export default function EquipmentOverview() {
  return (
    <Card className="border-slate-800 bg-slate-900/50 backdrop-blur">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Package size={20} />
              Equipment Inventory
            </CardTitle>
            <CardDescription>Operational status overview</CardDescription>
          </div>
          <Link href="/dashboard/equipment">
            <Button size="sm" variant="outline" className="border-slate-700 bg-transparent">
              View All
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {equipmentStatus.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-3 rounded-lg bg-slate-800/50">
              <div className="flex-1">
                <p className="font-medium text-white">{item.name}</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex-1 h-1 bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 to-teal-500"
                      style={{ width: item.availability }}
                    />
                  </div>
                  <span className="text-xs text-slate-400">{item.availability}</span>
                </div>
              </div>
              <span
                className={`text-xs font-semibold px-2 py-1 rounded ml-3 ${
                  item.status === "Operational"
                    ? "bg-emerald-600/20 text-emerald-400"
                    : "bg-orange-600/20 text-orange-400"
                }`}
              >
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
