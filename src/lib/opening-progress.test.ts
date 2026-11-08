import { describe, expect, it } from "vitest";
import { getOpeningProgress, OPENING_TITLE } from "./opening-progress";

describe("reference-inspired opening", () => {
  it("shows the complete title immediately before the landscape emerges", () => {
    expect(getOpeningProgress(0)).toMatchObject({ letters: OPENING_TITLE.length, shift: 12, scene: 0 });
    expect(getOpeningProgress(1400)).toMatchObject({ letters: OPENING_TITLE.length, scene: 0 });
  });
  it("keeps the complete title while shifting and optically diffusing it", () => {
    const stage = getOpeningProgress(2200);
    expect(stage.letters).toBe(OPENING_TITLE.length);
    expect(stage.shift).toBeGreaterThan(0);
    expect(stage.shift).toBeLessThan(12);
    expect(stage.blur).toBeGreaterThan(0);
    expect(stage.scene).toBeGreaterThan(0);
  });
  it("settles with a clear title and visible scene", () => {
    expect(getOpeningProgress(3000)).toMatchObject({ letters: OPENING_TITLE.length, shift: 0, blur: 0, scene: 1, done: true });
  });
  it("skips typing and movement for reduced motion", () => {
    expect(getOpeningProgress(0, true)).toMatchObject({ letters: OPENING_TITLE.length, shift: 0, blur: 0, scene: 1, done: true });
  });
});