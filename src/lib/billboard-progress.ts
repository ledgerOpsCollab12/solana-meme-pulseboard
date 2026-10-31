export function getBillboardStage(scroll: number, distance: number, count = 4) {
  const progress = Math.min(1, Math.max(0, scroll / Math.max(1, distance)));
  return Math.min(count - 1, Math.floor(progress * count));
}