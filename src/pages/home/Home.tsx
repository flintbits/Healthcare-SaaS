import { Link } from "@tanstack/react-router"
import { Button } from "../../shared/ui/Button/Button"


export default function Home() {

    return (
        <div className="min-h-screen text-white relative">

            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage:
                        "url(https://images.unsplash.com/photo-1628771065518-0d82f1938462?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
                }}
            />

            <div className="absolute inset-0 bg-black/20" />

            <section className="relative max-w-7xl mx-auto px-6 py-12 min-h-screen flex items-center">

                <div className="flex flex-col gap-6 text-center md:text-left max-w-xl">

                    <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                        Modern Healthcare
                        <span className="text-(--color-accent)">
                            SaaS Platform
                        </span>
                    </h1>

                    <p className="text-white text-lg">
                        Manage patients in one secure,
                        fast and scalable healthcare management system.
                    </p>

                    <div>
                        <Link to="/dashboard">
                            <Button variant="outline" className="px-6 py-3 text-lg">
                                Go to Dashboard
                            </Button>
                        </Link>
                    </div>

                </div>

            </section>
        </div>
    )
}
