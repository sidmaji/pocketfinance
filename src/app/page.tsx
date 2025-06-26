import CTASection from '@/components/landing/CTASection'
import DemoSection from '@/components/landing/DemoSection'
import FeaturesSection from '@/components/landing/FeaturesSection'
import Header from '@/components/landing/Header'
import HeroSection from '@/components/landing/HeroSection'
import PricingSection from '@/components/landing/PricingSection'
import HowItWorksSection from '@/components/landing/StatsSection'

export default function Home() {
    return (
        <div className="min-h-screen">
            <Header />
            <HeroSection />
            <FeaturesSection />
            <HowItWorksSection />
            <DemoSection />
            <PricingSection />
            <CTASection />
        </div>
    )
}
