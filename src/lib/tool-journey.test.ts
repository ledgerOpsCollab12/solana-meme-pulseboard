import { describe, expect, it } from "vitest";
import { getToolJourneyPhase, getToolPhaseOffset, WALLET_TOOLS } from "./tool-journey";

describe("approved continuous four-tool journey", () => {
  it("contains four tools, with API excluded from the video sequence", () => {
    expect(WALLET_TOOLS.map(tool => tool.n)).toEqual(["01", "02", "03", "04"]);
  });
  it("moves from the opening through all four tools without a fifth tool", () => {
    expect([0, 201, 401, 601, 801, 1000].map(scroll => getToolJourneyPhase(scroll, 1000))).toEqual([0, 1, 2, 3, 4, 4]);
  });
  it("returns each selected phase when jumping or scrolling backward", () => {
    expect([4, 3, 2, 1, 0].map(phase => getToolJourneyPhase(getToolPhaseOffset(phase, 1000), 1000))).toEqual([4, 3, 2, 1, 0]);
    expect(getToolJourneyPhase(-100, 1000)).toBe(0);
  });
});