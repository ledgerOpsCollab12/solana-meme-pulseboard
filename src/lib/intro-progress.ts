export function getIntroProgress(scroll: number, distance: number) {
  const progress = Math.min(1, Math.max(0, scroll / Math.max(1, distance)));
  const ease = (value: number) => value * value * (3 - 2 * value);
  const stage = (start: number, end: number) => ease(Math.min(1, Math.max(0, (progress - start) / (end - start))));
  return {
    progress,
    titleOpacity: 1 - stage(0.04, 0.5),
    titleBlur: stage(0.04, 0.5) * 18,
    productBlur: (1 - stage(0.18, 0.78)) * 12,
    shell: stage(0.12, 0.52),
    content: stage(0.22, 0.78),
    facts: stage(0.64, 0.95),
    cta: ease(progress),
  };
}