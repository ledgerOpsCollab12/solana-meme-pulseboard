import type { SimulationMetric, SimulationPeriod } from "./interactive-wallet-reference";
export type GuideStage = { id: string; duration: number; message: string; targets: readonly string[]; period?: SimulationPeriod; metric?: SimulationMetric; panel?: "wallet" | "alerts"; scroll?: "right" | "down"; finished?: boolean };
export const GUIDE_STAGES: readonly GuideStage[] = [
  { id: "coverage", duration: 6500, message: "We collect all transactions from active wallets trading memecoins — livestream from the Solana blockchain.", targets: ['[data-summary="1"]', '[data-summary="3"]'], period: "ALL", metric: "P&L" },
  { id: "explore", duration: 5000, message: "Tracker simulation: interact with the interface by selecting filters.", targets: ['[data-filter-group="metric"]', '[data-filter-group="period"]'] },
  { id: "quality", duration: 8500, message: "View the highest-PnL wallets and measure their quality with data such as win rate, ROI, capital invested, and much more.", targets: ['[data-metric-value="1"]'], scroll: "right" },
  { id: "timeframe", duration: 5500, message: "Filter by timeframe.", targets: ['[data-filter-group="period"]'] },
  { id: "hour", duration: 7000, message: "View the biggest earners in the last hour.", targets: ['[data-period="1H"]'], period: "1H", metric: "P&L", scroll: "down" },
  { id: "sort", duration: 5500, message: "Sort the biggest earners according to what you want to search for.", targets: ['[data-filter-group="metric"]'] },
  { id: "winrate", duration: 8500, message: "Want to explore consistency? Sort wallets by win rate.", targets: ['[data-metric="Win Rate"]'], period: "1H", metric: "Win Rate", scroll: "down" },
  { id: "score", duration: 10500, message: "Want to sort wallets by quality? We assign a score based on PnL, consistency, wallet type, and more.", targets: ['[data-metric="Score"]', '[data-metric="Trades"]'], period: "1H", metric: "Score", scroll: "down" },
  { id: "types", duration: 8000, message: "We also classify wallets by their activity so you can understand whether you can keep up with them.", targets: ['[data-classification="BOT_PROFITABLE"]', '[data-classification="PROFITABLE"]'], period: "ALL", metric: "P&L", scroll: "down" },
  { id: "wallet", duration: 6000, message: "Want real-time alerts for a specific wallet?", targets: ['[data-wallet="5gp2JS...ExjG"]'], period: "ALL", metric: "P&L" },
  { id: "detail", duration: 6500, message: "View the wallet’s history and add it to your tracker.", targets: ['[data-track-wallet]'], panel: "wallet" },
  { id: "track", duration: 4500, message: "Track this wallet and open wallet alerts.", targets: ['[data-notification-bell]'], panel: "wallet" },
  { id: "alerts", duration: 11000, message: "Get notifications with the token, time, and amount of each transaction.", targets: ['[data-alert-token]', '[data-alert-time]', '[data-alert-amount]'], panel: "alerts" },
  { id: "complete", duration: 0, message: "View the live tracker to see all functionalities and real-time data.", targets: [], finished: true },
];
export const GUIDED_TOUR_DURATION = GUIDE_STAGES.reduce((total, stage) => total + stage.duration, 0);
export function getGuidedTour(elapsed: number) {
  let start = 0;
  for (let index = 0; index < GUIDE_STAGES.length; index++) {
    const stage = GUIDE_STAGES[index];
    if (Math.max(0, elapsed) < start + stage.duration || stage.finished) return { stage, index, start, progress: Math.min(1, Math.max(0, elapsed) / GUIDED_TOUR_DURATION) };
    start += stage.duration;
  }
  return { stage: GUIDE_STAGES[GUIDE_STAGES.length - 1], index: GUIDE_STAGES.length - 1, start, progress: 1 };
}
export function nextGuidedStep(elapsed: number) {
  const current = getGuidedTour(elapsed);
  return current.stage.finished ? 0 : current.start + current.stage.duration;
}