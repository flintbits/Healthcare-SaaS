import { Link, useNavigate } from "@tanstack/react-router";
import { Bell, LogOut, Menu } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../app/Providers/AuthContext";
import NotificationDropdown from "../features/NotificationDropdown/NotificationDropdown";
import { Button } from "../shared/ui/Button/Button";
import { useAuthStore } from "../store/auth.store";
import { useNotificationStore } from "../store/notification.store";


type Props = {
  onMenuClick?: () => void
}

export default function Navbar({ onMenuClick }: Props) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const username = useAuthStore((s) => s.user?.name);
  const notifications = useNotificationStore((s) => s.notifications);

  const unreadNotis = notifications.filter((n) => !n.read).length;

  const handleLogout = async () => {
    await logout();

    navigate({
      to: "/",
      replace: true,
    });
  };

  return (
    <header className="w-full h-14 flex items-center justify-between px-4 bg-(--color-bg-ternary) text-white ">

      <div className="flex items-center gap-2">
        <button
          onClick={onMenuClick}
          className="md:hidden p-2 rounded hover:bg-gray-100"
        >
          <Menu size={20} />
        </button>
        <span className="font-semibold">
          Healthcare SaaS
        </span>
      </div>


      <div className="flex items-center gap-4">
        {user?.email ?
          <>
            {/* Notification */}
            <div className="relative">
              <button
                onClick={() => setOpen((p) => !p)}
                className="relative flex gap-2 p-2 rounded hover:text-(--color-accent)"
              >
                <Bell />
                {unreadNotis > 0 && (
                  <span className="absolute -top-1 -right-1 text-xs px-1 rounded">
                    {unreadNotis}
                  </span>
                )}
              </button>
              {/* Notification Dropdown */}
              {open && (
                <div className="absolute right-0 mt-2 border border-(--color-bg-secondary) bg-white text-black rounded z-50">
                  <NotificationDropdown />
                </div>
              )}
            </div>

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

          </>
          : <>
            <Link to="/login">
              <Button className="px-3 py-1 text-sm">Login</Button>
            </Link>

            <Link to="/signup">
              <Button className="px-3 py-1 text-sm">Signup</Button>
            </Link>
          </>
        }
      </div>
    </header>
  )
}
