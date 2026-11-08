import { describe, expect, it } from "vitest";
import { GUIDE_STAGES, getGuidedTour, GUIDED_TOUR_DURATION, nextGuidedStep } from "./guided-wallet-tour";
import { getRecordedSnapshot, RECORDED_SNAPSHOTS, SIMULATION_ROW_LIMIT, RECORDED_ALERTS, GUIDED_WALLET_ADDRESS } from "./interactive-wallet-reference";
describe("interactive recorded simulation", () => {
  it("limits every selection to the first 30 recorded wallets", () => {
    expect(SIMULATION_ROW_LIMIT).toBe(30);
    for (const snapshot of RECORDED_SNAPSHOTS) expect(getRecordedSnapshot(snapshot.period, snapshot.metric)?.rows.length).toBeLessThanOrEqual(30);
  });
  it("never substitutes another dataset for an unrecorded combination", () => {
    expect(getRecordedSnapshot("ALL", "Win Rate")).toBeUndefined();
    expect(getRecordedSnapshot("1H", "P&L")?.rows[0].wallet).toBe("C2vVrg...f8HF");
    expect(getRecordedSnapshot("1H", "Win Rate")?.rows[0].values[1]).toBe("100.0%");
  });
  it("uses the requested wallet and literal transaction quantities", () => {
    expect(GUIDED_WALLET_ADDRESS.startsWith("5gp2JS")).toBe(true);
    expect(RECORDED_ALERTS[0]).toEqual({ token: "Cr5vaJ...DG2QHy", amount: "18,742.988221", time: "10:07:08 p.m.", side: "SELL" });
  });
  it("automatically resets selections on a guided scene change", () => {
    expect(GUIDE_STAGES.find(stage => stage.id === "hour")?.period).toBe("1H");
    expect(GUIDE_STAGES.find(stage => stage.id === "wallet")?.period).toBe("ALL");
    expect(GUIDE_STAGES.find(stage => stage.id === "wallet")?.metric).toBe("P&L");
  });
  it("finishes without looping and advances manually through all stages", () => {
    let time = 0;
    for (let index = 0; index < GUIDE_STAGES.length - 1; index++) {
      expect(getGuidedTour(time).index).toBe(index);
      time = nextGuidedStep(time);
    }
    expect(time).toBe(GUIDED_TOUR_DURATION);
    expect(getGuidedTour(time + 60000).stage.id).toBe("complete");
  });
});