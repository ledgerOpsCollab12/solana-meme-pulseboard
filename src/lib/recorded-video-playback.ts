/** Playback is independent of wallet activity and waits for readable product visibility. */
export function shouldPlayRecordedVideo({ ready, visible, hidden, reducedMotion, userPaused, ended }: { ready: boolean; visible: boolean; hidden: boolean; reducedMotion: boolean; userPaused: boolean; ended: boolean }) {
  return ready && visible && !hidden && !reducedMotion && !userPaused && !ended;
}

export function isRecordedVideoEnding(currentTime: number, endingStart: number) {
  return Number.isFinite(currentTime) && Number.isFinite(endingStart) && endingStart > 0 && currentTime >= endingStart;
}