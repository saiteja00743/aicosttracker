import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CredexAI — AI Spend Audit & Optimization Platform",
  description:
    "Identify and eliminate AI tool waste. Credex audits your ChatGPT, Claude, Midjourney and 200+ AI subscriptions to uncover 18–38% in savings. Free intelligence report in seconds.",
  keywords: [
    "AI spend audit",
    "AI cost optimization",
    "SaaS spend management",
    "ChatGPT procurement",
    "AI tool ROI",
    "enterprise AI audit",
  ],
  openGraph: {
    title: "CredexAI — Stop Overpaying for AI Tools",
    description:
      "Free AI spend audit. Identify license waste, seat overlap, and tier mismatches across your entire AI stack.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-background text-on-surface antialiased">
        {children}
      </body>
    </html>
  );
}
