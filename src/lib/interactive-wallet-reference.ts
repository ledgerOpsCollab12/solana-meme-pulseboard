// Literal November 8 recording snapshots. Missing/off-screen values stay null.
// This is a partial verified transcription, NOT a complete market leaderboard.
export const SIMULATION_PERIODS = ["1H", "6H", "24H", "7D", "1M", "ALL"] as const;
export const SIMULATION_METRICS = ["P&L", "Win Rate", "ROI %", "Score", "Trades", "Invested", "Best Trade"] as const;
export type SimulationPeriod = typeof SIMULATION_PERIODS[number];
export type SimulationMetric = typeof SIMULATION_METRICS[number];
export type RecordedWallet = { wallet: string; classification: string; values: readonly (string | null)[] };
export type RecordedSnapshot = { period: SimulationPeriod; metric: SimulationMetric; source: "filters" | "tracker"; seconds: readonly number[]; rows: readonly RecordedWallet[] };
export const SIMULATION_ROW_LIMIT = 30;
export const SIMULATION_SUMMARY = [
  { label: "TOTAL TOKENS", value: "135,058" },
  { label: "ACTIVE WALLETS", value: "10,722" },
  { label: "TXNS / 24H", value: "2,596,246" },
  { label: "CLASSIFIED TRADERS", value: "10,722", detail: "2.1K Humans · 6.5K Bots" },
] as const;
const row = (wallet: string, classification: string, values: readonly (string | null)[]): RecordedWallet => ({ wallet, classification, values });
const first = row("5gp2JS...ExjG", "BOT_PROFITABLE", ["+50196.3 SOL", "0.5%", "+118.9%", "40", "111,893", "42228.6 SOL", "+133844.6", "+444.52", "-12.37", "1556", "18d"]);
const hg = row("Hgzeyu...wky7", "BOT_PROFITABLE", ["+21049.9 SOL", "2.5%", "+135.4%", "40", "35,948", "15543.9 SOL", "+62363.2", "+463.72", "-53.97", "787", "18d"]);
const k3 = row("5K3N1v...iTUT", "BOT_PROFITABLE", ["+20191.2 SOL", "28.1%", "+545.6%", "64", "4,911", "3700.7 SOL", "+23943.0", "+66.73", "-42.28", "91", "5h"]);
const ah = row("AHcTvK...v3K3", "BOT_PROFITABLE", ["+12224.3 SOL", "31.4%", "+291.0%", "44", "9,368", "4201.1 SOL", "+26483.7", "+607.33", "-54.09", "132", "18d"]);
const c2 = row("C2vVrg...f8HF", "PROFITABLE", ["+6452.7 SOL", "25.0%", "+198823.5%", "73", "536", "3.25 SOL", "+6864.3", "+235.64", "0.00", "69", "8m"]);
const fze = row("29yFze...kbw8", "BOT_PROFITABLE", ["+1637.3 SOL", "30.2%", "+86.3%", "64", "4,819", "1897.5 SOL", "+4631.5", "+6.84", "-0.8560", "1138", "9m"]);
const g5 = row("g5HcBN...kDaG", "BOT_PROFITABLE", ["+834.81 SOL", "33.3%", "+538.1%", "57", "40,710", "155.14 SOL", "+1307.1", "+36.66", "0.00", "2126", "8m"]);
const roi2 = row("HckQ93...Zg9t", "BOT_PROFITABLE", ["+62.55 SOL", "2.3%", "+4673.1%", "39", "3,928", "1.34 SOL", "+106.06", "+8.58", "-2.21", "378", "6m"]);
const allRows = [first, hg, k3, ah, c2];
const shortRows = [k3, c2, fze, g5];
export const RECORDED_SNAPSHOTS: readonly RecordedSnapshot[] = [
  { period: "ALL", metric: "P&L", source: "filters", seconds: [0, 18], rows: allRows },
  { period: "1M", metric: "P&L", source: "filters", seconds: [21, 18], rows: allRows.slice(0, 4) },
  { period: "7D", metric: "P&L", source: "filters", seconds: [36, 84], rows: shortRows },
  { period: "24H", metric: "P&L", source: "filters", seconds: [54, 84], rows: shortRows },
  { period: "6H", metric: "P&L", source: "filters", seconds: [72, 84], rows: shortRows },
  { period: "1H", metric: "P&L", source: "filters", seconds: [85.5, 84], rows: [c2, fze, g5,
    row("kEFiAX...8XDf", "LOSING", ["+604.64 SOL", "39.9%", "+1.1%", "31", "69,712", "54805.7 SOL", "+51579.6", "+7.66", "-12.52", null, null]),
    row("HpzVbf...w9TU", "LOSING", ["+521.70 SOL", "45.0%", "+1.0%", "31", "42,797", "53625.7 SOL", "+52857.0", "+6.21", "-38.52", null, null])
  ] },
  { period: "1H", metric: "Win Rate", source: "tracker", seconds: [0, 3], rows: [
    row("4zshSJ...eRrc", "LOSING", ["+1.18 SOL", "100.0%", "+0.1%", "30", "1,929", "963.29 SOL", "+937.96", "+3.27", "-6.89", null, null]),
    row("F4pqD5...kGZt", "LOSING", ["+10.26 SOL", "100.0%", "+0.1%", "50", "2,872", "15061.1 SOL", "+72.87", "+0.1531", "-0.0099", null, null]),
    row("CwbSSo...3mFm", "LOSING", ["+285.02 SOL", "100.0%", "+1.7%", "40", "14,948", "16615.4 SOL", "+16113.7", "+4.94", "-24.37", null, null]),
    row("4HUh1w...9t56", "LOSING", ["+2.19 SOL", "100.0%", "+1.9%", "30", "1,286", "112.12 SOL", "+72.65", "+0.0669", "-0.0096", null, null])
  ] },
  { period: "1H", metric: "ROI %", source: "tracker", seconds: [22, 35], rows: [c2, roi2, g5,
    row("D8pBNr...fujZ", "PROFITABLE", ["+18.14 SOL", "0.0%", "+359.9%", "49", "221", "5.04 SOL", "+29.16", "+9.98", "-0.0321", "86", "11m"])
  ] },
  { period: "1H", metric: "Score", source: "tracker", seconds: [38, 50], rows: [c2,
    row("6M8veU...wp7F", "ELITE", ["-23.77 SOL", "11.1%", "-71.3%", "72", "111", "33.32 SOL", "+89.06", "+0.1366", "-10.41", "41", "47m"]),
    row("4QQdiT...wwj9", "ELITE", ["-242.94 SOL", "0.0%", "-10224696.2%", "71", "205", "0.0024 SOL", "+103.21", "0.00", "-150.34", "40", "40m"]),
    row("DAEdBm...CvHC", "ELITE", ["-40.58 SOL", "0.0%", "-16.8%", "71", "88", "241.92 SOL", "+303.60", "+2.85", null, null, null]),
    row("JDQKDr...rSrT", "PROFITABLE", ["-0.3303 SOL", "0.6%", "-3.2%", "70", "543", "10.41 SOL", "+1141.8", "+0.0377", null, null, null])
  ] },
  { period: "1H", metric: "Invested", source: "tracker", seconds: [60, 70], rows: [
    row("FK9iqW...pTuJ", "LOSING", ["+60.10 SOL", "0.0%", "+0.0%", "25", "68,665", "382367.7 SOL", "+298.53", "+0.1733", "-0.0731", "561", null]),
    row("G5UWaT...Sw2N", "LOSING", ["+58.51 SOL", "0.0%", "+0.0%", "25", "68,780", "382252.7 SOL", "+289.73", "+0.1766", "-0.0687", "569", null]),
    row("CemXe3...sSgg", "LOSING", ["+56.96 SOL", "0.0%", "+0.0%", "25", "68,704", "382032.1 SOL", "+288.12", "+0.1656", "-0.0794", "564", null])
  ] },
];
export function getRecordedSnapshot(period: SimulationPeriod, metric: SimulationMetric) {
  const snapshot = RECORDED_SNAPSHOTS.find(item => item.period === period && item.metric === metric);
  return snapshot ? { ...snapshot, rows: snapshot.rows.slice(0, SIMULATION_ROW_LIMIT) } : undefined;
}
export const GUIDED_WALLET_ADDRESS = "5gp2JSboozZwqx1RA1S4she7vAvBaj4mpcoADDDEExjG";
export const RECORDED_ALERTS = [
  { token: "Cr5vaJ...DG2QHy", amount: "18,742.988221", time: "10:07:08 p.m.", side: "SELL" },
  { token: "9PfytN...y794DP", amount: "30,223.765636", time: "10:07:08 p.m.", side: "SELL" },
  { token: "Dugyq1...ehFKLS", amount: "24,377.341046", time: "10:07:08 p.m.", side: "SELL" },
  { token: "8C8x1d...yzr2tV", amount: "20,824.096083", time: "10:06:34 p.m.", side: "SELL" },
  { token: "9dHSU7...JWA11i", amount: "28,652.628263", time: "10:06:34 p.m.", side: "SELL" },
  { token: "EdQgcv...P8mBiv", amount: "40,972.555458", time: "10:06:33 p.m.", side: "SELL" },
] as const;
export const RECORDED_HISTORY = ["0.010567", "0.009053", "0.007539", "0.009053", "0.009048"] as const;