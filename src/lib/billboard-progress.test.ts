import { describe, expect, it } from "vitest";
import { getBillboardStage } from "./billboard-progress";

describe("four scroll-led problem billboards", () => {
  it("shows each of the four cards in order as the page scrolls", () => {
    expect([0, 334, 667, 1000, 1200].map(scroll => getBillboardStage(scroll, 1000))).toEqual([0, 1, 2, 3, 3]);
  });
  it("clamps reverse scroll and overscroll", () => {
    expect(getBillboardStage(-50, 1000)).toBe(0);
    expect(getBillboardStage(2000, 1000)).toBe(3);
  });
  it("releases on the fourth slide without a fifth scroll interval", () => {
    expect(getBillboardStage(999, 1000)).toBe(2);
    expect(getBillboardStage(1000, 1000)).toBe(3);
  });
});