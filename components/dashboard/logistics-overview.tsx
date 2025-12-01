"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Truck } from "lucide-react"

const vehicles = [
  { id: 1, name: "Truck-001", type: "Cargo Truck", status: "In Transit" },
  { id: 2, name: "Car-002", type: "Service Vehicle", status: "Available" },
  { id: 3, name: "Truck-003", type: "Tanker", status: "In Transit" },
]

export default function LogisticsOverview() {
  return (
    <Card className="border-slate-800 bg-slate-900/50 backdrop-blur">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Truck size={20} />
              Logistics & Vehicles
            </CardTitle>
            <CardDescription>Fleet overview</CardDescription>
          </div>
          <Link href="/dashboard/logistics">
            <Button size="sm" variant="outline" className="border-slate-700 bg-transparent">
              View All
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {vehicles.map((vehicle) => (
            <div key={vehicle.id} className="flex items-center justify-between p-3 rounded-lg bg-slate-800/50">
              <div>
                <p className="font-medium text-white">{vehicle.name}</p>
                <p className="text-xs text-slate-400">{vehicle.type}</p>
              </div>
              <span
                className={`text-xs font-semibold px-2 py-1 rounded ${
                  vehicle.status === "Available" ? "bg-emerald-600/20 text-emerald-400" : "bg-blue-600/20 text-blue-400"
                }`}
              >
                {vehicle.status}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
