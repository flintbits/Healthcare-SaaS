// components/layout/Navbar.tsx

import { Menu } from "lucide-react"
import { TextField } from "../shared/ui/Inputs/TextField/TextField"

type Props = {
  onMenuClick: () => void
}

export default function Navbar({ onMenuClick }: Props) {
  return (
    <header className="w-full h-14 flex items-center justify-between px-4 bg-(--color-bg-secondary)">
      <div className="flex items-center gap-2">
        <button
          onClick={onMenuClick}
          className="md:hidden p-2 rounded hover:bg-gray-100"
        >
          <Menu size={20} />
        </button>

        <span className="font-semibold">Dashboard</span>
      </div>

      <div className="flex items-center gap-4">
        <div className="w-48 md:w-64">
          <TextField placeholder="search" />
        </div>
        <div className="w-8 h-8 rounded-full bg-pink-700" />
      </div>

    </header>
  )
}
