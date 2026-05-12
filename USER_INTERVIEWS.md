# User Interview Insights

To validate the problem space for Credex AI, I conducted discovery sessions with departmental leadership and faculty to understand how AI tool spending is managed in an academic and research environment.

## Key Learnings & Quotes

### Interview 1: Dr. Sravanakumari, Head of Department (HOD)
**The Problem:** "Each research lab and individual faculty member is currently requesting separate reimbursements for AI tools like ChatGPT Plus and Midjourney. As HOD, I see the total outflow, but I have no centralized way to know if we are over-provisioning seats or if we could benefit from an institutional 'Team' plan instead of 20 individual 'Pro' plans."
**Insight:** Institutional environments suffer from 'reimbursement fragmentation' where the total spend is high but visibility is low.
**Validation:** A centralized 'Departmental Audit' feature would save the HOD significant time in budget reconciliation.

### Interview 2: Mr. Ramesh, Lecturer & Lab Coordinator
**The Problem:** "In the coding labs, many students and staff are using tools like GitHub Copilot or Cursor. The main challenge is that we don't know who is actually using the advanced features and who just needs basic access. We are likely paying for 'Enterprise' features that our current research scope doesn't even touch."
**Insight:** Users often default to the most expensive tier because it's the most marketed, even if 80% of the features are redundant for their specific use case.
**Validation:** The 'Plan Mismatch' logic in Credex is highly relevant for lab environments trying to optimize grant funding.

### Interview 3: Varshini, Final Year Student & AI Researcher
**The Problem:** "As a student working on my final year project, I'm personally paying for ChatGPT Plus and a Midjourney subscription. It's a huge burden on my monthly budget. I often wonder if I'm overpaying or if there are student-specific 'Team' plans I could share with my project teammates to cut costs."
**Insight:** Individual students are a massive, price-sensitive demographic that lacks a 'group-buy' or consolidation mechanism for AI research tools.
**Validation:** The 'Benchmark Mode' and 'Consolidation' logic would help student project groups pooled their resources for a shared Pro plan instead of individual subscriptions.

## Design Implications for Credex MVP
1. **Simplified Documentation:** Academic environments value clear, printable reports (PDFs) that can be attached to budget meetings or grant reports.
2. **Deterministic Trust:** Since these audits are reviewed by academic boards, the logic must be 100% transparent and traceable to official vendor pricing URLs.
3. **Multi-User Visibility:** The need for a "Shareable Report" is high, as faculty must justify costs to the HOD for approval.
