// components/layout/Sidebar.tsx

import { Link } from "@tanstack/react-router";

type Props = {
  open: boolean
  onClose: () => void
}

const navLinks = [
  {
    label: "Analytics",
    to: "/analytics",
  },
  {
    label: "Add Patient",
    to: "/addPatient",
  },
  {
    label: "Patients",
    to: "/patients",
  },

];

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
          fixed md:static top-0 left-0 h-full w-48 bg-(--color-bg-ternary)
          transform transition-transform
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        <nav className="flex flex-col p-2 gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="px-3 py-2 rounded hover:bg-(--color-accent) text-white"
            >
              {link.label}
            </Link>
          ))}

        </nav>
      </aside>
    </>
  )
}
