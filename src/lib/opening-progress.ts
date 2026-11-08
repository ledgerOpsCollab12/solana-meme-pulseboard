export const OPENING_TITLE = "Track the most profitable wallets in memecoin trading.";

export function getOpeningProgress(elapsed: number, reducedMotion = false) {
  const clamp = (value: number) => Math.min(1, Math.max(0, value));
  const raw = reducedMotion ? 1 : clamp((elapsed - 1550) / 1350);
  const settle = raw * raw * (3 - 2 * raw);
  return {
    letters: OPENING_TITLE.length,
    shift: 12 * (1 - settle),
    blur: reducedMotion || raw === 1 ? 0 : Math.sin(raw * Math.PI) * 5,
    scene: settle,
    done: reducedMotion || elapsed >= 2900,
  };
}