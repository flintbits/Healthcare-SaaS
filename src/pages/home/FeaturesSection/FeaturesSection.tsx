export default function FeaturesSection() {
  return (
    <section id="solutions" className="border-b border-white/10 px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-[0.34em] text-white/40">
              Core Infrastructure
            </p>
            <h2 className="mt-5 text-5xl font-semibold tracking-[-0.04em]">
              Built for compliance.
            </h2>
          </div>

          <p className="text-lg leading-8 text-white/55">
            Designed with Swiss clarity and enterprise rigor. Secure architecture, fast sync and resilient uptime across critical healthcare environments.
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {[
            "99.99% Uptime",
            "AES-256 Security",
            "Audit Logging",
            "Enterprise SSO",
          ].map((item) => (
            <div
              key={item}
              className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl"
            >
              <p className="text-sm text-white/80">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
