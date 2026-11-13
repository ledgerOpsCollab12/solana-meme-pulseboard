import { getIntroProgress } from "./intro-progress";

/** Preserve the furthest presentation reached until this component unmounts. */
export function getForwardIntroProgress(scroll: number, distance: number, previous = 0) {
  const next = getIntroProgress(scroll, distance);
  return getIntroProgress(Math.max(previous, next.progress) * Math.max(1, distance), distance);
}