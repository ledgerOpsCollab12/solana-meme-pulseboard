export const WALLET_TOOLS = [
  { n: "01", label: "Quality filters", lines: ["Filter for", "consistency.", "Not just profit."] },
  { n: "02", label: "Bot & human behavior", lines: ["Know if you’re", "following a", "bot or human."] },
  { n: "03", label: "Real-time alerts", lines: ["See your", "tracked wallets", "move. Live."] },
  { n: "04", label: "Token understanding", lines: ["Find tokens", "profitable", "wallets hold."] },
] as const;

/** The opening and four tools share a stage; API remains outside the journey. */
export function getToolJourneyPhase(scroll: number, distance: number) {
  const progress = Math.max(0, Math.min(1, scroll / Math.max(1, distance)));
  return Math.min(4, Math.floor(progress * 5));
}

export function getToolPhaseOffset(phase: number, distance: number) {
  return Math.max(0, Math.min(4, phase)) / 5 * Math.max(1, distance) + 1;
}