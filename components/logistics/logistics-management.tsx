"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { Plus, Trash2, Edit2, Search, Fuel } from "lucide-react"
import LogisticsModal from "./logistics-modal"

interface Vehicle {
  id: number
  vehicleName: string
  type: string
  licensePlate: string
  status: "Available" | "In Transit" | "Maintenance"
  fuelLevel: number
  mileage: number
  lastInspection: string
}

const initialVehicles: Vehicle[] = [
  {
    id: 1,
    vehicleName: "Truck-001",
    type: "Cargo Truck",
    licensePlate: "GPS-2024-001",
    status: "In Transit",
    fuelLevel: 45,
    mileage: 12500,
    lastInspection: "2024-11-15",
  },
  {
    id: 2,
    vehicleName: "Car-002",
    type: "Service Vehicle",
    licensePlate: "GPS-2024-002",
    status: "Available",
    fuelLevel: 78,
    mileage: 8300,
    lastInspection: "2024-11-18",
  },
  {
    id: 3,
    vehicleName: "Truck-003",
    type: "Tanker",
    licensePlate: "GPS-2024-003",
    status: "In Transit",
    fuelLevel: 62,
    mileage: 15200,
    lastInspection: "2024-11-10",
  },
  {
    id: 4,
    vehicleName: "Van-004",
    type: "Equipment Van",
    licensePlate: "GPS-2024-004",
    status: "Available",
    fuelLevel: 85,
    mileage: 6800,
    lastInspection: "2024-11-20",
  },
  {
    id: 5,
    vehicleName: "Truck-005",
    type: "Heavy Duty",
    licensePlate: "GPS-2024-005",
    status: "Maintenance",
    fuelLevel: 0,
    mileage: 22100,
    lastInspection: "2024-10-30",
  },
]

export default function LogisticsManagement() {
  const [vehicles, setVehicles] = useState<Vehicle[]>(initialVehicles)
  const [searchTerm, setSearchTerm] = useState("")
  const [modalOpen, setModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null)
  const { toast } = useToast()

  const filteredVehicles = vehicles.filter(
    (v) =>
      v.vehicleName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.licensePlate.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAdd = () => {
    setEditingId(null)
    setEditingVehicle(null)
    setModalOpen(true)
  }

  const handleEdit = (item: Vehicle) => {
    setEditingId(item.id)
    setEditingVehicle(item)
    setModalOpen(true)
  }

  const handleDelete = (id: number) => {
    setVehicles(vehicles.filter((v) => v.id !== id))
    toast({
      title: "Deleted",
      description: "Vehicle removed from fleet",
    })
  }

  const handleSave = (data: Omit<Vehicle, "id">) => {
    if (editingId) {
      setVehicles(vehicles.map((v) => (v.id === editingId ? { ...v, ...data } : v)))
      toast({
        title: "Updated",
        description: "Vehicle information updated successfully",
      })
    } else {
      const newVehicle: Vehicle = {
        ...data,
        id: Math.max(...vehicles.map((v) => v.id), 0) + 1,
      }
      setVehicles([...vehicles, newVehicle])
      toast({
        title: "Added",
        description: "New vehicle added to fleet",
      })
    }
    setModalOpen(false)
  }

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Logistics & Fleet Management</h1>
        <p className="text-slate-400">Manage company vehicles and track fleet status</p>
      </div>

      <Card className="border-slate-800 bg-slate-900/50 backdrop-blur">
        <CardHeader>
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <Input
                placeholder="Search vehicles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-slate-800/50 border-slate-700"
              />
            </div>
            <Button
              onClick={handleAdd}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              <Plus size={18} />
              Add Vehicle
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-800">
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-300">Vehicle</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-300">Type</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-300">License Plate</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-300">Fuel Level</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-300">Mileage</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-300">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-300">Last Inspection</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredVehicles.map((item) => (
                  <tr key={item.id} className="border-b border-slate-800 hover:bg-slate-800/30 transition">
                    <td className="px-6 py-4 text-white font-medium">{item.vehicleName}</td>
                    <td className="px-6 py-4 text-slate-400">{item.type}</td>
                    <td className="px-6 py-4 text-slate-400">{item.licensePlate}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Fuel size={16} className="text-orange-400" />
                        <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden w-16">
                          <div
                            className="h-full bg-gradient-to-r from-orange-500 to-red-500"
                            style={{ width: `${item.fuelLevel}%` }}
                          />
                        </div>
                        <span className="text-xs text-slate-400">{item.fuelLevel}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-400">{item.mileage.toLocaleString()} km</td>
                    <td className="px-6 py-4">
                      <span
                        className={`text-xs font-semibold px-2 py-1 rounded ${
                          item.status === "Available"
                            ? "bg-emerald-600/20 text-emerald-400"
                            : item.status === "In Transit"
                              ? "bg-blue-600/20 text-blue-400"
                              : "bg-orange-600/20 text-orange-400"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-400">{item.lastInspection}</td>
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

      <LogisticsModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        onSave={handleSave}
        initialData={editingVehicle || undefined}
      />
    </div>
  )
}
