"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { Plus, Trash2, Edit2, Search } from "lucide-react"
import EquipmentModal from "./equipment-modal"

interface Equipment {
  id: number
  name: string
  type: string
  serialNumber: string
  status: "Operational" | "Maintenance" | "Inactive"
  location: string
  lastMaintenance: string
}

const initialEquipment: Equipment[] = [
  {
    id: 1,
    name: "Compressor Unit A",
    type: "Compressor",
    serialNumber: "CMP-001",
    status: "Operational",
    location: "Rig 1",
    lastMaintenance: "2024-11-15",
  },
  {
    id: 2,
    name: "Pressure Gauge Kit",
    type: "Gauge",
    serialNumber: "PG-002",
    status: "Maintenance",
    location: "Workshop",
    lastMaintenance: "2024-10-20",
  },
  {
    id: 3,
    name: "Pipeline Cleaner B",
    type: "Cleaner",
    serialNumber: "PC-003",
    status: "Operational",
    location: "Rig 2",
    lastMaintenance: "2024-11-10",
  },
  {
    id: 4,
    name: "Seal Replacement Kit",
    type: "Kit",
    serialNumber: "SR-004",
    status: "Operational",
    location: "Storage",
    lastMaintenance: "2024-11-01",
  },
  {
    id: 5,
    name: "Pump Assembly",
    type: "Pump",
    serialNumber: "PMP-005",
    status: "Operational",
    location: "Rig 3",
    lastMaintenance: "2024-11-18",
  },
]

export default function EquipmentManagement() {
  const [equipment, setEquipment] = useState<Equipment[]>(initialEquipment)
  const [searchTerm, setSearchTerm] = useState("")
  const [modalOpen, setModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editingEquipment, setEditingEquipment] = useState<Equipment | null>(null)
  const { toast } = useToast()

  const filteredEquipment = equipment.filter(
    (e) =>
      e.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.serialNumber.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAdd = () => {
    setEditingId(null)
    setEditingEquipment(null)
    setModalOpen(true)
  }

  const handleEdit = (item: Equipment) => {
    setEditingId(item.id)
    setEditingEquipment(item)
    setModalOpen(true)
  }

  const handleDelete = (id: number) => {
    setEquipment(equipment.filter((e) => e.id !== id))
    toast({
      title: "Deleted",
      description: "Equipment removed successfully",
    })
  }

  const handleSave = (data: Omit<Equipment, "id">) => {
    if (editingId) {
      setEquipment(equipment.map((e) => (e.id === editingId ? { ...e, ...data } : e)))
      toast({
        title: "Updated",
        description: "Equipment information updated successfully",
      })
    } else {
      const newEquipment: Equipment = {
        ...data,
        id: Math.max(...equipment.map((e) => e.id), 0) + 1,
      }
      setEquipment([...equipment, newEquipment])
      toast({
        title: "Added",
        description: "New equipment added successfully",
      })
    }
    setModalOpen(false)
  }

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Equipment Inventory</h1>
        <p className="text-slate-400">Manage equipment and track maintenance schedules</p>
      </div>

      <Card className="border-slate-800 bg-slate-900/50 backdrop-blur">
        <CardHeader>
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <Input
                placeholder="Search equipment..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-slate-800/50 border-slate-700"
              />
            </div>
            <Button
              onClick={handleAdd}
              className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
            >
              <Plus size={18} />
              Add Equipment
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-800">
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-300">Name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-300">Type</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-300">Serial Number</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-300">Location</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-300">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-300">Last Maintenance</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredEquipment.map((item) => (
                  <tr key={item.id} className="border-b border-slate-800 hover:bg-slate-800/30 transition">
                    <td className="px-6 py-4 text-white">{item.name}</td>
                    <td className="px-6 py-4 text-slate-400">{item.type}</td>
                    <td className="px-6 py-4 text-slate-400">{item.serialNumber}</td>
                    <td className="px-6 py-4 text-slate-400">{item.location}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`text-xs font-semibold px-2 py-1 rounded ${
                          item.status === "Operational"
                            ? "bg-emerald-600/20 text-emerald-400"
                            : item.status === "Maintenance"
                              ? "bg-orange-600/20 text-orange-400"
                              : "bg-slate-600/20 text-slate-400"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-400">{item.lastMaintenance}</td>
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

      <EquipmentModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        onSave={handleSave}
        initialData={editingEquipment || undefined}
      />
    </div>
  )
}
