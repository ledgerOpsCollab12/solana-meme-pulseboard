import { describe, expect, it } from "vitest";
import { getBillboardStage } from "./billboard-progress";

describe("four scroll-led problem billboards", () => {
  it("shows each of the four cards in order as the page scrolls", () => {
    expect([0, 250, 500, 750, 1000].map(scroll => getBillboardStage(scroll, 1000))).toEqual([0, 1, 2, 3, 3]);
  });
  it("clamps reverse scroll and overscroll", () => {
    expect(getBillboardStage(-50, 1000)).toBe(0);
    expect(getBillboardStage(2000, 1000)).toBe(3);
  });
});