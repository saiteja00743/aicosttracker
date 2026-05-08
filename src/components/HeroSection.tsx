"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, FileText, ShieldCheck, TrendingDown, Zap } from "lucide-react";
import CountUp from "./AnimatedCountUp";

// Animated hero audit preview card
function AuditPreviewCard() {
  const items = [
    { label: "ChatGPT Plus", detail: "42 Seats · Enterprise", saving: "$420.00", tag: "UNUSED SEATS" },
    { label: "Anthropic API", detail: "Usage-based Tier 3", saving: "$1,240.00", tag: "PEAK OPTIMIZATION" },
    { label: "Midjourney Pro", detail: "4 active / 18 licensed", saving: "$360.00", tag: "TIER MISMATCH" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 32, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full"
    >
      {/* Ambient glow behind card */}
      <div className="absolute -inset-6 bg-primary/8 blur-[80px] rounded-full pointer-events-none" />

      <div className="relative glass-card rounded-3xl p-6 lg:p-8 gradient-border-emerald shadow-[0_32px_80px_rgba(0,0,0,0.6)]">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.08em] uppercase text-on-surface-variant mb-2">
              Total Potential Savings
            </p>
            <p className="text-primary font-mono text-[36px] xl:text-[44px] font-bold tracking-tight leading-none">
              $12,480<span className="text-[20px] xl:text-[28px]">.00</span>
            </p>
          </div>
          <span className="shrink-0 mt-1 sm:mt-0 bg-primary/10 text-primary px-3 py-1.5 rounded-full text-[11px] font-bold tracking-[0.06em] whitespace-nowrap">
            24% WASTE DETECTED
          </span>
        </div>

        {/* Tool rows */}
        <div className="space-y-3 mb-6">
          {items.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + i * 0.12, duration: 0.4 }}
              className="flex items-center justify-between p-4 bg-surface-container rounded-xl border border-[#3c4a42]/15 gap-4"
            >
              <div className="flex items-center gap-3 shrink-0 sm:shrink">
                <div className="w-9 h-9 rounded-lg bg-surface-container-high border border-[#3c4a42]/30 flex items-center justify-center font-bold text-[13px] text-on-surface shrink-0">
                  {item.label[0]}
                </div>
                <div className="hidden sm:block">
                  <p className="text-[14px] font-semibold text-on-surface truncate">{item.label}</p>
                  <p className="text-[12px] text-on-surface-variant truncate">{item.detail}</p>
                </div>
              </div>
              <div className="text-right shrink-0">
                <p className="text-primary font-mono text-[14px] font-semibold">-{item.saving}</p>
                <p className="text-[10px] text-primary/60 font-bold tracking-[0.06em] truncate">{item.tag}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Progress bar */}
        <div>
          <div className="h-1.5 w-full bg-surface-container-low rounded-full overflow-hidden mb-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "68%" }}
              transition={{ delay: 1.1, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="h-full bg-gradient-to-r from-primary to-[#6ffbbe] rounded-full shadow-[0_0_8px_rgba(78,222,163,0.5)]"
            />
          </div>
          <p className="text-[12px] text-on-surface-variant text-center">
            68% of audit completed · Scanning license utilization…
          </p>
        </div>
      </div>
    </motion.div>
  );
}

const trustBadges = [
  { icon: ShieldCheck, label: "SOC-2 Type II" },
  { icon: Zap, label: "Instant Results" },
  { icon: TrendingDown, label: "32% Avg. Savings" },
];

export default function HeroSection() {
  return (
    <section className="max-w-[1440px] mx-auto px-6 md:px-12 pt-32 pb-20 grid lg:grid-cols-2 gap-12 xl:gap-16 items-center">
      {/* Left — copy */}
      <div className="space-y-8 min-w-0">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[11px] font-semibold tracking-[0.08em] uppercase"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          NEW: AI Procurement Optimization
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-[36px] md:text-[44px] xl:text-[56px] font-semibold tracking-[-0.02em] leading-[1.08] text-balance"
        >
          Stop Overpaying<br />
          for{" "}
          <span className="text-primary relative inline-block">
            AI Tools
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.8, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-primary to-transparent origin-left"
            />
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-on-surface-variant text-[16px] xl:text-[18px] leading-relaxed max-w-lg text-balance"
        >
          C-suite procurement leaders use Credex to audit enterprise spend on
          ChatGPT, Claude, Midjourney, and 200+ AI providers.{" "}
          <strong className="text-on-surface font-medium">Reduce waste by 32% on average.</strong>
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap gap-4"
        >
          <Link
            href="#audit-form"
            className="bg-primary text-on-primary px-7 py-3.5 rounded-xl text-[15px] font-bold flex items-center gap-2 hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 shadow-[0_0_24px_rgba(78,222,163,0.35)] hover:shadow-[0_0_40px_rgba(78,222,163,0.5)]"
          >
            Run Free Audit
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/dashboard"
            className="glass-card px-7 py-3.5 rounded-xl text-[15px] font-medium flex items-center gap-2 border border-[#3c4a42]/30 hover:border-primary/30 hover:bg-primary/5 transition-all duration-200"
          >
            <FileText className="w-4 h-4 text-on-surface-variant" />
            See Example Report
          </Link>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex items-center gap-4 xl:gap-6 flex-wrap pt-2"
        >
          {trustBadges.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2 text-on-surface-variant text-[12px] xl:text-[13px] whitespace-nowrap">
              <Icon className="w-4 h-4 text-primary shrink-0" />
              {label}
            </div>
          ))}
        </motion.div>

        {/* Trusted by */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex items-center gap-4 xl:gap-5 opacity-50 hover:opacity-80 transition-opacity duration-500 overflow-hidden"
        >
          <span className="text-[11px] font-semibold tracking-[0.1em] uppercase text-on-surface-variant shrink-0">
            Trusted by
          </span>
          <div className="w-px h-4 bg-[#3c4a42] shrink-0" />
          {["FINCORP", "TECHLY", "QUANTUM", "NEXUS"].map((name) => (
            <span key={name} className="text-[14px] xl:text-[15px] font-bold tracking-tight text-on-surface shrink-0">
              {name}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Right — preview card */}
      <div className="relative min-w-0 w-full mt-12 lg:mt-0">
        <AuditPreviewCard />
      </div>
    </section>
  );
}

// Stats section
export function StatsSection() {
  const stats = [
    { value: 32, suffix: "%", label: "Average cost reduction", color: "text-primary" },
    { value: 200, suffix: "+", label: "AI tools supported", color: "text-secondary" },
    { value: 10000, suffix: "+", label: "Environments benchmarked", color: "text-primary" },
    { value: 4.2, suffix: "M", label: "In savings identified", prefix: "$", color: "text-secondary" },
  ];

  return (
    <section className="border-y border-[#3c4a42]/15 bg-surface-container-low/60 py-16">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="text-center"
          >
            <p className={`text-[36px] md:text-[44px] font-bold font-mono tracking-tight ${stat.color}`}>
              <CountUp
                end={stat.value}
                prefix={stat.prefix}
                suffix={stat.suffix}
                decimals={stat.value % 1 !== 0 ? 1 : 0}
                duration={2}
              />
            </p>
            <p className="text-on-surface-variant text-[13px] mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
