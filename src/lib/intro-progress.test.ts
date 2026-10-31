import { describe, expect, it } from "vitest";
import { getIntroProgress } from "./intro-progress";

describe("holographic intro progression", () => {
  it("starts with only the title and keeps reveal stages closed", () => {
    expect(getIntroProgress(0, 800)).toMatchObject({ titleOpacity: 1, shell: 0, content: 0, facts: 0 });
  });
  it("reveals the shell before video content and metrics", () => {
    const stage = getIntroProgress(240, 800);
    expect(stage.shell).toBeGreaterThan(0);
    expect(stage.content).toBe(0);
    expect(stage.facts).toBe(0);
  });
  it("finishes with the title hidden and all product stages visible", () => {
    expect(getIntroProgress(800, 800)).toMatchObject({ titleOpacity: 0, shell: 1, content: 1, facts: 1, cta: 1 });
  });
  it("clamps overscroll and handles zero distance without invalid values", () => {
    expect(getIntroProgress(-100, 800).progress).toBe(0);
    expect(getIntroProgress(1000, 0).progress).toBe(1);
  });
});