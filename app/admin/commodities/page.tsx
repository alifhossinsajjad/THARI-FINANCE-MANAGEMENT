'use client'

import { useState } from "react"
import { Search, Plus, SquarePen, Trash2 } from "lucide-react"

export default function Commodities() {
  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editingIndex, setEditingIndex] = useState<number | null>(null)

  // Form states for Add
  const [addName, setAddName] = useState("")
  const [addPrice, setAddPrice] = useState("0")
  const [addPremium, setAddPremium] = useState(false)

  // Form states for Edit
  const [editName, setEditName] = useState("")
  const [editPrice, setEditPrice] = useState("")
  const [editPremium, setEditPremium] = useState(false)

  // Sample data (in real app, use useState for mutable list)
  const [commodities, setCommodities] = useState([
    { name: "Gold", price: "$2050.50", premium: "No" },
    { name: "Silver", price: "$2050.50", premium: "No" },
    { name: "Gold", price: "$2050.50", premium: "Yes" },
    { name: "Gold", price: "$2050.50", premium: "No" },
    { name: "Gold", price: "$2050.50", premium: "Yes" },
    { name: "Silver", price: "$2050.50", premium: "No" },
    { name: "Gold", price: "$2050.50", premium: "Yes" },
  ])

  // Open Edit Modal
  const openEditModal = (index: number) => {
    const item = commodities[index]
    setEditingIndex(index)
    setEditName(item.name)
    setEditPrice(item.price.replace("$", "").replace(",", ""))
    setEditPremium(item.premium === "Yes")
    setIsEditModalOpen(true)
  }

  // Handle Add
  const handleAdd = () => {
    const newCommodity = {
      name: addName,
      price: `$${Number(addPrice).toFixed(2)}`,
      premium: addPremium ? "Yes" : "No",
    }
    setCommodities([...commodities, newCommodity])
    setIsAddModalOpen(false)
    setAddName("")
    setAddPrice("0")
    setAddPremium(false)
  }

  // Handle Edit Save
  const handleEditSave = () => {
    if (editingIndex === null) return

    const updatedCommodities = [...commodities]
    updatedCommodities[editingIndex] = {
      name: editName,
      price: `$${Number(editPrice).toFixed(2)}`,
      premium: editPremium ? "Yes" : "No",
    }
    setCommodities(updatedCommodities)
    setIsEditModalOpen(false)
    setEditingIndex(null)
  }

  // Handle Delete
  const handleDelete = (index: number) => {
    setCommodities(commodities.filter((_, i) => i !== index))
  }

  return (
    <>
      <div className="mx-auto space-y-6 max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <section>
          <h1 className="text-3xl font-bold text-gray-900 mb-1">Commodities</h1>
          <p className="text-gray-400 text-sm">Track commodity prices and market trends.</p>
        </section>

        {/* Actions Row */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full max-w-2xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search commodities..."
              className="w-full bg-white border border-gray-200 rounded-xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all"
            />
          </div>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="w-full sm:w-auto bg-primary text-white rounded-xl py-3 px-6 font-semibold flex items-center justify-center gap-2 transition-all shadow-sm text-sm hover:bg-primary/90 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Add Commodity
          </button>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-50">
                  <th className="px-6 py-4 text-sm font-bold text-gray-600">Name</th>
                  <th className="px-6 py-4 text-sm font-bold text-gray-600 text-center">Price (USD)</th>
                  <th className="px-6 py-4 text-sm font-bold text-gray-600 text-center">Premium Access</th>
                  <th className="px-6 py-4 text-sm font-bold text-gray-600 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {commodities.map((item, i) => (
                  <tr key={i} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-800">{item.name}</div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="text-sm font-medium text-gray-800">{item.price}</div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span
                        className={`text-sm font-medium ${item.premium === "Yes" ? "text-purple-500" : "text-gray-500"}`}
                      >
                        {item.premium}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <button
                          onClick={() => openEditModal(i)}
                          className=" rounded transition-colors group cursor-pointer"
                        >
                          <SquarePen className="w-4 h-4 text-blue-500" />
                        </button>
                        <button
                          onClick={() => handleDelete(i)}
                          className="  rounded transition-colors group cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ==================== ADD MODAL ==================== */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-4">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">Add Commodity</h2>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl cursor-pointer"
              >
                ×
              </button>
            </div>

            <div className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  value={addName}
                  onChange={(e) => setAddName(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Price (USD)</label>
                <input
                  type="text"
                  value={addPrice}
                  onChange={(e) => setAddPrice(e.target.value.replace(/[^0-9.]/g, ""))}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={addPremium}
                  onChange={(e) => setAddPremium(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <label className="text-sm text-gray-700">Premium Access Only</label>
              </div>
            </div>

            <div className="flex justify-end gap-3 px-6 pb-6">
              <button
                onClick={handleAdd}
                className="bg-primary text-white font-medium rounded-lg px-6 py-3 hover:bg-primary/90 transition-colors cursor-pointer"
              >
                Add
              </button>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="bg-gray-200 text-gray-800 font-medium rounded-lg px-6 py-3 hover:bg-gray-300 transition-colors cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================== EDIT MODAL (Same Design) ==================== */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-4">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">Edit Commodity</h2>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl cursor-pointer"
              >
                ×
              </button>
            </div>

            <div className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Price (USD)</label>
                <input
                  type="text"
                  value={editPrice}
                  onChange={(e) => setEditPrice(e.target.value.replace(/[^0-9.]/g, ""))}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={editPremium}
                  onChange={(e) => setEditPremium(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <label className="text-sm text-gray-700">Premium Access Only</label>
              </div>
            </div>

            <div className="flex justify-end gap-3 px-6 pb-6">
              <button
                onClick={handleEditSave}
                className="bg-primary text-white font-medium rounded-lg px-6 py-3 hover:bg-primary/90 transition-colors cursor-pointer"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="bg-gray-200 text-gray-800 font-medium rounded-lg px-6 py-3 hover:bg-gray-300 transition-colors cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}