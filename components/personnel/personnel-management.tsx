"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { Plus, Trash2, Edit2, Search } from "lucide-react"
import PersonnelModal from "./personnel-modal"

interface Personnel {
  id: number
  name: string
  email: string
  role: string
  phone: string
  status: "Active" | "On Leave" | "Inactive"
}

const initialPersonnel: Personnel[] = [
  {
    id: 1,
    name: "Chukwu Okonkwo",
    email: "chukwu.okonkwo@geoplex.com",
    role: "Field Technician",
    phone: "+234-803-456-7890",
    status: "Active",
  },
  {
    id: 2,
    name: "Amara Udeh",
    email: "amara.udeh@geoplex.com",
    role: "Safety Officer",
    phone: "+234-805-123-4567",
    status: "Active",
  },
  {
    id: 3,
    name: "Tunde Adeyemi",
    email: "tunde.adeyemi@geoplex.com",
    role: "Equipment Operator",
    phone: "+234-701-234-5678",
    status: "On Leave",
  },
  {
    id: 4,
    name: "Zainab Muhammadu",
    email: "zainab.muhammadu@geoplex.com",
    role: "Maintenance Lead",
    phone: "+234-902-345-6789",
    status: "Active",
  },
  {
    id: 5,
    name: "Nonso Eze",
    email: "nonso.eze@geoplex.com",
    role: "Field Technician",
    phone: "+234-810-567-8901",
    status: "Active",
  },
]

export default function PersonnelManagement() {
  const [personnel, setPersonnel] = useState<Personnel[]>(initialPersonnel)
  const [searchTerm, setSearchTerm] = useState("")
  const [modalOpen, setModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editingPersonnel, setEditingPersonnel] = useState<Personnel | null>(null)
  const { toast } = useToast()

  const filteredPersonnel = personnel.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.role.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAdd = () => {
    setEditingId(null)
    setEditingPersonnel(null)
    setModalOpen(true)
  }

  const handleEdit = (item: Personnel) => {
    setEditingId(item.id)
    setEditingPersonnel(item)
    setModalOpen(true)
  }

  const handleDelete = (id: number) => {
    setPersonnel(personnel.filter((p) => p.id !== id))
    toast({
      title: "Deleted",
      description: "Personnel member removed successfully",
    })
  }

  const handleSave = (data: Omit<Personnel, "id">) => {
    if (editingId) {
      setPersonnel(personnel.map((p) => (p.id === editingId ? { ...p, ...data } : p)))
      toast({
        title: "Updated",
        description: "Personnel information updated successfully",
      })
    } else {
      const newPersonnel: Personnel = {
        ...data,
        id: Math.max(...personnel.map((p) => p.id), 0) + 1,
      }
      setPersonnel([...personnel, newPersonnel])
      toast({
        title: "Added",
        description: "New personnel member added successfully",
      })
    }
    setModalOpen(false)
  }

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Personnel Management</h1>
        <p className="text-slate-400">Manage your team members and their information</p>
      </div>

      <Card className="border-slate-800 bg-slate-900/50 backdrop-blur">
        <CardHeader>
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <Input
                placeholder="Search by name, email, or role..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-slate-800/50 border-slate-700"
              />
            </div>
            <Button
              onClick={handleAdd}
              className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
            >
              <Plus size={18} />
              Add Personnel
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-800">
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-300">Name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-300">Email</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-300">Role</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-300">Phone</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-300">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPersonnel.map((item) => (
                  <tr key={item.id} className="border-b border-slate-800 hover:bg-slate-800/30 transition">
                    <td className="px-6 py-4 text-white">{item.name}</td>
                    <td className="px-6 py-4 text-slate-400">{item.email}</td>
                    <td className="px-6 py-4 text-slate-400">{item.role}</td>
                    <td className="px-6 py-4 text-slate-400">{item.phone}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`text-xs font-semibold px-2 py-1 rounded ${
                          item.status === "Active"
                            ? "bg-emerald-600/20 text-emerald-400"
                            : item.status === "On Leave"
                              ? "bg-yellow-600/20 text-yellow-400"
                              : "bg-slate-600/20 text-slate-400"
                        }`}
                      >
                        {item.status}
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

      <PersonnelModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        onSave={handleSave}
        initialData={editingPersonnel || undefined}
      />
    </div>
  )
}
