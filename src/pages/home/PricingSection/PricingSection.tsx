import { useNavigate } from "@tanstack/react-router"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useLayoutEffect, useRef } from "react"
import { Button } from "../../../shared/ui/Button/Button"

gsap.registerPlugin(ScrollTrigger)

type Plan = {
  name: string
  price: string
  subtitle: string
  description: string
  features: string[]
  highlighted?: boolean
  cta: string
}

const plans: Plan[] = [
  {
    name: "Professional",
    price: "$499",
    subtitle: "per month",
    description:
      "Perfect for private clinics and growing healthcare teams that need efficient operations.",
    features: [
      "Appointment automation",
      "Patient management",
      "Revenue dashboards",
      "Staff permissions",
      "Priority support",
    ],
    cta: "Choose Plan",
  },
  {
    name: "Enterprise",
    price: "Custom",
    subtitle: "hospital networks",
    description:
      "Built for enterprise systems requiring scale, compliance, integrations, and dedicated support.",
    features: [
      "Unlimited facilities",
      "Advanced analytics",
      "Custom integrations",
      "Dedicated onboarding",
      "Enterprise SLA",
    ],
    highlighted: true,
    cta: "Contact Sales",
  },
]

function FeatureItem({ text }: { text: string }) {
  return (
    <li className="flex items-center gap-3 text-sm text-white/70">
      <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
      {text}
    </li>
  )
}

function PricingCard({
  plan,
  onClick,
}: {
  plan: Plan
  onClick: () => void
}) {
  return (
    <div
      className={`pricing-card opacity-100 rounded-[34px] border p-8 backdrop-blur-2xl transition-all duration-300 hover:-translate-y-2 hover:border-white/25 ${plan.highlighted
        ? "border-white/20 bg-white/[0.08]"
        : "border-white/10 bg-white/[0.03]"
        }`}
    >
      <p className="text-xs uppercase tracking-[0.28em] text-white/45">
        {plan.name}
      </p>

      <div className="mt-6">
        <p className="text-6xl font-semibold tracking-[-0.04em]">
          {plan.price}
        </p>
        <p className="mt-2 text-white/50">{plan.subtitle}</p>
      </div>

      <p className="mt-6 text-sm leading-6 text-white/65">
        {plan.description}
      </p>

      <ul className="mt-8 space-y-4">
        {plan.features.map((feature) => (
          <FeatureItem key={feature} text={feature} />
        ))}
      </ul>

      <Button
        onClick={onClick}
        className="mt-10 w-full rounded-full bg-white text-black hover:bg-white/90"
      >
        {plan.cta}
      </Button>
    </div>
  )
}

export default function PricingSection() {
  const navigate = useNavigate()
  const sectionRef = useRef<HTMLElement | null>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".pricing-heading",
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
        ".pricing-card",
        {
          y: 60,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.18,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 72%",
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
      id="pricing"
      className="px-6 py-28"
    >
      <div className="mx-auto max-w-7xl">
        <div className="pricing-heading text-center opacity-100">
          <p className="text-sm uppercase tracking-[0.32em] text-white/40">
            Pricing
          </p>

          <h2 className="mt-4 text-5xl font-semibold tracking-[-0.04em] md:text-6xl">
            Scale with confidence
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/55">
            Transparent pricing for clinics, hospitals, and healthcare teams.
            Start fast, automate operations, and grow without friction.
          </p>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          {plans.map((plan) => (
            <PricingCard
              key={plan.name}
              plan={plan}
              onClick={() => navigate({ to: "/signup" })}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
