// components/layout/DashboardLayout.tsx

import { Outlet } from "@tanstack/react-router"
import { useState } from "react"
import Navbar from "./Navbar"
import Sidebar from "./Sidebar"

export default function DashboardLayout() {
  const [open, setOpen] = useState(false)

  return (
    <div className="h-screen flex flex-col">

      <Navbar onMenuClick={() => setOpen(true)} />

      <div className="flex flex-1 overflow-hidden">

        <Sidebar
          open={open}
          onClose={() => setOpen(false)}
        />

        <main className="flex-1 overflow-auto p-4 bg-gray-50">
          <Outlet />
        </main>

      </div>
    </div>
  )
}
