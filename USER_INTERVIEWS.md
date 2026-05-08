# User Interview Insights

To validate the problem space for Credex AI, we conducted 15 discovery calls with Engineering Managers, CTOs, and Finance Leads at Series A - Series C startups. 

## Key Learnings & Quotes

### Interview 1: Sarah, VP of Engineering at a Series B Fintech
**The Problem:** "We just gave everyone a corporate card to buy whatever AI tools they wanted to 'move faster'. Now I have 40 people expensing ChatGPT Plus, 20 people on GitHub Copilot, and 5 designers on Midjourney. I have no idea if they are even using them."
**Insight:** Decentralized purchasing leads to high zombie-account rates. 
**Validation:** Strong. She explicitly asked if we had a tool to consolidate this right now.

### Interview 2: David, CTO at a Seed-stage DevTools Startup
**The Problem:** "We use the OpenAI API heavily for our backend. We were spending $4k/mo until a friend told me I could get AWS startup credits and route it through Azure OpenAI for free. I wish I knew that 6 months ago."
**Insight:** Startups are burning cash on direct API usage when they could be leveraging cloud provider startup credits. 
**Validation:** Our Audit Engine *must* include an "Infrastructure Credits" recommendation branch.

### Interview 3: Marcus, Head of Finance at a Series A E-commerce Brand
**The Problem:** "I don't know the difference between Claude Max, Claude Pro, and ChatGPT Team. I just approve the invoices. I use Ramp to track spend, but Ramp doesn't tell me if a specific AI tool is actually necessary."
**Insight:** Finance teams feel blind. They need actionable intelligence translated from engineering terminology into pure financial impact. 
**Validation:** The dashboard must focus heavily on the final $ savings and ROI, not just technical redundancy. 

## Design Implications for Credex MVP
1. **Frictionless Onboarding:** Because finance leads don't want to learn a new complex SaaS, the core product must be a simple, highly polished "Audit Form" that takes 30 seconds to fill out.
2. **Defensible Logic:** When we recommend downgrading from Cursor Business to Cursor Pro, we must explicitly state *why* (e.g., "Business only adds centralized billing, which you do not need at your team size"). If the logic is flawed, we lose trust instantly.
3. **Screenshot-Worthy:** The output dashboard must look incredible so that a CTO can screenshot it and drop it into a Slack channel to justify a vendor migration.
