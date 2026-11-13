import { describe, expect, it } from "vitest";
import { getProductFocus } from "./product-focus";

describe("product presentation handoff", () => {
  it("waits with the presentation stopped while the copy is being read", () => {
    expect(getProductFocus(0.55)).toEqual({ focus: 0, ready: false });
  });
  it("does not start during the centering transition", () => {
    expect(getProductFocus(0.615).focus).toBeCloseTo(0.5);
    expect(getProductFocus(0.615).ready).toBe(false);
  });
  it("starts only after the interface is centered", () => {
    expect(getProductFocus(0.68)).toEqual({ focus: 1, ready: true });
  });
  it("holds maximum size through the remaining scroll instead of releasing immediately", () => {
    expect([0.7, 0.8, 0.9, 1].map(getProductFocus)).toEqual(Array(4).fill({ focus: 1, ready: true }));
  });
});