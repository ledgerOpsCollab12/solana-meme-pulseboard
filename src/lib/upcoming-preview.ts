export const LAB_ROWS = [
  { wallet: "7xKp…a9Qe", pnl: 48210, gain: 18.4, gainVar: .011, hold: "4m 12s", holdSeconds: 252, holdVar: .020, trades: 37, tradesVar: .031, score: 94 },
  { wallet: "3FpW…k2Lm", pnl: 31870, gain: 22.1, gainVar: .018, hold: "9m 40s", holdSeconds: 580, holdVar: .027, trades: 21, tradesVar: .035, score: 91 },
  { wallet: "9qTe…Rz71", pnl: 27455, gain: 15.6, gainVar: .024, hold: "2m 05s", holdSeconds: 125, holdVar: .041, trades: 64, tradesVar: .038, score: 86 },
  { wallet: "Bv4N…c8Ds", pnl: 56930, gain: 41.3, gainVar: .072, hold: "18m 30s", holdSeconds: 1110, holdVar: .088, trades: 9, tradesVar: .066, score: 63 },
  { wallet: "Hm2Y…pX0a", pnl: 19120, gain: 12.9, gainVar: .069, hold: "1m 47s", holdSeconds: 107, holdVar: .094, trades: 112, tradesVar: .081, score: 58 },
  { wallet: "5LcA…tE3w", pnl: 88400, gain: 96.7, gainVar: .214, hold: "47m 15s", holdSeconds: 2835, holdVar: .190, trades: 3, tradesVar: .155, score: 21 },
] as const;
export type LabRow = (typeof LAB_ROWS)[number];
export type SortKey = "pnl" | "gain" | "gainVar" | "holdSeconds" | "holdVar" | "trades" | "tradesVar" | "score" | "wallet";
export function selectSampleRows(minPnl: number, period: string, history: string, key: SortKey, descending: boolean) {
  if (period !== "30d" || history !== "14d") return [];
  return LAB_ROWS.filter(row => row.pnl >= minPnl).sort((a, b) => {
    const result = typeof a[key] === "string" ? String(a[key]).localeCompare(String(b[key])) : Number(a[key]) - Number(b[key]);
    return descending ? -result : result;
  });
}
export function scoreLabel(score: number) {
  if (score >= 90) return "Ultra-predictable";
  if (score >= 80) return "Predictable";
  if (score >= 50) return "Moderate";
  return "Volatile";
}
export const BOT_DEFAULTS = { amount: .5, maxTrade: 1, takeProfit: 40, stopLoss: -15, trailing: 10, maxPositions: 3, liquidity: 20000, marketCap: 50000, tokenAge: 24, dailyLoss: 2, maxDelay: 1500, slippage: 10 } as const;
export const RISK_COMPARE = [
  ["PnL (30d)", "+$48,210", "+$47,980", "+$88,400"],
  ["Chance of losing > 20%", "6%", "27%", "44%"],
  ["Chance of 3 losses in a row", "3%", "14%", "22%"],
  ["Worst 5% of trades", "≤ -38%", "≤ -71%", "≤ -93%"],
  ["Fast exits (< 60s)", "41%", "12%", "68%"],
  ["Overall risk", "Low", "Medium", "High"],
] as const;