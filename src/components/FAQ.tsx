"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface FAQItem {
  q: string;
  a: string;
}

const faqs: FAQItem[] = [
  {
    q: "How does the AI audit process work?",
    a: "Our AI engine ingests your self-reported spend and seat data, then cross-references it against 10,000+ benchmarked enterprise environments to surface idle-seat waste, tier-plan mismatches, and redundant license overlap. You get a ranked list of actionable optimizations within seconds.",
  },
  {
    q: "Is my procurement data secure?",
    a: "Absolutely. We are SOC-2 Type II certified. All data is encrypted at rest (AES-256) and in transit (TLS 1.3). We never share your spending data with AI vendors, third parties, or use it to train our models. Your report is ephemeral — deleted after 90 days.",
  },
  {
    q: "What AI tools do you support?",
    a: "We currently support 200+ AI platforms including OpenAI (ChatGPT), Anthropic (Claude), Google (Gemini), Midjourney, Perplexity, Jasper, GitHub Copilot, AWS Bedrock, Azure OpenAI Service, and custom API deployments.",
  },
  {
    q: "Is there a cost for the audit?",
    a: "The intelligence audit is completely free. We surface your optimization opportunity at no cost. If you qualify for our Concierge Negotiation Service (annual savings > ₹8,40,000), we work on a performance-based fee — you only pay when we save you money.",
  },
  {
    q: "How accurate are the savings projections?",
    a: "Our benchmarks draw from 10,000+ enterprise environments. Historical audit customers have realized between 18% and 38% cost reduction. The median projected savings on our platform outperform by 12% compared to manual procurement reviews.",
  },
];

function FAQItem({ item, isOpen, onToggle }: { item: FAQItem; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="glass-card rounded-2xl border border-[#3c4a42]/15 overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full px-6 py-5 flex items-center justify-between text-left group hover:bg-[#1a211d]/60 transition-colors"
        aria-expanded={isOpen}
      >
        <span className="text-[15px] font-semibold text-on-surface pr-4">{item.q}</span>
        <div
          className={cn(
            "w-8 h-8 rounded-lg border flex items-center justify-center flex-shrink-0 transition-all duration-300",
            isOpen
              ? "border-primary/40 bg-primary/10 text-primary rotate-180"
              : "border-[#3c4a42]/40 text-on-surface-variant"
          )}
        >
          <ChevronDown className="w-4 h-4" />
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-6 text-[14px] text-on-surface-variant leading-relaxed">
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="max-w-[1440px] mx-auto px-6 md:px-12 py-[80px]">
      <div className="text-center mb-14">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[32px] font-semibold tracking-[-0.02em] mb-4"
        >
          Frequently Asked Questions
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-on-surface-variant max-w-lg mx-auto"
        >
          Everything you need to know about the AI Cost Tracker audit process.
        </motion.p>
      </div>

      <div className="max-w-3xl mx-auto space-y-3">
        {faqs.map((faq, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07 }}
          >
            <FAQItem
              item={faq}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
