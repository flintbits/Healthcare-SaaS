// components/layout/Sidebar.tsx

import { Link } from "@tanstack/react-router"

type Props = {
  open: boolean
  onClose: () => void
}

export default function Sidebar({ open, onClose }: Props) {
  return (
    <>
      {open && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/30 md:hidden"
        />
      )}

      <aside
        className={`
          fixed md:static top-0 left-0 h-full w-48 bg-(--color-bg-secondary) border-r
          transform transition-transform
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        <nav className="flex flex-col p-2 gap-1">

          <Link
            to="/dashboard"
            className="px-3 py-2 rounded hover:bg-(--color-accent) text-white"
          >
            Dashboard
          </Link>

          <Link
            to="/addPatient"
            className="px-3 py-2 rounded hover:bg-(--color-accent) text-white"
          >
            Add Patient
          </Link>


          <Link
            to="/login"
            className="px-3 py-2 rounded hover:bg-(--color-accent) text-white"
          >
            Patients
          </Link>

          <Link
            to="/login"
            className="px-3 py-2 rounded hover:bg-(--color-accent) text-white"
          >
            Settings
          </Link>

        </nav>
      </aside>
    </>
  )
}
