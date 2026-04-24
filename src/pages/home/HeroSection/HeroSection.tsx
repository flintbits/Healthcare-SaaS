import { useNavigate } from "@tanstack/react-router"
import { gsap } from "gsap"
import { Activity, ArrowRight, Calendar, TrendingUp, Users } from "lucide-react"
import { useLayoutEffect, useRef } from "react"
import { useAuth } from "../../../app/Providers/AuthContext"
import { Button } from "../../../shared/ui/Button/Button"

export default function HeroSection() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const heroRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (!heroRef.current || !cardRef.current) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { duration: 0.8, ease: "power3.out" } })

      tl.from(".hero-title", { opacity: 0, y: 40, stagger: 0.08 })
        .from(
          ".hero-copy",
          { opacity: 0, y: 24, duration: 0.9 },
          "-=0.5"
        )
        .from(
          ".hero-actions > *",
          { opacity: 0, y: 24, stagger: 0.12 },
          "-=0.7"
        )
        .from(
          cardRef.current,
          { opacity: 0, y: 30, duration: 1, ease: "power4.out" },
          "-=0.6"
        )

      if (statsRef.current) {
        gsap.from(statsRef.current.children, {
          opacity: 0,
          y: 16,
          stagger: 0.12,
          duration: 0.7,
          ease: "power3.out",
          delay: 0.2,
        })
      }

      return () => tl.kill()
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="border-b border-white/10 pt-14 md:pt-20" ref={heroRef}>
      <div className="mx-auto grid max-w-7xl gap-16 px-6 py-24 lg:grid-cols-[1fr_0.95fr] lg:items-center">
        {/* left */}
        <div>
          {user ? (
            <>
              <p className="hero-title mb-6 text-xs uppercase tracking-[0.34em] text-white/45">
                Welcome Back
              </p>

              <h1 className="hero-title max-w-4xl text-6xl font-semibold leading-[0.92] tracking-[-0.05em] md:text-7xl">
                Hi, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-400">
                  {user.email?.split("@")[0]}
                </span>
                <br />
                <span className="text-white/45">Ready to manage?</span>
              </h1>

              <p className="hero-copy mt-8 max-w-xl text-lg leading-8 text-white/60">
                Access your dashboard, manage patients, view analytics, and coordinate your healthcare operations with a beautifully simple command center.
              </p>

              <div className="hero-actions mt-10 flex flex-col gap-4 sm:flex-row">
                <Button
                  onClick={() => navigate({ to: "/dashboard" })}
                  className="rounded-full border border-white bg-white px-7 py-4 text-black hover:bg-white/90 flex items-center gap-2"
                >
                  Go to Dashboard
                  <ArrowRight size={18} />
                </Button>

                <Button
                  onClick={() => navigate({ to: "/patients" })}
                  variant="outline"
                  className="rounded-full border border-white/15 bg-white/5 px-7 py-4 text-white backdrop-blur-xl hover:bg-white/10"
                >
                  View Patients
                </Button>
              </div>
            </>
          ) : (
            <>
              <p className="hero-title mb-6 text-xs uppercase tracking-[0.34em] text-white/45">
                Swiss Precision • Linear Simplicity
              </p>

              <h1 className="hero-title max-w-4xl text-6xl font-semibold leading-[0.92] tracking-[-0.05em] md:text-7xl">
                Healthcare
                <br />
                Operations
                <br />
                <span className="text-white/45">Rebuilt.</span>
              </h1>

              <p className="hero-copy mt-8 max-w-xl text-lg leading-8 text-white/60">
                Unified workflows, patient records, analytics, and team coordination in one intelligent operating layer — built for modern care teams and enterprise healthcare systems.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {[
                  "Secure patient data flow",
                  "Faster appointment coordination",
                  "Compliance-ready reporting",
                  "Real-time operational insight",
                ].map((item) => (
                  <div key={item} className="inline-flex items-center gap-3 rounded-3xl border border-white/10 bg-white/[0.04] px-4 py-4 text-sm text-white/70">
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                    {item}
                  </div>
                ))}
              </div>

              <div className="hero-actions mt-10 flex flex-col gap-4 sm:flex-row">
                <Button onClick={() => navigate({ to: "/signup" })} className="rounded-full border border-white bg-white px-7 py-4 text-black hover:bg-white/90">
                  Start Free Trial
                </Button>

                <Button
                  variant="outline"
                  className="rounded-full border border-white/15 bg-white/5 px-7 py-4 text-white backdrop-blur-xl hover:bg-white/10"
                >
                  Explore Platform
                </Button>
              </div>
            </>
          )}
        </div>

        {/* right card with grid pattern */}
        <div className="relative">
          <div className="absolute -left-10 top-10 h-40 w-40 rounded-full bg-indigo-500/20 blur-3xl" />
          <div className="absolute -right-8 bottom-8 h-44 w-44 rounded-full bg-white/10 blur-3xl" />

          <div ref={cardRef} className="rounded-[32px] border border-white/10 bg-white/[0.05] p-6 shadow-2xl backdrop-blur-3xl">
            {/* Grid pattern background */}
            <div className="absolute inset-0 rounded-[32px] bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:42px_42px]" />

            <div className="relative rounded-[28px] border border-white/10 bg-black/30 p-6">
              {user ? (
                <>
                  <div className="mb-4">
                    <p className="text-xs uppercase tracking-[0.28em] text-white/40">
                      Quick Stats
                    </p>
                    <p className="mt-1.5 text-sm text-white/60">
                      Your operations at a glance
                    </p>
                  </div>

                  <div ref={statsRef} className="grid grid-cols-2 gap-3">
                    {[
                      {
                        icon: Users,
                        label: "Patients",
                        value: "124",
                        color: "text-blue-400",
                      },
                      {
                        icon: Calendar,
                        label: "Visits",
                        value: "48",
                        color: "text-emerald-400",
                      },
                      {
                        icon: TrendingUp,
                        label: "Revenue",
                        value: "$42k",
                        color: "text-amber-400",
                      },
                      {
                        icon: Activity,
                        label: "Active",
                        value: "38",
                        color: "text-rose-400",
                      },
                    ].map(({ icon: Icon, label, value, color }) => (
                      <div
                        key={label}
                        className="rounded-3xl border border-white/10 bg-white/[0.08] p-3.5 min-h-[90px] hover:bg-white/[0.12] transition"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <Icon size={18} className={color} />
                          <p className="text-[0.7rem] uppercase tracking-[0.22em] text-white/40">
                            {label}
                          </p>
                        </div>
                        <p className="text-2xl font-semibold text-white">{value}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 space-y-2">
                    <p className="text-xs uppercase tracking-[0.22em] text-white/40">
                      Operations
                    </p>
                    {[
                      { icon: Calendar, label: "Review appointments" },
                      { icon: Users, label: "Manage patient care" },
                      { icon: TrendingUp, label: "Monitor revenue flow" },
                      { icon: Activity, label: "Track active cases" },
                    ].map(({ icon: Icon, label }) => (
                      <div key={label} className="flex items-center gap-3 rounded-3xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white/70">
                        <Icon size={18} className="text-emerald-300" />
                        {label}
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 pt-4 border-t border-white/10">
                    <button
                      onClick={() => navigate({ to: "/analytics" })}
                      className="w-full flex items-center justify-between text-sm text-white/60 hover:text-white transition group"
                    >
                      <span>View full analytics</span>
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition" />
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.28em] text-white/40">
                        Platform Metrics
                      </p>
                      <p className="mt-3 text-4xl font-semibold">1,284</p>
                      <p className="mt-1 text-sm text-white/50">Active Patients</p>
                    </div>

                    <div className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-sm text-emerald-300">
                      +9.7%
                    </div>
                  </div>

                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
                      <p className="text-xs uppercase tracking-[0.22em] text-white/40">
                        Occupancy
                      </p>
                      <p className="mt-3 text-3xl font-semibold">92%</p>
                    </div>

                    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
                      <p className="text-xs uppercase tracking-[0.22em] text-white/40">
                        Revenue
                      </p>
                      <p className="mt-3 text-3xl font-semibold">$42.8k</p>
                    </div>
                  </div>

                  {/* chart */}
                  <div className="mt-6 rounded-3xl border border-white/10 bg-white/[0.03] p-5">
                    <div className="mb-5 flex items-center justify-between text-sm text-white/50">
                      <span>Realtime Performance</span>
                      <span>24h</span>
                    </div>

                    <div className="relative h-44 overflow-hidden rounded-2xl bg-white/[0.02]">
                      <div className="absolute inset-x-0 bottom-0 h-[2px] bg-white/10" />

                      <svg
                        viewBox="0 0 400 180"
                        className="absolute inset-0 h-full w-full"
                        fill="none"
                      >
                        <path
                          d="M0 140C40 130 55 95 90 100C130 105 150 60 190 72C230 84 245 35 290 44C340 54 355 22 400 28"
                          stroke="white"
                          strokeOpacity="0.9"
                          strokeWidth="2"
                        />
                        <path
                          d="M0 180V140C40 130 55 95 90 100C130 105 150 60 190 72C230 84 245 35 290 44C340 54 355 22 400 28V180Z"
                          fill="url(#fade)"
                          opacity="0.35"
                        />
                        <defs>
                          <linearGradient id="fade" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="white" />
                            <stop offset="100%" stopColor="transparent" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
