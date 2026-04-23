import { Link, useNavigate } from "@tanstack/react-router";
import { Bell, LogOut, Menu } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../app/Providers/AuthContext";
import NotificationDropdown from "../features/NotificationDropdown/NotificationDropdown";
import { Button } from "../shared/ui/Button/Button";
import { useAuthStore } from "../store/auth.store";
import { useNotificationStore } from "../store/notification.store";

type Props = {
  onMenuClick?: () => void;
};

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
    <header className="w-full border-b border-slate-800 bg-slate-950 text-slate-100">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

        {/* Left */}
        <div className="flex items-center gap-4">
          {user?.email && (
            <button
              onClick={onMenuClick}
              className="rounded-lg p-2 md:hidden hover:bg-slate-800"
            >
              <Menu size={20} />
            </button>
          )}

          <Link to="/" className="flex items-center gap-3">
            <div className="rounded-2xl bg-indigo-500/10 px-3 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-indigo-300">
              HealthOS
            </div>

            <span className="hidden sm:block text-sm text-slate-400">
              Enterprise platform
            </span>
          </Link>
        </div>

        {/* Center Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm text-slate-300">
          <Link to="/" className="transition hover:text-white">
            Product
          </Link>
          <a href="#solutions" className="transition hover:text-white">
            Solutions
          </a>
          <a href="#pricing" className="transition hover:text-white">
            Pricing
          </a>
          <a href="#resources" className="transition hover:text-white">
            Resources
          </a>
        </nav>

        {/* Right */}
        <div className="flex items-center gap-4">
          {user?.email ? (
            <>
              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setOpen((p) => !p)}
                  className="relative rounded-lg p-2 hover:bg-slate-800 hover:text-white"
                >
                  <Bell size={18} />

                  {unreadNotis > 0 && (
                    <span className="absolute -top-1 -right-1 rounded-full bg-indigo-500 px-1.5 text-[10px] text-white">
                      {unreadNotis}
                    </span>
                  )}
                </button>

                {open && (
                  <div className="absolute right-0 mt-3 w-80 rounded-xl border border-slate-700 bg-white text-black shadow-xl z-50">
                    <NotificationDropdown />
                  </div>
                )}
              </div>

              <span className="hidden sm:block text-sm text-slate-300">
                {username ?? user?.email}
              </span>

              <div className="h-9 w-9 rounded-full bg-indigo-500/30" />

              <button
                onClick={handleLogout}
                className="rounded-lg p-2 hover:bg-slate-800 hover:text-white"
              >
                <LogOut size={18} />
              </button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button
                  variant="ghost"
                  className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
                >
                  Sign in
                </Button>
              </Link>

              <Link to="/signup">
                <Button className="bg-indigo-500 border-indigo-500 hover:bg-indigo-400">
                  Get Started
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
