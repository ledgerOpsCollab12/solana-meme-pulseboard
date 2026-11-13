import { describe, expect, it } from "vitest";
import { getForwardIntroProgress } from "./forward-intro";

describe("forward-only opening presentation", () => {
  it("keeps the first opening unchanged", () => {
    expect(getForwardIntroProgress(0, 1000)).toMatchObject({ progress: 0, titleOpacity: 1, content: 0 });
  });
  it("does not reverse a partial reveal when scrolling upward", () => {
    const revealed = getForwardIntroProgress(400, 1000);
    expect(getForwardIntroProgress(200, 1000, revealed.progress)).toEqual(revealed);
  });
  it("keeps the video and expanded CTA fixed when returning to the top", () => {
    expect(getForwardIntroProgress(0, 1000, 1)).toMatchObject({ progress: 1, titleOpacity: 0, content: 1, cta: 1, productBlur: 0 });
  });
  it("continues revealing on a new downward scroll", () => {
    expect(getForwardIntroProgress(600, 1000, 0.6).progress).toBe(0.8);
  });
  it("shows the final view immediately on upward return, even from a partial reveal", () => {
    expect(getForwardIntroProgress(350, 1000, 0.6, 450)).toMatchObject({ progress: 1, titleOpacity: 0, content: 1, cta: 1 });
  });
  it("reserves the final quarter of the scroll for the fully revealed view", () => {
    expect([750, 850, 1000].map(scroll => getForwardIntroProgress(scroll, 1000).progress)).toEqual([1, 1, 1]);
  });
});