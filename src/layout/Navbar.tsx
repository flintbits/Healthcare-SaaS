import { useNavigate } from "@tanstack/react-router";
import { LogOut, Menu } from "lucide-react";
import { useAuth } from "../app/Providers/AuthContext";
import { useAuthStore } from "../store/auth.store";


type Props = {
  onMenuClick: () => void
}

export default function Navbar({ onMenuClick }: Props) {

  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const username = useAuthStore((s) => s.user?.name);

  const handleLogout = async () => {
    await logout();

    navigate({
      to: "/login",
      replace: true,
    });
  };

  return (
    <header className="w-full h-14 flex items-center justify-between px-4 bg-(--color-bg-secondary) text-white">

      <div className="flex items-center gap-2">
        <button
          onClick={onMenuClick}
          className="md:hidden p-2 rounded hover:bg-gray-100"
        >
          <Menu size={20} />
        </button>

        <span className="font-semibold">
          Dashboard
        </span>
      </div>


      <div className="flex items-center gap-4">

        <span className="text-sm">
          {username ?? user?.email}
        </span>

        <div className="w-8 h-8 rounded-full bg-pink-700" />

        <button
          onClick={handleLogout}
          className="p-2 rounded hover:text-(--color-accent)"
        >
          <LogOut size={18} />
        </button>

      </div>

    </header>
  )
}
