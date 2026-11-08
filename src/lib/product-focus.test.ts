import { describe, expect, it } from "vitest";
import { getProductFocus } from "./product-focus";

describe("product presentation handoff", () => {
  it("waits with the presentation stopped while the copy is being read", () => {
    expect(getProductFocus(0.55)).toEqual({ focus: 0, ready: false });
  });
  it("does not start during the centering transition", () => {
    expect(getProductFocus(0.75).focus).toBeCloseTo(0.5);
    expect(getProductFocus(0.75).ready).toBe(false);
  });
  it("starts only after the interface is centered", () => {
    expect(getProductFocus(0.95)).toEqual({ focus: 1, ready: true });
  });
});