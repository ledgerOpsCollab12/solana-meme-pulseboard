import { describe, expect, it } from "vitest";
import { nextPreviewStage, PREVIEW_INTERVAL_MS } from "./preview-cycle";

describe("Product preview rotation", () => {
  it("changes views every three seconds", () => {
    expect(PREVIEW_INTERVAL_MS).toBe(3000);
  });
  it("shows the three references in order and repeats", () => {
    expect([nextPreviewStage(0), nextPreviewStage(1), nextPreviewStage(2)]).toEqual([1, 2, 0]);
  });
});