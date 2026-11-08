import { describe, expect, it } from "vitest";
import { getWalletTour, nextWalletTourStep, TOUR_DURATION_MS } from "./wallet-tour";
import { REFERENCE_ROWS, REFERENCE_SUMMARY } from "./wallet-reference";

describe("reference wallet tour", () => {
  it("holds coverage for six seconds then the leaderboard for eight seconds", () => {
    expect(getWalletTour(5999).stage).toBe("coverage");
    expect(getWalletTour(6000).stage).toBe("leaderboard");
    expect(getWalletTour(13999).stage).toBe("leaderboard");
    expect(getWalletTour(14000).stage).toBe("metrics");
  });
  it("follows the same first wallet through every three-second metric", () => {
    for (let column = 0; column < 11; column++) {
      expect(getWalletTour(14000 + column * 3000)).toEqual({ stage: "metrics", column, row: 0 });
    }
    expect(getWalletTour(TOUR_DURATION_MS).stage).toBe("coverage");
  });
  it("supports manual progression through the complete sequence", () => {
    expect(nextWalletTourStep(0)).toBe(6000);
    expect(nextWalletTourStep(6000)).toBe(14000);
    expect(nextWalletTourStep(44000)).toBe(0);
  });
  it("preserves reference counts, scores and the positive worst trade", () => {
    expect(REFERENCE_SUMMARY.map(item => item.value)).toEqual(["99,318", "9,426", "323,625", "9,426"]);
    expect(REFERENCE_ROWS.map(row => row.values[3])).toEqual(["40", "44", "54", "40", "40", "40"]);
    expect(REFERENCE_ROWS[0].values).toEqual(["+54750.1 SOL", "89.2%", "+213.0%", "40", "64,970", "25709.1 SOL", "+80459.2", "+442.71", "-116.72", "826", "9d"]);
    expect(REFERENCE_ROWS[4].values[8]).toBe("+6863.8");
  });
});