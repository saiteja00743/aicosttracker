import Navbar from "@/components/Navbar";
import HeroSection, { StatsSection } from "@/components/HeroSection";
import FeaturesGrid from "@/components/FeaturesGrid";
import AuditForm from "@/components/AuditForm";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <HeroSection />

      {/* Stats */}
      <StatsSection />

      {/* Features */}
      <FeaturesGrid />

      {/* Upsell / CTA Banner */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-12 py-8">
        <div className="glass-card gradient-border-emerald rounded-3xl p-12 relative overflow-hidden">
          {/* Ambient orbs */}
          <div className="absolute -top-16 -right-16 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 left-24 w-48 h-48 bg-secondary/8 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-primary text-[11px] font-semibold tracking-[0.08em] uppercase block mb-4">
                High Savings Identified
              </span>
              <h2 className="text-[36px] md:text-[44px] font-semibold tracking-[-0.02em] leading-[1.1] mb-6">
                Unlock Corporate Rate<br />Negotiation.
              </h2>
              <p className="text-on-surface-variant text-[16px] leading-relaxed mb-8 max-w-md">
                When your annual savings exceed $10K, you qualify for our{" "}
                <strong className="text-on-surface">Concierge Negotiation Service</strong>.
                We talk to vendors directly to secure bulk pricing not available to the public.
              </p>
              <Link
                href="#audit-form"
                className="inline-flex items-center gap-2 bg-primary text-on-primary px-8 py-4 rounded-xl font-bold text-[16px] hover:scale-[1.03] active:scale-[0.98] transition-all shadow-[0_0_24px_rgba(78,222,163,0.35)] hover:shadow-[0_0_40px_rgba(78,222,163,0.5)]"
              >
                Schedule Credex Consultation
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            {/* Decorative ring */}
            <div className="flex justify-center">
              <div className="relative w-72 h-72">
                <div className="absolute inset-0 rounded-full border-2 border-primary/15 animate-pulse" />
                <div className="absolute inset-6 rounded-full border border-primary/10" />
                <div className="absolute inset-12 rounded-full bg-gradient-to-tr from-primary/10 to-secondary/10 backdrop-blur-sm flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-primary font-mono text-[32px] font-bold">32%</p>
                    <p className="text-on-surface-variant text-[12px] mt-1">Avg. Reduction</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Audit Form */}
      <AuditForm />

      {/* FAQ */}
      <FAQ />

      <Footer />
    </main>
  );
}
