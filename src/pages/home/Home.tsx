import { Button } from "../../shared/ui/Button/Button"

export default function Home() {
    return (
        <main className="min-h-screen bg-slate-950 text-slate-100">
            <section className="overflow-hidden border-b border-slate-800">
                <div className="mx-auto grid max-w-7xl gap-16 px-6 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
                    <div className="space-y-8">
                        <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-2 text-sm text-indigo-100">
                            <span className="rounded-full bg-indigo-500 px-2 py-1 text-xs uppercase tracking-[0.24em]">Version 4.0</span>
                            Now live
                        </div>

                        <div className="space-y-6">
                            <h1 className="max-w-3xl text-5xl font-semibold tracking-tight text-white sm:text-6xl">
                                Healthcare Operations,
                                <span className="text-indigo-400"> Reimagined.</span>
                            </h1>
                            <p className="max-w-2xl text-lg leading-8 text-slate-300">
                                Manage patients, analytics, staff workflows, appointments and records from one intelligent platform built for modern care teams.
                            </p>
                        </div>

                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                            <Button className="bg-indigo-500 border-indigo-500 px-7 py-4 text-base font-semibold hover:bg-indigo-400">
                                Start Free Trial
                            </Button>
                            <Button variant="outline" className="border-slate-600 text-slate-100 px-7 py-4 hover:bg-slate-800">
                                Book Demo
                            </Button>
                        </div>
                    </div>

                    <div className="relative rounded-[2rem] border border-slate-800 bg-slate-900/90 p-8 shadow-2xl shadow-slate-950/40">
                        <div className="grid gap-5 rounded-[1.75rem] bg-slate-950/90 p-6 shadow-inner shadow-slate-950/50">
                            <div className="flex items-center justify-between gap-4">
                                <div>
                                    <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Active patients</p>
                                    <p className="mt-2 text-3xl font-semibold text-white">1,284</p>
                                </div>
                                <div className="rounded-2xl bg-slate-800 px-3 py-2 text-sm text-emerald-300">+9.7%</div>
                            </div>
                            <div className="grid gap-4 sm:grid-cols-3">
                                <div className="rounded-3xl bg-slate-900/80 p-4">
                                    <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Occupancy rate</p>
                                    <p className="mt-3 text-2xl font-semibold text-white">92.4%</p>
                                </div>
                                <div className="rounded-3xl bg-slate-900/80 p-4 sm:col-span-2">
                                    <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Daily revenue</p>
                                    <p className="mt-3 text-2xl font-semibold text-white">$42.8k</p>
                                    <p className="mt-2 text-sm text-slate-400">+14.2% vs yesterday</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 rounded-[1.5rem] bg-gradient-to-br from-indigo-500/10 via-slate-900/70 to-slate-950/95 p-6">
                            <div className="flex items-center justify-between text-sm text-slate-400">
                                <span>Performance</span>
                                <span className="text-white">Real time</span>
                            </div>
                            <div className="mt-5 h-56 rounded-3xl bg-slate-950/80 p-4">
                                <div className="h-full w-full rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="border-b border-slate-800 bg-slate-950/95">
                <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-8 px-6 py-10 text-center text-sm text-slate-400">
                    <span className="px-3 py-2 rounded-full bg-slate-900/70">MetroHealth</span>
                    <span className="px-3 py-2 rounded-full bg-slate-900/70">Saint Lukes</span>
                    <span className="px-3 py-2 rounded-full bg-slate-900/70">Mayo Care</span>
                    <span className="px-3 py-2 rounded-full bg-slate-900/70">Cleveland</span>
                    <span className="px-3 py-2 rounded-full bg-slate-900/70">Kaiser</span>
                </div>
            </section>

            <section id="solutions" className="border-b border-slate-800 px-6 py-16">
                <div className="mx-auto max-w-7xl space-y-12">
                    <div className="grid gap-8 lg:grid-cols-2 lg:items-end">
                        <div className="space-y-4">
                            <p className="text-sm uppercase tracking-[0.24em] text-indigo-300">Precision Tools for Modern Care</p>
                            <h2 className="text-4xl font-semibold text-white">Built for compliance, not just convenience.</h2>
                            <p className="max-w-2xl text-lg leading-8 text-slate-400">
                                We understand that in healthcare, data integrity is patient safety. HealthOS is built from the ground up to exceed international standards for medical data management.
                            </p>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="rounded-[1.5rem] border border-slate-800 bg-slate-900/80 p-6">
                                <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Uptime SLA</p>
                                <p className="mt-4 text-3xl font-semibold text-white">99.99%</p>
                            </div>
                            <div className="rounded-[1.5rem] border border-slate-800 bg-slate-900/80 p-6">
                                <p className="text-sm uppercase tracking-[0.24em] text-slate-500">256-bit</p>
                                <p className="mt-4 text-3xl font-semibold text-white">AES encryption</p>
                            </div>
                            <div className="rounded-[1.5rem] border border-slate-800 bg-slate-900/80 p-6">
                                <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Audit</p>
                                <p className="mt-4 text-3xl font-semibold text-white">Trails logging</p>
                            </div>
                            <div className="rounded-[1.5rem] border border-slate-800 bg-slate-900/80 p-6">
                                <p className="text-sm uppercase tracking-[0.24em] text-slate-500">SSO</p>
                                <p className="mt-4 text-3xl font-semibold text-white">Enterprise SAML</p>
                            </div>
                        </div>
                    </div>

                    <div className="grid gap-8 lg:grid-cols-2">
                        <div className="rounded-[1.75rem] border border-slate-800 bg-slate-900/85 p-8 shadow-lg shadow-slate-950/30">
                            <p className="text-sm uppercase tracking-[0.24em] text-indigo-300">Predictive Patient Analytics</p>
                            <h3 className="mt-4 text-2xl font-semibold text-white">Utilize machine learning to identify at-risk patients.</h3>
                            <p className="mt-4 text-slate-400">
                                Optimize floor staffing hours before shifts begin so your team stays ahead of patient needs.
                            </p>
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="rounded-[1.75rem] border border-slate-800 bg-slate-900/85 p-8">
                                <p className="text-sm uppercase tracking-[0.24em] text-indigo-300">Instant Sync</p>
                                <h3 className="mt-4 text-2xl font-semibold text-white">Zero-latency record updates.</h3>
                                <p className="mt-4 text-slate-400">Sync across every device and desktop terminal in your facility.</p>
                                <div className="mt-6 text-3xl font-semibold text-emerald-300">0.4s</div>
                                <p className="text-sm text-slate-500">average sync time</p>
                            </div>
                            <div className="rounded-[1.75rem] border border-slate-800 bg-slate-900/85 p-8">
                                <p className="text-sm uppercase tracking-[0.24em] text-indigo-300">Enterprise Security</p>
                                <h3 className="mt-4 text-2xl font-semibold text-white">Military-grade encryption for PHI.</h3>
                                <p className="mt-4 text-slate-400">Protect patient health information and support HIPAA compliance out of the box.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="pricing" className="border-b border-slate-800 px-6 py-16">
                <div className="mx-auto max-w-7xl space-y-10 text-center">
                    <div className="space-y-4">
                        <p className="text-sm uppercase tracking-[0.24em] text-indigo-300">Flexible for clinics, powerful for enterprises</p>
                        <h2 className="text-4xl font-semibold text-white">Scale with HealthOS</h2>
                    </div>

                    <div className="grid gap-6 lg:grid-cols-2">
                        <div className="rounded-[2rem] border border-slate-800 bg-slate-900/85 p-8 text-left">
                            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Professional</p>
                            <p className="mt-6 text-5xl font-semibold text-white">$499<span className="text-base font-medium text-slate-400">/month</span></p>
                            <p className="mt-4 text-slate-400">Ideal for private practices and regional clinics.</p>
                            <Button className="mt-8 w-full bg-transparent text-white border border-slate-700 hover:bg-slate-800">
                                Select Professional
                            </Button>
                        </div>
                        <div className="rounded-[2rem] border border-indigo-500 bg-indigo-500/10 p-8 text-left">
                            <div className="inline-flex rounded-full bg-indigo-500 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-white">
                                Recommended
                            </div>
                            <p className="mt-6 text-5xl font-semibold text-white">Custom</p>
                            <p className="mt-4 text-slate-300">Custom features for large hospital networks.</p>
                            <Button className="mt-8 w-full bg-indigo-500 border-indigo-500 text-white hover:bg-indigo-400">
                                Contact Sales
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            <footer id="resources" className="bg-slate-950 px-6 py-12 text-slate-400">
                <div className="mx-auto flex max-w-7xl flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <h3 className="text-xl font-semibold text-white">HealthOS</h3>
                        <p className="mt-3 max-w-md text-sm text-slate-500">Building the digital operating system for the next century of healthcare.</p>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-3">
                        <div>
                            <p className="uppercase tracking-[0.24em] text-slate-500">Product</p>
                            <p className="mt-3 text-sm">Features</p>
                            <p className="mt-2 text-sm">Integrations</p>
                            <p className="mt-2 text-sm">Security</p>
                        </div>
                        <div>
                            <p className="uppercase tracking-[0.24em] text-slate-500">Company</p>
                            <p className="mt-3 text-sm">About Us</p>
                            <p className="mt-2 text-sm">Careers</p>
                            <p className="mt-2 text-sm">Privacy</p>
                        </div>
                        <div>
                            <p className="uppercase tracking-[0.24em] text-slate-500">Subscribe</p>
                            <p className="mt-3 text-sm text-slate-400">doctor@hospital.com</p>
                        </div>
                    </div>
                </div>
            </footer>
        </main>
    )
}
