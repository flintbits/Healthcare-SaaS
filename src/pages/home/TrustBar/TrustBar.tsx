export default function TrustBar() {
  return (
    <section className="border-b border-white/10">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-6 py-10 md:grid-cols-5">
        {["MetroHealth", "Saint Lukes", "Mayo Care", "Cleveland", "Kaiser"].map((item) => (
          <div
            key={item}
            className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-3 text-center text-sm text-white/55 backdrop-blur-xl"
          >
            {item}
          </div>
        ))}
      </div>
    </section>
  )
}
