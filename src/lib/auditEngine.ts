export interface ToolEntry {
  id: string;
  provider: string;
  monthlySpend: string;
  seats: string;
  useCase: string;
}

export interface Recommendation {
  action: string;
  savings: number;
  reasoning: string;
  type: "downgrade" | "consolidation" | "credits" | "optimal" | "switch";
}

export interface AuditResult {
  totalCurrentSpend: number;
  totalMonthlySavings: number;
  totalAnnualSavings: number;
  toolResults: {
    tool: ToolEntry;
    recommendation: Recommendation;
  }[];
}

export function runAuditEngine(tools: ToolEntry[], teamSize: string): AuditResult {
  let totalCurrentSpend = 0;
  let totalMonthlySavings = 0;
  
  const toolResults = tools.map((tool) => {
    const spend = parseFloat(tool.monthlySpend || "0");
    const seats = parseInt(tool.seats || "1", 10);
    totalCurrentSpend += spend;
    
    let recommendation: Recommendation = {
      action: "Keep Current Plan",
      savings: 0,
      reasoning: "Your current spending is perfectly optimized for this tool.",
      type: "optimal"
    };

    const costPerSeat = seats > 0 ? spend / seats : spend;

    if (tool.provider === "ChatGPT / OpenAI") {
      if (seats === 2 && spend >= 50) {
        recommendation = {
          action: "Downgrade to ChatGPT Plus (Shared/Individual)",
          savings: spend - 40,
          reasoning: "ChatGPT Team requires a minimum of 2 seats ($50/mo), but small teams often operate efficiently on 2 individual Plus accounts ($40/mo) without enterprise management features.",
          type: "downgrade"
        };
      } else if (costPerSeat > 25 && seats >= 2) {
        recommendation = {
          action: "Optimize Enterprise/API Spend",
          savings: spend - (25 * seats),
          reasoning: "You are paying a premium per seat. Moving to standard ChatGPT Team ($25/user) or auditing API overages could reduce waste.",
          type: "downgrade"
        };
      } else if (tool.useCase === "Software Engineering" && tools.some(t => t.provider === "Cursor" || t.provider === "GitHub Copilot")) {
        recommendation = {
          action: "Consolidate Dev Tools",
          savings: spend,
          reasoning: "You are paying for ChatGPT while also paying for a dedicated AI coding assistant (Cursor/Copilot) which already includes premium LLM access.",
          type: "consolidation"
        };
      } else if (spend > 500) {
        recommendation = {
          action: "Apply Startup Cloud Credits",
          savings: spend * 0.2, // Estimate 20% savings via credits/commit
          reasoning: "High API usage detected. We can help you secure OpenAI infrastructure credits through Azure or AWS startups programs.",
          type: "credits"
        };
      }
    } 
    else if (tool.provider === "Claude / Anthropic") {
      if (costPerSeat > 20 && seats < 5) {
        recommendation = {
          action: "Downgrade to Claude Pro",
          savings: spend - (20 * seats),
          reasoning: "Claude Team ($30/user) requires a minimum of 5 seats. Using individual Claude Pro accounts ($20/user) is more cost-effective for small teams.",
          type: "downgrade"
        };
      } else if (spend > 500) {
        recommendation = {
          action: "Apply Infrastructure Credits",
          savings: spend * 0.2,
          reasoning: "Anthropic API usage over $500/mo can often be offset by AWS Bedrock or GCP Vertex AI startup credits.",
          type: "credits"
        };
      }
    }
    else if (tool.provider === "Cursor") {
      if (costPerSeat >= 40) {
        recommendation = {
          action: "Downgrade to Cursor Pro",
          savings: spend - (20 * seats),
          reasoning: "Cursor Business ($40/user) adds centralized billing and privacy. Unless mandated by compliance, Cursor Pro ($20/user) offers the exact same AI capabilities.",
          type: "downgrade"
        };
      }
    }
    else if (tool.provider === "GitHub Copilot") {
      if (costPerSeat >= 39) {
        recommendation = {
          action: "Downgrade to Copilot Business",
          savings: spend - (19 * seats),
          reasoning: "Copilot Enterprise ($39/user) is rarely utilized fully by startups. Copilot Business ($19/user) is sufficient for 95% of engineering teams.",
          type: "downgrade"
        };
      } else if (costPerSeat >= 19 && seats <= 3) {
         recommendation = {
          action: "Downgrade to Copilot Individual",
          savings: spend - (10 * seats),
          reasoning: "For very small teams, Copilot Individual ($10/user) is half the price of Business and provides identical autocomplete features.",
          type: "downgrade"
        };
      }
    }
    else if (tool.provider === "Midjourney") {
      if (spend >= 60 && seats === 1) {
        recommendation = {
          action: "Downgrade to Standard Plan",
          savings: spend - 30,
          reasoning: "Midjourney Pro ($60/mo) is only necessary if you require stealth mode. The Standard plan ($30/mo) provides ample fast GPU hours for most marketing needs.",
          type: "downgrade"
        };
      }
    }
    else if (tool.provider === "Other / Custom API" && spend > 1000) {
      recommendation = {
        action: "Negotiate Custom Enterprise Tier",
        savings: spend * 0.15,
        reasoning: "Custom API spend exceeding $1k/mo qualifies for enterprise rate negotiation or bulk token commitments.",
        type: "credits"
      };
    }

    // Cross-platform Overlap check
    if (
      tool.provider === "Claude / Anthropic" &&
      tools.some(t => t.provider === "ChatGPT / OpenAI") && 
      recommendation.type === "optimal"
    ) {
        recommendation = {
          action: "Eliminate LLM Redundancy",
          savings: spend,
          reasoning: "Your team is paying for both ChatGPT and Claude. Standardizing on one platform is the #1 way startups reduce AI tool bloat.",
          type: "consolidation"
        };
    }

    totalMonthlySavings += recommendation.savings;

    return {
      tool,
      recommendation
    };
  });

  return {
    totalCurrentSpend,
    totalMonthlySavings,
    totalAnnualSavings: totalMonthlySavings * 12,
    toolResults,
  };
}
