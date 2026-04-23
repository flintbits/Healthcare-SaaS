import { useNavigate } from "@tanstack/react-router"
import { Activity, ArrowRight, Calendar, TrendingUp, Users } from "lucide-react"
import { useAuth } from "../../../app/Providers/AuthContext"
import { Button } from "../../../shared/ui/Button/Button"

export default function HeroSection() {
  const { user } = useAuth()
  const navigate = useNavigate()

  return (
    <section className="border-b border-white/10 pt-14 md:pt-20">
      <div className="mx-auto grid max-w-7xl gap-16 px-6 py-24 lg:grid-cols-[1fr_0.95fr] lg:items-center">
        {/* left */}
        <div>
          {user ? (
            <>
              <p className="mb-6 text-xs uppercase tracking-[0.34em] text-white/45">
                Welcome Back
              </p>

              <h1 className="max-w-4xl text-6xl font-semibold leading-[0.92] tracking-[-0.05em] md:text-7xl">
                Hi, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-400">
                  {user.email?.split("@")[0]}
                </span>
                <br />
                <span className="text-white/45">Ready to manage?</span>
              </h1>

              <p className="mt-8 max-w-xl text-lg leading-8 text-white/60">
                Access your dashboard, manage patients, view analytics, and coordinate your healthcare operations.
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
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
              <p className="mb-6 text-xs uppercase tracking-[0.34em] text-white/45">
                Swiss Precision • Linear Simplicity
              </p>

              <h1 className="max-w-4xl text-6xl font-semibold leading-[0.92] tracking-[-0.05em] md:text-7xl">
                Healthcare
                <br />
                Operations
                <br />
                <span className="text-white/45">Rebuilt.</span>
              </h1>

              <p className="mt-8 max-w-xl text-lg leading-8 text-white/60">
                Unified workflows, patient records, analytics and staff coordination in one intelligent operating layer for modern care systems.
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
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

          <div className="rounded-[32px] border border-white/10 bg-white/[0.05] p-6 shadow-2xl backdrop-blur-3xl">
            {/* Grid pattern background */}
            <div className="absolute inset-0 rounded-[32px] bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:42px_42px]" />

            <div className="relative rounded-[28px] border border-white/10 bg-black/30 p-6">
              {user ? (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <p className="text-xs uppercase tracking-[0.28em] text-white/40">
                        Quick Stats
                      </p>
                      <p className="mt-2 text-sm text-white/60">
                        Your operations at a glance
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-4 hover:bg-white/[0.08] transition">
                      <div className="flex items-center gap-2 mb-2">
                        <Users size={16} className="text-blue-400" />
                        <p className="text-xs uppercase tracking-[0.22em] text-white/40">
                          Patients
                        </p>
                      </div>
                      <p className="text-2xl font-semibold">124</p>
                    </div>

                    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-4 hover:bg-white/[0.08] transition">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar size={16} className="text-emerald-400" />
                        <p className="text-xs uppercase tracking-[0.22em] text-white/40">
                          Visits
                        </p>
                      </div>
                      <p className="text-2xl font-semibold">48</p>
                    </div>

                    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-4 hover:bg-white/[0.08] transition">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp size={16} className="text-amber-400" />
                        <p className="text-xs uppercase tracking-[0.22em] text-white/40">
                          Revenue
                        </p>
                      </div>
                      <p className="text-2xl font-semibold">$42k</p>
                    </div>

                    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-4 hover:bg-white/[0.08] transition">
                      <div className="flex items-center gap-2 mb-2">
                        <Activity size={16} className="text-rose-400" />
                        <p className="text-xs uppercase tracking-[0.22em] text-white/40">
                          Active
                        </p>
                      </div>
                      <p className="text-2xl font-semibold">38</p>
                    </div>
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
