import { useAuth } from "../../app/Providers/AuthContext"
import FeaturesSection from "./FeaturesSection"
import Footer from "./Footer/Footer"
import HeroSection from "./HeroSection"
import PricingSection from "./PricingSection"
import TrustBar from "./TrustBar"

export default function Home() {
    const { user } = useAuth()

    return (
        <main className="min-h-screen overflow-hidden bg-[#05070b] text-white selection:bg-white/20">
            {/* background */}
            <div className="fixed inset-0 -z-10">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent_28%),radial-gradient(circle_at_80%_20%,rgba(99,102,241,0.14),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.04),transparent_22%)]" />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />
            </div>

            {/* Hero Section */}
            <HeroSection />

            {/* Trust Bar - hidden for logged in users */}
            {!user && <TrustBar />}

            {/* Features - only shown when not logged in */}
            {!user && <FeaturesSection />}

            {/* Pricing - only shown when not logged in */}
            {!user && <PricingSection />}

            {/* Footer */}
            <Footer />
        </main>
    )
}
