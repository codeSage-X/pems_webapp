"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Users } from "lucide-react"

const recentPersonnel = [
  { id: 1, name: "Chukwu Okonkwo", role: "Field Technician", status: "Active" },
  { id: 2, name: "Amara Udeh", role: "Safety Officer", status: "Active" },
  { id: 3, name: "Tunde Adeyemi", role: "Equipment Operator", status: "On Leave" },
  { id: 4, name: "Zainab Muhammadu", role: "Maintenance Lead", status: "Active" },
]

export default function PersonnelOverview() {
  return (
    <Card className="border-slate-800 bg-slate-900/50 backdrop-blur">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Users size={20} />
              Personnel
            </CardTitle>
            <CardDescription>Recent staff members</CardDescription>
          </div>
          <Link href="/dashboard/personnel">
            <Button size="sm" variant="outline" className="border-slate-700 bg-transparent">
              View All
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {recentPersonnel.map((person) => (
            <div key={person.id} className="flex items-center justify-between p-3 rounded-lg bg-slate-800/50">
              <div>
                <p className="font-medium text-white">{person.name}</p>
                <p className="text-xs text-slate-400">{person.role}</p>
              </div>
              <span
                className={`text-xs font-semibold px-2 py-1 rounded ${
                  person.status === "Active" ? "bg-emerald-600/20 text-emerald-400" : "bg-yellow-600/20 text-yellow-400"
                }`}
              >
                {person.status}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
