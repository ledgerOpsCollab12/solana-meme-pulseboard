import { describe, expect, it, vi } from "vitest";
import { isChunkLoadError, recoverChunkLoad } from "./chunk-recovery";

function storage() {
  let value: string | null = null;
  return { getItem: () => value, setItem: (_key: string, next: string) => { value = next; } };
}
describe("Outdated route chunk recovery", () => {
  const failure = new Error("error loading dynamically imported module: /@oj-start/upcoming-old.js");
  it("recognizes Firefox and Chromium module failures", () => {
    expect(isChunkLoadError(failure)).toBe(true);
    expect(isChunkLoadError(new Error("Failed to fetch dynamically imported module: /upcoming.js"))).toBe(true);
  });
  it("reloads once to retrieve the current route assets", () => {
    const reload = vi.fn();
    expect(recoverChunkLoad(failure, storage(), "/upcoming", reload, 1000)).toBe(true);
    expect(reload).toHaveBeenCalledTimes(1);
  });
  it("does not enter a reload loop for persistent network failures", () => {
    const saved = storage(); const reload = vi.fn();
    recoverChunkLoad(failure, saved, "/upcoming", reload, 1000);
    expect(recoverChunkLoad(failure, saved, "/upcoming", reload, 1001)).toBe(false);
    expect(reload).toHaveBeenCalledTimes(1);
  });
  it("does not reload unrelated errors", () => {
    const reload = vi.fn();
    expect(recoverChunkLoad(new Error("Invalid request"), storage(), "/", reload)).toBe(false);
    expect(reload).not.toHaveBeenCalled();
  });
  it("keeps manual recovery when browser storage is unavailable", () => {
    const reload = vi.fn();
    expect(recoverChunkLoad(failure, { getItem: () => { throw new Error("Denied"); }, setItem: vi.fn() }, "/", reload)).toBe(false);
    expect(reload).not.toHaveBeenCalled();
  });
});