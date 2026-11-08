type FrameClock = {
  request: (callback: () => void) => number;
  cancel: (id: number) => void;
};

// A preview can hide an iframe with a queued frame. Input must still refresh it.
export function createIntroAnimationDriver(update: () => boolean, clock: FrameClock) {
  let frame: number | undefined;
  let stopped = false;
  const run = () => {
    frame = undefined;
    if (stopped) return;
    if (update()) frame = clock.request(run);
  };
  return {
    refresh() {
      if (frame !== undefined) clock.cancel(frame);
      frame = undefined;
      run();
    },
    stop() {
      stopped = true;
      if (frame !== undefined) clock.cancel(frame);
      frame = undefined;
    },
  };
}