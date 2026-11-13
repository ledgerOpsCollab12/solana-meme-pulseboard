/** The product stays still for reading before the scroll-led handoff. */
export function getProductFocus(progress: number) {
  const value = Math.min(1, Math.max(0, (progress - 0.55) / 0.13));
  const focus = value * value * (3 - 2 * value);
  return { focus, ready: focus >= 0.99 };
}