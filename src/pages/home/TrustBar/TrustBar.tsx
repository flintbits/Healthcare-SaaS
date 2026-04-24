import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import {
  BadgeCheck,
  Building2,
  Globe,
  HeartPulse,
  ShieldCheck,
} from "lucide-react"
import { useLayoutEffect, useRef } from "react"

gsap.registerPlugin(ScrollTrigger)

const partners = [
  {
    icon: Building2,
    name: "MetroHealth",
  },
  {
    icon: HeartPulse,
    name: "Saint Lukes",
  },
  {
    icon: ShieldCheck,
    name: "Mayo Care",
  },
  {
    icon: Globe,
    name: "Cleveland",
  },
  {
    icon: BadgeCheck,
    name: "Kaiser",
  },
]

function PartnerCard({
  icon: Icon,
  name,
}: {
  icon: any
  name: string
}) {
  return (
    <div className="trust-item group rounded-full border border-white/10 bg-white/3 px-5 py-4 backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:bg-white/5">
      <div className="flex items-center justify-center gap-3">
        <Icon
          size={16}
          className="text-emerald-300 transition-transform duration-300 group-hover:scale-110"
        />
        <span className="text-sm font-medium text-white/65">{name}</span>
      </div>
    </div>
  )
}

export default function TrustBar() {
  const sectionRef = useRef<HTMLElement | null>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".trust-heading",
        {
          y: 20,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 92%",
            once: true,
          },
        }
      )

      gsap.fromTo(
        ".trust-item",
        {
          y: 35,
          opacity: 0,
          scale: 0.96,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".trust-grid",
            start: "top 92%",
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
      className="border-b border-white/10 px-6 py-14"
    >
      <div className="mx-auto max-w-7xl">
        <div className="trust-heading text-center">
          <p className="text-xs uppercase tracking-[0.34em] text-white/35">
            Trusted by leading care providers
          </p>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/55">
            Healthcare teams rely on our platform to modernize operations,
            improve patient outcomes, and scale securely.
          </p>
        </div>

        <div className="trust-grid mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {partners.map((item) => (
            <PartnerCard
              key={item.name}
              icon={item.icon}
              name={item.name}
            />
          ))}
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <div className="rounded-[28px] border border-white/10 bg-white/3 p-5 text-center backdrop-blur-xl">
            <p className="text-3xl font-semibold">250+</p>
            <p className="mt-2 text-sm text-white/55">Facilities onboarded</p>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-white/3 p-5 text-center backdrop-blur-xl">
            <p className="text-3xl font-semibold">4.9/5</p>
            <p className="mt-2 text-sm text-white/55">Client satisfaction</p>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-white/3 p-5 text-center backdrop-blur-xl">
            <p className="text-3xl font-semibold">99.99%</p>
            <p className="mt-2 text-sm text-white/55">Platform uptime</p>
          </div>
        </div>
      </div>
    </section>
  )
}
