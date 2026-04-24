import { useNavigate } from "@tanstack/react-router"
import { gsap } from "gsap"
import {
  Activity,
  ArrowRight,
  Calendar,
  TrendingUp,
  Users,
} from "lucide-react"
import { useLayoutEffect, useRef } from "react"
import { useAuth } from "../../../app/Providers/AuthContext"
import { Button } from "../../../shared/ui/Button/Button"

const stats = [
  { icon: Users, label: "Patients", value: "124", color: "text-blue-400" },
  { icon: Calendar, label: "Visits", value: "48", color: "text-emerald-400" },
  { icon: TrendingUp, label: "Revenue", value: "$42k", color: "text-amber-400" },
  { icon: Activity, label: "Active", value: "38", color: "text-rose-400" },
]

const tasks = [
  { icon: Calendar, label: "Review appointments" },
  { icon: Users, label: "Manage patient care" },
  { icon: TrendingUp, label: "Monitor revenue flow" },
  { icon: Activity, label: "Track active cases" },
]

export default function HeroSection() {
  const { user } = useAuth()
  const navigate = useNavigate()

  const heroRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out", duration: 0.9 },
      })

      tl.from(".hero-fade", {
        y: 30,
        opacity: 0,
        stagger: 0.08,
      }).from(
        cardRef.current,
        {
          y: 30,
          opacity: 0,
          duration: 1,
        },
        "-=0.5"
      )

      gsap.from(".stat-item", {
        opacity: 0,
        y: 18,
        stagger: 0.08,
        delay: 0.8,
        duration: 0.7,
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={heroRef}
      className="border-b border-white/10 px-6 pt-14 pb-24 md:pt-20"
    >
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-2 lg:items-center">
        {/* LEFT */}
        <div>
          {user ? (
            <>
              <p className="hero-fade mb-6 text-xs uppercase tracking-[0.34em] text-white/45">
                Welcome Back
              </p>

              <h1 className="hero-fade text-6xl font-semibold leading-[0.92] tracking-[-0.05em] md:text-7xl">
                Hi,
                <br />
                <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                  {user.email?.split("@")[0]}
                </span>
                <br />
                <span className="text-white/45">Ready to manage?</span>
              </h1>

              <p className="hero-fade mt-8 max-w-xl text-lg leading-8 text-white/60">
                Access patients, analytics, scheduling, and operations from one
                intelligent command center.
              </p>

              <div className="hero-fade mt-10 flex flex-col gap-4 sm:flex-row">
                <Button
                  onClick={() => navigate({ to: "/dashboard" })}
                  className="rounded-full bg-white px-7 py-4 text-black hover:bg-white/90"
                >
                  Go to Dashboard
                </Button>

                <Button
                  onClick={() => navigate({ to: "/patients" })}
                  variant="outline"
                  className="rounded-full border border-white/15 bg-white/5 px-7 py-4 text-white hover:bg-white/10"
                >
                  View Patients
                </Button>
              </div>
            </>
          ) : (
            <>
              <p className="hero-fade mb-6 text-xs uppercase tracking-[0.34em] text-white/45">
                Swiss Precision • Linear Simplicity
              </p>

              <h1 className="hero-fade text-6xl font-semibold leading-[0.92] tracking-[-0.05em] md:text-7xl">
                Healthcare
                <br />
                Operations
                <br />
                <span className="text-white/45">Rebuilt.</span>
              </h1>

              <p className="hero-fade mt-8 max-w-xl text-lg leading-8 text-white/60">
                Unified workflows, patient records, analytics, and scheduling —
                built for modern care teams.
              </p>

              <div className="hero-fade mt-8 grid gap-4 sm:grid-cols-2">
                {[
                  "Secure patient data flow",
                  "Smart scheduling",
                  "Compliance reporting",
                  "Realtime analytics",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-3xl border border-white/10 bg-white/[0.03] px-4 py-4 text-sm text-white/70"
                  >
                    {item}
                  </div>
                ))}
              </div>

              <div className="hero-fade mt-10 flex flex-col gap-4 sm:flex-row">
                <Button
                  onClick={() => navigate({ to: "/signup" })}
                  className="rounded-full bg-white px-7 py-4 text-black hover:bg-white/90"
                >
                  Start Free Trial
                </Button>

                <Button
                  variant="outline"
                  className="rounded-full border border-white/15 bg-white/5 px-7 py-4 text-white hover:bg-white/10"
                >
                  Explore Platform
                </Button>
              </div>
            </>
          )}
        </div>

        {/* RIGHT */}
        <div className="relative">
          <div className="absolute -left-10 top-10 h-40 w-40 rounded-full bg-indigo-500/20 blur-3xl" />
          <div className="absolute -right-10 bottom-10 h-40 w-40 rounded-full bg-emerald-400/10 blur-3xl" />

          <div
            ref={cardRef}
            className="relative rounded-[32px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-2xl"
          >
            <div className="absolute inset-0 rounded-[32px] bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:42px_42px]" />

            <div className="relative rounded-[28px] border border-white/10 bg-black/25 p-6">
              <p className="text-xs uppercase tracking-[0.28em] text-white/40">
                Quick Stats
              </p>

              <p className="mt-2 text-sm text-white/55">
                Your operations at a glance
              </p>

              {/* FIXED EMPTY SPACE HERE */}
              <div className="mt-6 grid grid-cols-2 gap-3">
                {stats.map(({ icon: Icon, label, value, color }) => (
                  <div
                    key={label}
                    className="stat-item rounded-3xl border border-white/10 bg-white/[0.04] p-4"
                  >
                    <div className="mb-2 flex items-center gap-2">
                      <Icon size={16} className={color} />
                      <span className="text-[0.68rem] uppercase tracking-[0.22em] text-white/40">
                        {label}
                      </span>
                    </div>

                    <p className="text-2xl font-semibold">{value}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 space-y-2">
                <p className="text-xs uppercase tracking-[0.22em] text-white/40">
                  Operations
                </p>

                {tasks.map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="flex items-center gap-3 rounded-3xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white/70"
                  >
                    <Icon size={17} className="text-emerald-300" />
                    {label}
                  </div>
                ))}
              </div>

              <button
                onClick={() => navigate({ to: "/analytics" })}
                className="mt-6 flex w-full items-center justify-between border-t border-white/10 pt-5 text-sm text-white/60 transition hover:text-white"
              >
                <span>View full analytics</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
