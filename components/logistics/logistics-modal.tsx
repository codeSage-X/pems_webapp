"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Vehicle {
  vehicleName: string
  type: string
  licensePlate: string
  status: "Available" | "In Transit" | "Maintenance"
  fuelLevel: number
  mileage: number
  lastInspection: string
}

interface LogisticsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (data: Vehicle) => void
  initialData?: Vehicle & { id: number }
}

const vehicleTypes = ["Cargo Truck", "Service Vehicle", "Tanker", "Equipment Van", "Heavy Duty", "Pickup Truck"]

export default function LogisticsModal({ open, onOpenChange, onSave, initialData }: LogisticsModalProps) {
  const [formData, setFormData] = useState<Vehicle>({
    vehicleName: "",
    type: "",
    licensePlate: "",
    status: "Available",
    fuelLevel: 50,
    mileage: 0,
    lastInspection: new Date().toISOString().split("T")[0],
  })

  useEffect(() => {
    if (initialData) {
      setFormData(initialData)
    } else {
      setFormData({
        vehicleName: "",
        type: "",
        licensePlate: "",
        status: "Available",
        fuelLevel: 50,
        mileage: 0,
        lastInspection: new Date().toISOString().split("T")[0],
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
          <DialogTitle>{initialData ? "Edit Vehicle" : "Add Vehicle"}</DialogTitle>
          <DialogDescription>Enter vehicle information below</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-slate-300">Vehicle Name</label>
            <Input
              value={formData.vehicleName}
              onChange={(e) => setFormData({ ...formData, vehicleName: e.target.value })}
              className="mt-1 bg-slate-800/50 border-slate-700"
              placeholder="e.g., Truck-001"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-300">Type</label>
            <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
              <SelectTrigger className="mt-1 bg-slate-800/50 border-slate-700">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                {vehicleTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm font-medium text-slate-300">License Plate</label>
            <Input
              value={formData.licensePlate}
              onChange={(e) => setFormData({ ...formData, licensePlate: e.target.value })}
              className="mt-1 bg-slate-800/50 border-slate-700"
              placeholder="e.g., GPS-2024-001"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium text-slate-300">Fuel Level (%)</label>
              <Input
                type="number"
                min="0"
                max="100"
                value={formData.fuelLevel}
                onChange={(e) => setFormData({ ...formData, fuelLevel: Number(e.target.value) })}
                className="mt-1 bg-slate-800/50 border-slate-700"
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-300">Mileage (km)</label>
              <Input
                type="number"
                value={formData.mileage}
                onChange={(e) => setFormData({ ...formData, mileage: Number(e.target.value) })}
                className="mt-1 bg-slate-800/50 border-slate-700"
                required
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-slate-300">Last Inspection</label>
            <Input
              type="date"
              value={formData.lastInspection}
              onChange={(e) => setFormData({ ...formData, lastInspection: e.target.value })}
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
                <SelectItem value="Available">Available</SelectItem>
                <SelectItem value="In Transit">In Transit</SelectItem>
                <SelectItem value="Maintenance">Maintenance</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-3 justify-end">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="border-slate-700">
              Cancel
            </Button>
            <Button type="submit" className="bg-gradient-to-r from-purple-600 to-pink-600">
              {initialData ? "Update" : "Add"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
