"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { Plus, Trash2, Edit2, Search } from "lucide-react"
import JobsModal from "./jobs-modal"

interface Job {
  id: number
  jobTitle: string
  jobType: string
  employeeName: string
  equipmentNeeded: string
  logistics: string
  status: "Pending" | "In Progress" | "Completed"
  priority: "High" | "Medium" | "Low"
}

const initialJobs: Job[] = [
  {
    id: 1,
    jobTitle: "Pipeline Inspection",
    jobType: "Inspection",
    employeeName: "Chukwu Okonkwo",
    equipmentNeeded: "Pressure Gauge, Cleaner",
    logistics: "Truck-001",
    status: "In Progress",
    priority: "High",
  },
  {
    id: 2,
    jobTitle: "Equipment Maintenance",
    jobType: "Maintenance",
    employeeName: "Zainab Muhammadu",
    equipmentNeeded: "Seal Kit, Pump",
    logistics: "Car-002",
    status: "Pending",
    priority: "Medium",
  },
  {
    id: 3,
    jobTitle: "Safety Audit",
    jobType: "Audit",
    employeeName: "Amara Udeh",
    equipmentNeeded: "Safety Kit",
    logistics: "Car-002",
    status: "Completed",
    priority: "High",
  },
  {
    id: 4,
    jobTitle: "Compressor Repair",
    jobType: "Repair",
    employeeName: "Tunde Adeyemi",
    equipmentNeeded: "Compressor Unit",
    logistics: "Truck-003",
    status: "Pending",
    priority: "High",
  },
]

export default function JobsManagement() {
  const [jobs, setJobs] = useState<Job[]>(initialJobs)
  const [searchTerm, setSearchTerm] = useState("")
  const [modalOpen, setModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editingJob, setEditingJob] = useState<Job | null>(null)
  const { toast } = useToast()

  const filteredJobs = jobs.filter(
    (j) =>
      j.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      j.jobType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      j.employeeName.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAdd = () => {
    setEditingId(null)
    setEditingJob(null)
    setModalOpen(true)
  }

  const handleEdit = (item: Job) => {
    setEditingId(item.id)
    setEditingJob(item)
    setModalOpen(true)
  }

  const handleDelete = (id: number) => {
    setJobs(jobs.filter((j) => j.id !== id))
    toast({
      title: "Deleted",
      description: "Job removed successfully",
    })
  }

  const handleSave = (data: Omit<Job, "id">) => {
    if (editingId) {
      setJobs(jobs.map((j) => (j.id === editingId ? { ...j, ...data } : j)))
      toast({
        title: "Updated",
        description: "Job information updated successfully",
      })
    } else {
      const newJob: Job = {
        ...data,
        id: Math.max(...jobs.map((j) => j.id), 0) + 1,
      }
      setJobs([...jobs, newJob])
      toast({
        title: "Created",
        description: "New job created successfully",
      })
    }
    setModalOpen(false)
  }

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Jobs Management</h1>
        <p className="text-slate-400">Create and manage maintenance jobs</p>
      </div>

      <Card className="border-slate-800 bg-slate-900/50 backdrop-blur">
        <CardHeader>
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <Input
                placeholder="Search jobs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-slate-800/50 border-slate-700"
              />
            </div>
            <Button
              onClick={handleAdd}
              className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
            >
              <Plus size={18} />
              Create Job
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-800">
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-300">Title</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-300">Type</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-300">Employee</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-300">Equipment</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-300">Logistics</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-300">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-300">Priority</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredJobs.map((item) => (
                  <tr key={item.id} className="border-b border-slate-800 hover:bg-slate-800/30 transition">
                    <td className="px-6 py-4 text-white">{item.jobTitle}</td>
                    <td className="px-6 py-4 text-slate-400">{item.jobType}</td>
                    <td className="px-6 py-4 text-slate-400">{item.employeeName}</td>
                    <td className="px-6 py-4 text-slate-400 text-sm">{item.equipmentNeeded}</td>
                    <td className="px-6 py-4 text-slate-400">{item.logistics}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`text-xs font-semibold px-2 py-1 rounded ${
                          item.status === "Completed"
                            ? "bg-emerald-600/20 text-emerald-400"
                            : item.status === "In Progress"
                              ? "bg-blue-600/20 text-blue-400"
                              : "bg-slate-600/20 text-slate-400"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`text-xs font-semibold px-2 py-1 rounded ${
                          item.priority === "High"
                            ? "bg-red-600/20 text-red-400"
                            : item.priority === "Medium"
                              ? "bg-yellow-600/20 text-yellow-400"
                              : "bg-slate-600/20 text-slate-400"
                        }`}
                      >
                        {item.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleEdit(item)}
                          className="text-blue-400 hover:text-blue-300 hover:bg-blue-600/10"
                        >
                          <Edit2 size={16} />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDelete(item.id)}
                          className="text-red-400 hover:text-red-300 hover:bg-red-600/10"
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <JobsModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        onSave={handleSave}
        initialData={editingJob || undefined}
      />
    </div>
  )
}
