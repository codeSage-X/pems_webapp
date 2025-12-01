"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Personnel {
  name: string
  email: string
  role: string
  phone: string
  status: "Active" | "On Leave" | "Inactive"
}

interface PersonnelModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (data: Personnel) => void
  initialData?: Personnel & { id: number }
}

export default function PersonnelModal({ open, onOpenChange, onSave, initialData }: PersonnelModalProps) {
  const [formData, setFormData] = useState<Personnel>({
    name: "",
    email: "",
    role: "",
    phone: "",
    status: "Active",
  })

  useEffect(() => {
    if (initialData) {
      setFormData(initialData)
    } else {
      setFormData({
        name: "",
        email: "",
        role: "",
        phone: "",
        status: "Active",
      })
    }
  }, [initialData, open])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-slate-900 border-slate-800">
        <DialogHeader>
          <DialogTitle>{initialData ? "Edit Personnel" : "Add Personnel"}</DialogTitle>
          <DialogDescription>Enter personnel information below</DialogDescription>
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
            <label className="text-sm font-medium text-slate-300">Email</label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="mt-1 bg-slate-800/50 border-slate-700"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-300">Role</label>
            <Input
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="mt-1 bg-slate-800/50 border-slate-700"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-300">Phone</label>
            <Input
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
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
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="On Leave">On Leave</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-3 justify-end">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="border-slate-700">
              Cancel
            </Button>
            <Button type="submit" className="bg-gradient-to-r from-blue-600 to-cyan-600">
              {initialData ? "Update" : "Add"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
