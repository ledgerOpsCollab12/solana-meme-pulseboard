import { describe, expect, it, vi } from "vitest";
import { createIntroAnimationDriver } from "./intro-animation-driver";

describe("embedded preview animation recovery", () => {
  it("refreshes scroll state even when an opening frame is suspended", () => {
    const update = vi.fn(() => true);
    const request = vi.fn(() => 17);
    const cancel = vi.fn();
    const driver = createIntroAnimationDriver(update, { request, cancel });
    driver.refresh();
    driver.refresh();
    expect(update).toHaveBeenCalledTimes(2);
    expect(cancel).toHaveBeenCalledWith(17);
    expect(request).toHaveBeenCalledTimes(2);
  });
  it("stops requesting frames when the opening is complete but still updates on input", () => {
    const update = vi.fn(() => false);
    const request = vi.fn(() => 17);
    const driver = createIntroAnimationDriver(update, { request, cancel: vi.fn() });
    driver.refresh();
    driver.refresh();
    expect(update).toHaveBeenCalledTimes(2);
    expect(request).not.toHaveBeenCalled();
  });
  it("cancels suspended callbacks on unmount and does not update afterward", () => {
    const update = vi.fn(() => true);
    const cancel = vi.fn();
    const driver = createIntroAnimationDriver(update, { request: () => 17, cancel });
    driver.refresh();
    driver.stop();
    driver.refresh();
    expect(cancel).toHaveBeenCalledWith(17);
    expect(update).toHaveBeenCalledTimes(1);
  });
});