import { describe, expect, it } from "vitest";
import { isRecordedVideoEnding, shouldPlayRecordedVideo } from "./recorded-video-playback";

const playing = { ready: true, visible: true, hidden: false, reducedMotion: false, userPaused: false, ended: false };
describe("narrated recording playback", () => {
  it("starts automatically once the product is readable, without a play click", () => {
    expect(shouldPlayRecordedVideo({ ...playing, ready: false })).toBe(false);
    expect(shouldPlayRecordedVideo(playing)).toBe(true);
  });
  it("suspends when the recording is offscreen or the tab is hidden", () => {
    expect(shouldPlayRecordedVideo({ ...playing, visible: false })).toBe(false);
    expect(shouldPlayRecordedVideo({ ...playing, hidden: true })).toBe(false);
  });
  it("respects a visitor pause and reduced motion", () => {
    expect(shouldPlayRecordedVideo({ ...playing, userPaused: true })).toBe(false);
    expect(shouldPlayRecordedVideo({ ...playing, reducedMotion: true })).toBe(false);
  });
  it("does not restart after the closing invitation", () => {
    expect(shouldPlayRecordedVideo({ ...playing, ended: true })).toBe(false);
  });
  it("emphasizes the inert CTA only when the closing invitation is shown", () => {
    expect(isRecordedVideoEnding(119.9, 120)).toBe(false);
    expect(isRecordedVideoEnding(120, 120)).toBe(true);
    expect(isRecordedVideoEnding(0, 0)).toBe(false);
  });
});