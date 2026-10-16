export const PREVIEW_INTERVAL_MS = 3000;
export function nextPreviewStage(stage: number) {
  return (stage + 1) % 3;
}