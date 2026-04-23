import { useNavigate } from "@tanstack/react-router"
import { Button } from "../../../shared/ui/Button/Button"

export default function PricingSection() {
  const navigate = useNavigate()

  return (
    <section id="pricing" className="px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-center text-5xl font-semibold tracking-[-0.04em]">
          Scale with confidence
        </h2>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          <div className="rounded-[34px] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-2xl">
            <p className="text-xs uppercase tracking-[0.28em] text-white/45">
              Professional
            </p>
            <p className="mt-6 text-6xl font-semibold">$499</p>
            <p className="mt-2 text-white/50">per month</p>

            <Button onClick={() => navigate({ to: "/signup" })} className="mt-8 w-full rounded-full bg-white text-black hover:bg-white/90">
              Choose Plan
            </Button>
          </div>

          <div className="rounded-[34px] border border-white/20 bg-white/[0.08] p-8 backdrop-blur-3xl">
            <p className="text-xs uppercase tracking-[0.28em] text-white/45">
              Enterprise
            </p>
            <p className="mt-6 text-6xl font-semibold">Custom</p>
            <p className="mt-2 text-white/50">hospital networks</p>

            <Button onClick={() => navigate({ to: "/signup" })} className="mt-8 w-full rounded-full border border-white bg-white text-black hover:bg-white/90">
              Contact Sales
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
