import { describe, expect, it } from "vitest";
import { getProtocolAssembly } from "./protocol-assembly";

describe("road icons join the protocol strip on arrival", () => {
  it("keeps icons on the road before the strip enters view", () => {
    expect(getProtocolAssembly(1000, 800)).toBe(0);
  });
  it("moves icons toward the strip while scrolling into it", () => {
    expect(getProtocolAssembly(620, 800)).toBeCloseTo(.5);
  });
  it("finishes assembly before starting the horizontal animation", () => {
    expect(getProtocolAssembly(480, 800)).toBe(1);
  });
  it("shows the assembled strip without movement when motion is reduced", () => {
    expect(getProtocolAssembly(1000, 800, true)).toBe(1);
  });
});