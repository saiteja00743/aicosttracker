"use client";

import { motion } from "framer-motion";
import { Bot, BarChart3, GitMerge, BellRing, RefreshCw, Shield } from "lucide-react";

const features = [
  {
    icon: Bot,
    title: "AI-Powered Seat Analysis",
    description:
      "Our engine classifies active vs. zombie accounts, identifies role-based tier mismatches, and flags accounts idle for 90+ days.",
    color: "text-primary",
    bg: "bg-primary/10",
    border: "border-primary/15",
  },
  {
    icon: GitMerge,
    title: "Cross-Platform Overlap Detection",
    description:
      "Automatically surfaces redundant ChatGPT + Claude subscriptions for the same user — the #1 source of enterprise AI waste.",
    color: "text-secondary",
    bg: "bg-secondary/10",
    border: "border-secondary/15",
  },
  {
    icon: BarChart3,
    title: "Enterprise Benchmark Engine",
    description:
      "Compare your spend per seat against 10,000+ industry-matched organizations to quantify your optimization gap.",
    color: "text-primary",
    bg: "bg-primary/10",
    border: "border-primary/15",
  },
  {
    icon: BellRing,
    title: "Renewal Alerts",
    description:
      "Get notified 30, 14, and 7 days before contract renewals with a pre-negotiated opt-out recommendation.",
    color: "text-tertiary",
    bg: "bg-tertiary/10",
    border: "border-tertiary/15",
  },
  {
    icon: RefreshCw,
    title: "Continuous Monitoring",
    description:
      "Connect via API for real-time spend monitoring. Detect usage drift before it becomes a budget surprise.",
    color: "text-secondary",
    bg: "bg-secondary/10",
    border: "border-secondary/15",
  },
  {
    icon: Shield,
    title: "Redacted Stakeholder Reports",
    description:
      "Generate a sanitized, public-safe report link for CFO or board presentations without exposing sensitive vendor contracts.",
    color: "text-primary",
    bg: "bg-primary/10",
    border: "border-primary/15",
  },
];

export default function FeaturesGrid() {
  return (
    <section id="features" className="max-w-[1440px] mx-auto px-6 md:px-12 py-[80px]">
      <div className="text-center mb-16">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="inline-block text-[11px] font-semibold tracking-[0.08em] uppercase text-primary mb-4"
        >
          Platform Capabilities
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.05 }}
          className="text-[32px] md:text-[40px] font-semibold tracking-[-0.02em] mb-4"
        >
          Invisible Intelligence.<br />Visible Savings.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-on-surface-variant max-w-xl mx-auto text-[16px] leading-relaxed"
        >
          Every feature is engineered for one outcome: getting your capital out of idle SaaS
          licenses and into high-growth initiatives.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {features.map((feature, i) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4, transition: { duration: 0.25 } }}
              className={`glass-card-hover rounded-2xl p-7 border ${feature.border} cursor-default`}
            >
              <div className={`w-11 h-11 rounded-xl ${feature.bg} border ${feature.border} flex items-center justify-center mb-5`}>
                <Icon className={`w-5 h-5 ${feature.color}`} strokeWidth={2} />
              </div>
              <h3 className="text-[16px] font-semibold text-on-surface mb-3">
                {feature.title}
              </h3>
              <p className="text-[14px] text-on-surface-variant leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
