"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Equipment {
  name: string
  type: string
  serialNumber: string
  status: "Operational" | "Maintenance" | "Inactive"
  location: string
  lastMaintenance: string
}

interface EquipmentModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (data: Equipment) => void
  initialData?: Equipment & { id: number }
}

export default function EquipmentModal({ open, onOpenChange, onSave, initialData }: EquipmentModalProps) {
  const [formData, setFormData] = useState<Equipment>({
    name: "",
    type: "",
    serialNumber: "",
    status: "Operational",
    location: "",
    lastMaintenance: new Date().toISOString().split("T")[0],
  })

  useEffect(() => {
    if (initialData) {
      setFormData(initialData)
    } else {
      setFormData({
        name: "",
        type: "",
        serialNumber: "",
        status: "Operational",
        location: "",
        lastMaintenance: new Date().toISOString().split("T")[0],
      })
    }
  }, [initialData, open])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-slate-900 border-slate-800 max-w-md">
        <DialogHeader>
          <DialogTitle>{initialData ? "Edit Equipment" : "Add Equipment"}</DialogTitle>
          <DialogDescription>Enter equipment information below</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-slate-300">Name</label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="mt-1 bg-slate-800/50 border-slate-700"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-300">Type</label>
            <Input
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="mt-1 bg-slate-800/50 border-slate-700"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-300">Serial Number</label>
            <Input
              value={formData.serialNumber}
              onChange={(e) => setFormData({ ...formData, serialNumber: e.target.value })}
              className="mt-1 bg-slate-800/50 border-slate-700"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-300">Location</label>
            <Input
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="mt-1 bg-slate-800/50 border-slate-700"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-300">Last Maintenance</label>
            <Input
              type="date"
              value={formData.lastMaintenance}
              onChange={(e) => setFormData({ ...formData, lastMaintenance: e.target.value })}
              className="mt-1 bg-slate-800/50 border-slate-700"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-300">Status</label>
            <Select value={formData.status} onValueChange={(value: any) => setFormData({ ...formData, status: value })}>
              <SelectTrigger className="mt-1 bg-slate-800/50 border-slate-700">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                <SelectItem value="Operational">Operational</SelectItem>
                <SelectItem value="Maintenance">Maintenance</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-3 justify-end">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="border-slate-700">
              Cancel
            </Button>
            <Button type="submit" className="bg-gradient-to-r from-emerald-600 to-teal-600">
              {initialData ? "Update" : "Add"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
