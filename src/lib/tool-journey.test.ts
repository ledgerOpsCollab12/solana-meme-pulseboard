import { describe, expect, it } from "vitest";
import { getToolJourneyPhase, getToolPhaseOffset, WALLET_TOOLS } from "./tool-journey";

describe("approved continuous four-tool journey", () => {
  it("contains four tools, with API excluded from the video sequence", () => {
    expect(WALLET_TOOLS.map(tool => tool.n)).toEqual(["01", "02", "03", "04"]);
  });
  it("moves through all four tools without a separate title screen or fifth tool", () => {
    expect([0, 334, 667, 1000, 1250].map(scroll => getToolJourneyPhase(scroll, 1000))).toEqual([0, 1, 2, 3, 3]);
  });
  it("releases at the fourth tool without a fifth blank scroll interval", () => {
    expect(getToolPhaseOffset(3, 1200)).toBe(1201);
    expect(getToolJourneyPhase(1199, 1200)).toBe(2);
    expect(getToolJourneyPhase(1200, 1200)).toBe(3);
  });
  it("returns each selected phase when jumping or scrolling backward", () => {
    expect([3, 2, 1, 0].map(phase => getToolJourneyPhase(getToolPhaseOffset(phase, 1000), 1000))).toEqual([3, 2, 1, 0]);
    expect(getToolJourneyPhase(-100, 1000)).toBe(0);
  });
});