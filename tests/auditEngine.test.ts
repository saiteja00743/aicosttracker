import { describe, it, expect } from "vitest";
import { runAuditEngine, ToolEntry } from "../src/lib/auditEngine";

// ─── Helpers ─────────────────────────────────────────────────────────────────
function tool(
  provider: string,
  plan: string,
  monthlySpend: string,
  seats: string,
  useCase = "General Purpose"
): ToolEntry {
  return { id: crypto.randomUUID(), provider, plan, monthlySpend, seats, useCase };
}

// ─── Test Suite ───────────────────────────────────────────────────────────────
describe("runAuditEngine", () => {
  // 1 ─ Baseline math
  it("correctly sums totalCurrentSpend across all tools", () => {
    const result = runAuditEngine(
      [tool("ChatGPT", "Team", "42000", "10"), tool("Midjourney", "Basic", "2520", "1")],
      "11–50"
    );
    expect(result.totalCurrentSpend).toBe(44520);
  });

  // 2 ─ Annual savings = 12x monthly
  it("calculates totalAnnualSavings as 12x totalMonthlySavings", () => {
    const result = runAuditEngine(
      [tool("GitHub Copilot", "Enterprise", "32760", "10")], // ₹3,276/seat → downgrade to ₹1,596 saves ₹16,800
      "11–50"
    );
    expect(result.totalAnnualSavings).toBe(result.totalMonthlySavings * 12);
  });

  // 3 ─ ChatGPT Team plan optimization (switch to Pro)
  it("flags ChatGPT Team for small teams when seats < 3", () => {
    // 2 seats, ₹5,040/mo → should trigger optimize action
    const result = runAuditEngine(
      [tool("ChatGPT", "Team", "5040", "2")],
      "1–10"
    );
    const rec = result.toolResults[0].recommendation;
    expect(rec.type).toBe("downgrade");
    expect(rec.savings).toBeGreaterThan(0);
  });

  // 4 ─ Cursor + Copilot overlap triggers consolidation
  it("detects redundancy when Cursor and GitHub Copilot are both in the stack", () => {
    const result = runAuditEngine(
      [
        tool("Cursor", "Pro", "3360", "2"),
        tool("GitHub Copilot", "Business", "3192", "2"),
      ],
      "1–10"
    );
    const cursorRec = result.toolResults.find(
      (r) => r.tool.provider === "Cursor"
    )!.recommendation;
    expect(cursorRec.type).toBe("consolidation");
  });

  // 5 ─ ChatGPT + Claude overlap triggers LLM redundancy consolidation
  it("flags LLM redundancy when both ChatGPT and Claude are used", () => {
    const result = runAuditEngine(
      [
        tool("ChatGPT", "Plus", "3360", "2"),
        tool("Claude", "Pro", "5040", "3"),
      ],
      "1–10"
    );
    const claudeRec = result.toolResults.find(
      (r) => r.tool.provider === "Claude"
    )!.recommendation;
    expect(claudeRec.type).toBe("consolidation");
  });

  // 6 ─ Optimal stack produces zero savings
  it("returns optimal recommendation with zero savings for a well-priced stack", () => {
    // ChatGPT Plus at exactly ₹1,680/seat = optimal
    const result = runAuditEngine(
      [tool("ChatGPT", "Plus", "1680", "1")],
      "1–10"
    );
    const rec = result.toolResults[0].recommendation;
    expect(rec.type).toBe("optimal");
    expect(rec.savings).toBe(0);
  });

  // 7 ─ Copilot Enterprise triggers downgrade to Business
  it("recommends downgrading GitHub Copilot Enterprise to Business", () => {
    // 10 seats at ₹3,276/seat = ₹32,760/mo → should downgrade to ₹1,596 saves ₹16,800
    const result = runAuditEngine(
      [tool("GitHub Copilot", "Enterprise", "32760", "10")],
      "11–50"
    );
    const rec = result.toolResults[0].recommendation;
    expect(rec.type).toBe("downgrade");
    expect(rec.savings).toBe(16800); // (3276 - 1596) * 10
  });

  // 8 ─ High API spend triggers credits recommendation
  it("recommends infrastructure credits for OpenAI API spend over ₹42,000", () => {
    const result = runAuditEngine(
      [tool("ChatGPT", "API Direct", "84000", "1")],
      "51–250"
    );
    const rec = result.toolResults[0].recommendation;
    expect(rec.type).toBe("credits");
    expect(rec.savings).toBeGreaterThan(0);
  });

  // 9 ─ Empty tools array returns zero spend
  it("handles empty tools array gracefully", () => {
    const result = runAuditEngine([], "1–10");
    expect(result.totalCurrentSpend).toBe(0);
    expect(result.totalMonthlySavings).toBe(0);
    expect(result.toolResults).toHaveLength(0);
  });

  // 10 ─ Midjourney Pro triggers downgrade to Standard
  it("recommends downgrading Midjourney Pro to Standard for single-user", () => {
    const result = runAuditEngine(
      [tool("Midjourney", "Pro", "5040", "1", "Marketing / Creative")],
      "1–10"
    );
    const rec = result.toolResults[0].recommendation;
    expect(rec.type).toBe("downgrade");
    expect(rec.savings).toBe(2520); // 5040 - 2520
  });
});

