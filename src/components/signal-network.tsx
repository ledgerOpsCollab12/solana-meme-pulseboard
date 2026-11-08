import { useEffect, useRef } from "react";

// Perspective signal landscape: illustrative only, with no market-data requests.
export function SignalNetwork() {
  const canvas = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const element = canvas.current;
    const context = element?.getContext("2d");
    if (!element || !context) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const tokens = getComputedStyle(document.documentElement);
    const color = (name: string) => tokens.getPropertyValue(name).trim();
    let width = 0;
    let height = 0;
    let frame = 0;
    let visible = true;
    const lanes = Array.from({ length: 35 }, (_, i) => (i - 17) / 9);
    const project = (lane: number, depth: number) => {
      const perspective = depth * depth;
      return { x: width * .5 + lane * width * .64 * perspective, y: height * .55 + perspective * height * .65 };
    };
    const render = (stamp: number) => {
      context.clearRect(0, 0, width, height);
      const time = motion.matches ? 0 : stamp / 1000;
      const sky = context.createLinearGradient(0, 0, 0, height);
      sky.addColorStop(0, color("--horizon-sky"));
      sky.addColorStop(.52, color("--horizon-light"));
      sky.addColorStop(1, color("--horizon-ground"));
      context.fillStyle = sky;
      context.fillRect(0, 0, width, height);
      // Several faint distant planes establish depth without decorative objects.
      for (let layer = 0; layer < 4; layer++) {
        context.strokeStyle = color("--horizon-mist");
        context.lineWidth = 1;
        context.beginPath();
        for (let x = 0; x <= width; x += 8) {
          const y = height * (.51 + layer * .012) + Math.sin(x / width * 5 + layer * .7) * height * .01;
          if (x === 0) context.moveTo(x, y); else context.lineTo(x, y);
        }
        context.stroke();
      }
      lanes.forEach((lane, i) => {
        context.lineWidth = .7;
        context.strokeStyle = color("--horizon-line");
        context.beginPath();
        for (let step = 0; step <= 40; step++) {
          const point = project(lane, .06 + step / 40 * .94);
          if (step === 0) context.moveTo(point.x, point.y); else context.lineTo(point.x, point.y);
        }
        context.stroke();
        for (let signal = 0; signal < 2; signal++) {
          const depth = .09 + ((time * .045 + i * .137 + signal * .5) % .91);
          const point = project(lane, depth);
          const tail = project(lane, Math.max(.02, depth - .035));
          context.globalAlpha = Math.min(.8, depth * .8);
          context.strokeStyle = i % 4 === 0 ? color("--gain") : color("--horizon-signal");
          context.lineWidth = .8 + depth;
          context.beginPath(); context.moveTo(tail.x, tail.y); context.lineTo(point.x, point.y); context.stroke();
          context.fillStyle = context.strokeStyle;
          const size = .8 + depth * 2;
          context.fillRect(point.x - size / 2, point.y - size / 2, size, size);
          if (i % 6 === 0 && depth > .52) {
            context.lineWidth = .6;
            context.strokeRect(point.x - 5 * depth, point.y - 5 * depth, 10 * depth, 10 * depth);
          }
        }
      });
      context.globalAlpha = 1;
      // Moving cross-depth traces, increasingly spaced towards the viewer.
      context.strokeStyle = color("--horizon-crossline");
      context.lineWidth = .6;
      for (let row = 0; row < 15; row++) {
        const depth = .08 + ((row / 15 + time * .012) % .92);
        const left = project(-2, depth); const right = project(2, depth);
        context.beginPath(); context.moveTo(left.x, left.y); context.lineTo(right.x, right.y); context.stroke();
      }
      if (!motion.matches && visible && !document.hidden) frame = requestAnimationFrame(render);
    };
    const restart = () => {
      cancelAnimationFrame(frame);
      if (visible && !document.hidden) render(performance.now());
    };
    const resize = () => {
      width = element.clientWidth; height = element.clientHeight;
      const ratio = Math.min(window.devicePixelRatio, 2);
      element.width = width * ratio; element.height = height * ratio;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      restart();
    };
    const observer = new IntersectionObserver(([entry]) => { visible = entry?.isIntersecting ?? false; restart(); });
    observer.observe(element);
    resize();
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", restart);
    motion.addEventListener("change", restart);
    return () => {
      cancelAnimationFrame(frame); observer.disconnect();
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", restart);
      motion.removeEventListener("change", restart);
    };
  }, []);
  return <canvas ref={canvas} className="signal-network" aria-hidden="true" />;
}
