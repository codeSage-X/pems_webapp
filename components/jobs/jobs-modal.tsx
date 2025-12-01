"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Job {
  jobTitle: string
  jobType: string
  employeeName: string
  equipmentNeeded: string
  logistics: string
  status: "Pending" | "In Progress" | "Completed"
  priority: "High" | "Medium" | "Low"
}

interface JobsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (data: Job) => void
  initialData?: Job & { id: number }
}

const jobTypes = ["Inspection", "Maintenance", "Repair", "Audit", "Installation", "Emergency"]
const employees = ["James Peterson", "Sarah Mitchell", "Mike Johnson", "Emma Davis", "David Chen"]
const logistics = ["Truck-001", "Truck-003", "Car-002", "Tanker-004"]

export default function JobsModal({ open, onOpenChange, onSave, initialData }: JobsModalProps) {
  const [formData, setFormData] = useState<Job>({
    jobTitle: "",
    jobType: "",
    employeeName: "",
    equipmentNeeded: "",
    logistics: "",
    status: "Pending",
    priority: "Medium",
  })

  useEffect(() => {
    if (initialData) {
      setFormData(initialData)
    } else {
      setFormData({
        jobTitle: "",
        jobType: "",
        employeeName: "",
        equipmentNeeded: "",
        logistics: "",
        status: "Pending",
        priority: "Medium",
      })
    }
  }, [initialData, open])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-slate-900 border-slate-800 max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{initialData ? "Edit Job" : "Create New Job"}</DialogTitle>
          <DialogDescription>Enter job details below</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-slate-300">Job Title</label>
            <Input
              value={formData.jobTitle}
              onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
              className="mt-1 bg-slate-800/50 border-slate-700"
              placeholder="e.g., Pipeline Inspection"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-300">Job Type</label>
            <Select value={formData.jobType} onValueChange={(value) => setFormData({ ...formData, jobType: value })}>
              <SelectTrigger className="mt-1 bg-slate-800/50 border-slate-700">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                {jobTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm font-medium text-slate-300">Employee</label>
            <Select
              value={formData.employeeName}
              onValueChange={(value) => setFormData({ ...formData, employeeName: value })}
            >
              <SelectTrigger className="mt-1 bg-slate-800/50 border-slate-700">
                <SelectValue placeholder="Select employee" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                {employees.map((emp) => (
                  <SelectItem key={emp} value={emp}>
                    {emp}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm font-medium text-slate-300">Equipment Needed</label>
            <Input
              value={formData.equipmentNeeded}
              onChange={(e) => setFormData({ ...formData, equipmentNeeded: e.target.value })}
              className="mt-1 bg-slate-800/50 border-slate-700"
              placeholder="e.g., Pressure Gauge, Cleaner"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-300">Logistics Vehicle</label>
            <Select
              value={formData.logistics}
              onValueChange={(value) => setFormData({ ...formData, logistics: value })}
            >
              <SelectTrigger className="mt-1 bg-slate-800/50 border-slate-700">
                <SelectValue placeholder="Select vehicle" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                {logistics.map((vehicle) => (
                  <SelectItem key={vehicle} value={vehicle}>
                    {vehicle}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium text-slate-300">Status</label>
              <Select
                value={formData.status}
                onValueChange={(value: any) => setFormData({ ...formData, status: value })}
              >
                <SelectTrigger className="mt-1 bg-slate-800/50 border-slate-700">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-300">Priority</label>
              <Select
                value={formData.priority}
                onValueChange={(value: any) => setFormData({ ...formData, priority: value })}
              >
                <SelectTrigger className="mt-1 bg-slate-800/50 border-slate-700">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex gap-3 justify-end">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="border-slate-700">
              Cancel
            </Button>
            <Button type="submit" className="bg-gradient-to-r from-orange-600 to-red-600">
              {initialData ? "Update" : "Create"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
