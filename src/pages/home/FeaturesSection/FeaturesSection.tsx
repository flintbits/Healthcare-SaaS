import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import {
  Activity,
  BarChart3,
  Calendar,
  Clock3,
  Cpu,
  Lock,
  Shield,
  Users,
} from "lucide-react"
import { useLayoutEffect, useRef } from "react"

gsap.registerPlugin(ScrollTrigger)

const primaryFeatures = [
  {
    icon: Users,
    title: "Patient-first workflow",
    description:
      "Keep records, visits, treatment plans, and follow-ups unified in one intelligent system.",
  },
  {
    icon: Shield,
    title: "Compliance-ready reporting",
    description:
      "Generate audit trails, governance reports, and operational insights automatically.",
  },
  {
    icon: Activity,
    title: "Live care operations",
    description:
      "Track admissions, active cases, discharge flow, and team workload in real time.",
  },
  {
    icon: Calendar,
    title: "Smart scheduling",
    description:
      "Reduce no-shows and optimize calendars with automated reminders and dynamic booking.",
  },
]

const metrics = [
  {
    icon: Clock3,
    label: "99.99% Uptime",
  },
  {
    icon: Lock,
    label: "AES-256 Security",
  },
  {
    icon: BarChart3,
    label: "Advanced Analytics",
  },
  {
    icon: Cpu,
    label: "AI Automation",
  },
]

function FeatureCard({
  icon: Icon,
  title,
  description,
}: {
  icon: any
  title: string
  description: string
}) {
  return (
    <div className="feature-card rounded-[28px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.06]">
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04]">
        <Icon size={18} className="text-emerald-300" />
      </div>

      <p className="mt-5 text-sm uppercase tracking-[0.24em] text-emerald-300">
        {title}
      </p>

      <p className="mt-4 text-sm leading-7 text-white/60">
        {description}
      </p>
    </div>
  )
}

function MetricCard({
  icon: Icon,
  label,
}: {
  icon: any
  label: string
}) {
  return (
    <div className="metric-card rounded-[26px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl transition-all duration-300 hover:border-white/20">
      <div className="flex items-center gap-3">
        <Icon size={18} className="text-white/70" />
        <p className="text-sm text-white/80">{label}</p>
      </div>
    </div>
  )
}

export default function FeaturesSection() {
  const sectionRef = useRef<HTMLElement | null>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".feature-heading",
        {
          y: 40,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            once: true,
          },
        }
      )

      gsap.fromTo(
        ".feature-card",
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".features-grid",
            start: "top 82%",
            once: true,
          },
        }
      )

      gsap.fromTo(
        ".metric-card",
        {
          y: 35,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".metrics-grid",
            start: "top 88%",
            once: true,
          },
        }
      )

      ScrollTrigger.refresh()
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="solutions"
      className="border-b border-white/10 px-6 py-28"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr]">
          <div className="feature-heading">
            <p className="text-xs uppercase tracking-[0.34em] text-white/40">
              Platform Capabilities
            </p>

            <h2 className="mt-5 text-5xl font-semibold tracking-[-0.04em] md:text-6xl">
              Built for modern care teams.
            </h2>

            <p className="mt-6 max-w-xl text-lg leading-8 text-white/60">
              Deliver faster admissions, smarter scheduling, seamless care
              coordination, and stronger compliance with software designed for
              clinicians and operators alike.
            </p>

            <div className="mt-10 space-y-4 text-sm text-white/55">
              <p>• Reduce admin overhead</p>
              <p>• Improve patient satisfaction</p>
              <p>• Scale operations confidently</p>
            </div>
          </div>

          <div className="features-grid grid gap-4 sm:grid-cols-2">
            {primaryFeatures.map((item) => (
              <FeatureCard
                key={item.title}
                icon={item.icon}
                title={item.title}
                description={item.description}
              />
            ))}
          </div>
        </div>

        <div className="metrics-grid mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {metrics.map((item) => (
            <MetricCard
              key={item.label}
              icon={item.icon}
              label={item.label}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
