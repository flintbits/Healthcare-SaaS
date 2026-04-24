import { Outlet } from "@tanstack/react-router";
import { useState } from "react";
import PageTransition from "../components/PageTransition";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function DashboardLayout() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative flex h-screen overflow-hidden bg-[#05070b] text-white">
      {/* global background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.06),transparent_26%),radial-gradient(circle_at_78%_18%,rgba(99,102,241,0.12),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.03),transparent_22%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:42px_42px]" />
      </div>

      <div className="flex min-h-0 flex-1 flex-col">
        {/* navbar */}
        <Navbar onMenuClick={() => setOpen(true)} />

        {/* body */}
        <div className="flex min-h-0 flex-1">
          {/* sidebar now overlaps into navbar zone */}
          <div className="relative z-40 -mt-16">
            <Sidebar
              open={open}
              onClose={() => setOpen(false)}
            />
          </div>

          {/* content */}
          <main className="relative flex-1 overflow-auto p-4 sm:p-5 lg:p-6">
            <div className="pointer-events-none absolute inset-0 rounded-3xl shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]" />
            <div className="relative z-10">
              <PageTransition>
                <Outlet />
              </PageTransition>
            </div>

          </main>
        </div>
      </div>
    </div>
  );
}
