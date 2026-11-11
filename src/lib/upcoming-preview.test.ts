import { describe, expect, it } from "vitest";
import { BOT_DEFAULTS, LAB_ROWS, RISK_COMPARE, selectSampleRows, scoreLabel } from "./upcoming-preview";
describe("PDF sample preview", () => {
  it("keeps the supplied highest-PnL wallet least predictable", () => {
    const rows = selectSampleRows(10000, "30d", "14d", "pnl", true);
    const first = rows[0];
    expect(first).toMatchObject({ wallet: "5LcA…tE3w", pnl: 88400, score: 21 });
    if (!first) throw new Error("The supplied sample row must exist");
    expect(scoreLabel(first.score)).toBe("Volatile");
  });
  it("sorts the supplied score 94 first by default", () => {
    expect(selectSampleRows(10000, "30d", "14d", "score", true)[0]).toMatchObject({ wallet: "7xKp…a9Qe", score: 94, gain: 18.4, hold: "4m 12s", trades: 37 });
    expect(LAB_ROWS).toHaveLength(6);
  });
  it("never fabricates an unprovided period or history", () => {
    expect(selectSampleRows(10000, "7d", "14d", "score", true)).toEqual([]);
    expect(selectSampleRows(10000, "30d", "7d", "score", true)).toEqual([]);
  });
  it("filters only known sample PnL", () => { expect(selectSampleRows(60000, "30d", "14d", "score", true).map(row => row.pnl)).toEqual([88400]); });
  it("preserves the two nearly equal profits and distinct supplied risk", () => { expect(RISK_COMPARE[0]).toEqual(["PnL (30d)", "+$48,210", "+$47,980", "+$88,400"]); expect(RISK_COMPARE[1]).toEqual(["Chance of losing > 20%", "6%", "27%", "44%"]); });
  it("starts with the requested 0.5 SOL amount and 1 SOL maximum", () => { expect(BOT_DEFAULTS.amount).toBe(.5); expect(BOT_DEFAULTS.maxTrade).toBe(1); });
  it("preserves the 2 SOL daily loss limit", () => { expect(BOT_DEFAULTS.dailyLoss).toBe(2); });
  it("preserves the 1500 ms maximum copy delay", () => { expect(BOT_DEFAULTS.maxDelay).toBe(1500); });
});