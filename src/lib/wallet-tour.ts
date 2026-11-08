import { REFERENCE_COLUMNS } from "./wallet-reference";

export const COVERAGE_MS = 6000;
export const LEADERBOARD_MS = 8000;
export const METRIC_MS = 3000;
export const TOUR_DURATION_MS = COVERAGE_MS + LEADERBOARD_MS + REFERENCE_COLUMNS.length * METRIC_MS;
export function getWalletTour(elapsed: number) {
  const time = Math.max(0, elapsed) % TOUR_DURATION_MS;
  if (time < COVERAGE_MS) return { stage: "coverage" as const, column: -1, row: 0 };
  if (time < COVERAGE_MS + LEADERBOARD_MS) return { stage: "leaderboard" as const, column: -1, row: 0 };
  return { stage: "metrics" as const, column: Math.floor((time - COVERAGE_MS - LEADERBOARD_MS) / METRIC_MS), row: 0 };
}
export function nextWalletTourStep(elapsed: number) {
  const state = getWalletTour(elapsed);
  if (state.stage === "coverage") return COVERAGE_MS;
  if (state.stage === "leaderboard") return COVERAGE_MS + LEADERBOARD_MS;
  return (COVERAGE_MS + LEADERBOARD_MS + (state.column + 1) * METRIC_MS) % TOUR_DURATION_MS;
}