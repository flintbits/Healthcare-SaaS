import { Link } from "@tanstack/react-router";
import {
  Activity,
  ChevronRight,
  LayoutDashboard,
  UserPlus,
  Users,
  X,
} from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
};

const navLinks = [
  {
    label: "Dashboard",
    to: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Analytics",
    to: "/analytics",
    icon: Activity,
  },
  {
    label: "Add Patient",
    to: "/addPatient",
    icon: UserPlus,
  },
  {
    label: "Patients",
    to: "/patients",
    icon: Users,
  },
];

export default function Sidebar({ open, onClose }: Props) {
  return (
    <>
      {/* mobile overlay */}
      <div
        onClick={onClose}
        className={[
          "fixed inset-0 z-40 bg-black/55 backdrop-blur-sm transition-opacity duration-300 md:hidden",
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0",
        ].join(" ")}
      />

      {/* sidebar */}
      <aside
        className={[
          "fixed left-0 top-0 z-50 h-screen w-[280px] border-r border-white/8 text-white transition-transform duration-300 md:static md:z-auto md:w-72 md:translate-x-0",
          "bg-[#05070b]/95 backdrop-blur-3xl",
          open ? "translate-x-0" : "-translate-x-full",
        ].join(" ")}
      >
        {/* hero style background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.06),transparent_26%),radial-gradient(circle_at_75%_20%,rgba(99,102,241,0.12),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.03),transparent_22%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:42px_42px]" />
        </div>

        {/* glow */}
        <div className="pointer-events-none absolute -left-10 top-20 h-40 w-40 rounded-full bg-indigo-500/15 blur-3xl" />

        {/* header */}
        <div className="flex h-16 items-center justify-between border-b border-white/8 px-5">
          <div>
            <p className="text-[10px] uppercase tracking-[0.30em] text-white/35">
              Workspace
            </p>

            <h2 className="mt-1 text-base font-semibold tracking-[-0.02em] text-white">
              HealthOS
            </h2>
          </div>

          <button
            onClick={onClose}
            className="rounded-full border border-white/10 bg-white/[0.03] p-2 text-white/65 transition hover:bg-white/[0.08] hover:text-white md:hidden"
          >
            <X size={15} />
          </button>
        </div>

        {/* nav */}
        <nav className="space-y-2 p-4">
          {navLinks.map((link) => {
            const Icon = link.icon;

            return (
              <Link
                key={link.to}
                to={link.to}
                onClick={onClose}
                activeProps={{
                  className:
                    "border-white/15 bg-white text-black shadow-[0_10px_30px_rgba(255,255,255,0.08)]",
                }}
                className="group flex items-center justify-between rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-xs font-medium tracking-[-0.01em] text-white/65 transition-all duration-200 hover:border-white/15 hover:bg-white/[0.06] hover:text-white"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                    <Icon size={15} />
                  </div>

                  <span>{link.label}</span>
                </div>

                <ChevronRight
                  size={14}
                  className="translate-x-0 opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100"
                />
              </Link>
            );
          })}
        </nav>

      </aside>
    </>
  );
}
