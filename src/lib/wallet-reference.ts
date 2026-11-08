// Transcribed from the October 30 6:37:25 original recording (0s, 6s, 9s, 36s).
// Only the six fully verifiable rows are reproduced; no synthetic rows or live data.
export const REFERENCE_SUMMARY = [
  { label: "TOTAL TOKENS", value: "99,318" },
  { label: "ACTIVE WALLETS", value: "9,426" },
  { label: "TXNS / 24H", value: "323,625" },
  { label: "CLASSIFIED TRADERS", value: "9,426", detail: "1.4K Humans · 6.3K Bots" },
] as const;

export const REFERENCE_COLUMNS = ["P&L (SOL)", "WIN RATE", "ROI %", "SCORE", "TRADES", "INVESTED", "REALIZED", "BEST TRADE", "WORST TRADE", "TOKENS", "LAST SEEN"] as const;
export const REFERENCE_ROWS = [
  { wallet: "5gp2JS...ExjG", values: ["+54750.1 SOL", "89.2%", "+213.0%", "40", "64,970", "25709.1 SOL", "+80459.2", "+442.71", "-116.72", "826", "9d"] },
  { wallet: "AHcTvK...v3K3", values: ["+22282.7 SOL", "90.7%", "+530.4%", "44", "9,368", "4201.1 SOL", "+26483.7", "+558.64", "-124.56", "132", "19d"] },
  { wallet: "5K3N1v...iTUT", values: ["+19425.9 SOL", "46.1%", "+842.5%", "54", "2,587", "2305.6 SOL", "+21731.6", "+8374.1", "-122.06", "27", "13h"] },
  { wallet: "Hgzeyu...wky7", values: ["+8626.3 SOL", "85.3%", "+323.2%", "40", "2,632", "2668.7 SOL", "+11294.9", "+446.28", "-70.14", "112", "9d"] },
  { wallet: "9DY29n...Pfgt", values: ["+6863.8 SOL", "100.0%", "+192.5%", "40", "14,331", "3565.2 SOL", "+10428.9", "+6863.8", "+6863.8", "1", "16d"] },
  { wallet: "rBAvAp...6spW", values: ["+5682.0 SOL", "83.3%", "+367.9%", "40", "4,371", "1544.6 SOL", "+7226.7", "+520.09", "-43.70", "57", "25d"] },
] as const;