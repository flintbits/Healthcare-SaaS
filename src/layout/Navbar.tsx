import { Link, useNavigate } from "@tanstack/react-router";
import {
  Bell,
  ChevronDown,
  LogOut,
  Menu,
} from "lucide-react";
import { useState } from "react";
import { useAuth } from "../app/Providers/AuthContext";
import NotificationDropdown from "../features/NotificationDropdown/NotificationDropdown";
import { Button } from "../shared/ui/Button/Button";
import { useAuthStore } from "../store/auth.store";
import { useNotificationStore } from "../store/notification.store";

type Props = {
  onMenuClick?: () => void;
};

export default function Navbar({
  onMenuClick,
}: Props) {
  const [open, setOpen] =
    useState(false);

  const navigate =
    useNavigate();

  const { user, logout } =
    useAuth();

  const username =
    useAuthStore(
      (s) => s.user?.name
    );

  const notifications =
    useNotificationStore(
      (s) => s.notifications
    );

  const unreadNotis =
    notifications.filter(
      (n) => !n.read
    ).length;

  const handleLogout =
    async () => {
      await logout();

      navigate({
        to: "/",
        replace: true,
      });
    };

  const displayName =
    username ??
    user?.email ??
    "User";

  return (
    <header className="sticky top-0 z-50 h-16 border-b border-white/8 bg-[#05070b]/92 text-white backdrop-blur-3xl">
      {/* background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.05),transparent_28%),radial-gradient(circle_at_80%_20%,rgba(99,102,241,0.10),transparent_22%)]" />

        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:42px_42px]" />
      </div>

      {/* FULL WIDTH LAYOUT */}
      <div className="grid h-full grid-cols-[auto_1fr_auto] items-center gap-6 px-5 lg:px-7">
        {/* LEFT */}
        <div className="flex items-center gap-3">
          {user?.email && (
            <button
              onClick={
                onMenuClick
              }
              className="rounded-full border border-white/10 bg-white/[0.03] p-2 text-white/70 transition hover:bg-white/[0.08] hover:text-white md:hidden"
            >
              <Menu size={16} />
            </button>
          )}

          <Link
            to="/"
            className="flex items-center gap-3"
          >
            <div className="flex h-9 items-center rounded-full border border-white/10 bg-white/[0.03] px-4 text-[10px] font-semibold uppercase tracking-[0.30em] text-white/80">
              HealthOS
            </div>

            <span className="hidden whitespace-nowrap text-xs text-white/40 xl:block">
              Enterprise Platform
            </span>
          </Link>
        </div>

        {/* CENTER */}
        <nav className="hidden items-center justify-center gap-7 md:flex">
          {[
            {
              label: "Product",
              to: "/",
            },
            {
              label:
                "Solutions",
              to: "/#solutions",
            },
            {
              label:
                "Pricing",
              to: "/#pricing",
            },
            {
              label:
                "Resources",
              to: "/#resources",
            },
            {
              label:
                "Dashboard",
              to: "/dashboard",
            },
          ].map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className="text-xs font-medium text-white/55 transition hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* RIGHT */}
        <div className="flex items-center justify-end gap-2">
          {user?.email ? (
            <>
              {/* notifications */}
              <div className="relative">
                <button
                  onClick={() =>
                    setOpen(
                      (p) => !p
                    )
                  }
                  className="relative rounded-full border border-white/10 bg-white/[0.03] p-2 text-white/70 transition hover:bg-white/[0.08] hover:text-white"
                >
                  <Bell size={15} />

                  {unreadNotis >
                    0 && (
                      <span className="absolute -right-1 -top-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-white px-1 text-[9px] font-semibold text-black">
                        {
                          unreadNotis
                        }
                      </span>
                    )}
                </button>

                {open && (
                  <div className="absolute right-0 mt-3 z-50 w-80 overflow-hidden rounded-3xl border border-white/10 bg-[#0b0d12]/95 text-white shadow-2xl backdrop-blur-3xl">
                    <NotificationDropdown />
                  </div>
                )}
              </div>

              {/* profile */}
              <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-2 py-1.5 lg:flex">
                <div className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-[11px] font-medium">
                  {displayName
                    .charAt(
                      0
                    )
                    .toUpperCase()}
                </div>

                <span className="max-w-[150px] truncate text-xs text-white/65">
                  {displayName}
                </span>

                <ChevronDown
                  size={13}
                  className="text-white/35"
                />
              </div>

              {/* logout */}
              <button
                onClick={
                  handleLogout
                }
                className="rounded-full border border-white/10 bg-white/[0.03] p-2 text-white/65 transition hover:bg-white/[0.08] hover:text-white"
              >
                <LogOut size={15} />
              </button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button
                  variant="ghost"
                  className="text-xs"
                >
                  Sign in
                </Button>
              </Link>

              <Link to="/signup">
                <Button
                  variant="accent"
                  className="text-xs"
                >
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
