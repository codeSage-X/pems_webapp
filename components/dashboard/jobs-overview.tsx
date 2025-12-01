"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Briefcase } from "lucide-react"

const recentJobs = [
  { id: 1, title: "Wellhead Inspection", type: "Inspection", priority: "High" },
  { id: 2, title: "Pump Equipment Service", type: "Maintenance", priority: "Medium" },
  { id: 3, title: "Safety Compliance Audit", type: "Audit", priority: "High" },
]

export default function JobsOverview() {
  return (
    <Card className="border-slate-800 bg-slate-900/50 backdrop-blur">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Briefcase size={20} />
              Recent Jobs
            </CardTitle>
            <CardDescription>Latest job requests</CardDescription>
          </div>
          <Link href="/dashboard/jobs">
            <Button size="sm" variant="outline" className="border-slate-700 bg-transparent">
              View All
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {recentJobs.map((job) => (
            <div key={job.id} className="flex items-center justify-between p-3 rounded-lg bg-slate-800/50">
              <div>
                <p className="font-medium text-white">{job.title}</p>
                <p className="text-xs text-slate-400">{job.type}</p>
              </div>
              <span
                className={`text-xs font-semibold px-2 py-1 rounded ${
                  job.priority === "High" ? "bg-red-600/20 text-red-400" : "bg-yellow-600/20 text-yellow-400"
                }`}
              >
                {job.priority}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
