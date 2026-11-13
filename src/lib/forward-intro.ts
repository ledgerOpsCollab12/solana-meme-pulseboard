import { getIntroProgress } from "./intro-progress";

/** Finish the reveal before the sticky release; upward return shows the final view immediately. */
export function getForwardIntroProgress(scroll: number, distance: number, previous = 0, previousScroll = scroll) {
  const safeDistance = Math.max(1, distance);
  const next = getIntroProgress(scroll, safeDistance * 0.75);
  const returning = scroll < previousScroll - 1 && previous > 0;
  return getIntroProgress((returning ? 1 : Math.max(previous, next.progress)) * safeDistance, safeDistance);
}