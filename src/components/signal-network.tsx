import { useEffect, useRef } from "react";
import { getProtocolAssembly, PROTOCOLS } from "@/lib/protocol-assembly";

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
    const journey = element.closest<HTMLElement>(".horizon-journey");
    const strip = journey?.querySelector<HTMLElement>(".marquee");
    const targets = strip?.querySelectorAll<HTMLImageElement>(".marquee-item img");
    const logos = PROTOCOLS.map(([, name]) => {
      const image = new Image();
      image.src = `/protocols/${name}.png`;
      image.onload = () => restart();
      return image;
    });
    const project = (lane: number, depth: number) => {
      const perspective = depth * depth;
      return { x: width * .5 + lane * width * .64 * perspective, y: height * .55 + perspective * height * .65 };
    };
    const render = (stamp: number) => {
      context.clearRect(0, 0, width, height);
      const time = motion.matches ? 0 : stamp / 1000;
      const assembly = getProtocolAssembly(strip?.getBoundingClientRect().top ?? height * 2, height, motion.matches);
      strip?.style.setProperty("--protocol-assembly", `${assembly}`);
      if (strip) strip.dataset['assembled'] = String(assembly === 1);
      // The canvas stays transparent: blue is confined to the perspective lanes.
      const road = context.createLinearGradient(0, height * .55, 0, height);
      road.addColorStop(0, "transparent");
      road.addColorStop(.55, color("--horizon-line"));
      road.addColorStop(1, color("--horizon-road-glow"));
      lanes.forEach((lane, i) => {
        context.lineWidth = .7;
        context.strokeStyle = road;
        context.shadowColor = color("--horizon-road-glow");
        context.shadowBlur = 5;
        context.beginPath();
        for (let step = 0; step <= 40; step++) {
          const point = project(lane, .06 + step / 40 * .94);
          if (step === 0) context.moveTo(point.x, point.y); else context.lineTo(point.x, point.y);
        }
        context.stroke();
        context.shadowBlur = 0;
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
      // Protocol marks share the signals' depth velocity and perspective.
      logos.forEach((image, i) => {
        if (!image.complete || !image.naturalWidth) return;
        const lane = [-1.25, .85, -.5, 1.5, -.95, .35, 1.1, -.7, .6, -1.6, .2, 1.7][i] ?? 0;
        const depth = .09 + ((time * .045 + i * .137) % .91);
        const origin = project(lane, depth);
        const target = targets?.[i]?.getBoundingClientRect();
        const bounds = element.getBoundingClientRect();
        const point = target ? {
          x: origin.x + (target.left + target.width / 2 - bounds.left - origin.x) * assembly,
          y: origin.y + (target.top + target.height / 2 - bounds.top - origin.y) * assembly,
        } : origin;
        const size = (8 + depth * depth * 38) * (1 - assembly) + 40 * assembly;
        context.globalAlpha = Math.min(1, depth * 1.2 + assembly) * (1 - Math.max(0, (assembly - .9) * 10));
        context.save();
        context.beginPath();
        context.roundRect(point.x - size / 2, point.y - size / 2, size, size, size * .2);
        context.clip();
        context.drawImage(image, point.x - size / 2, point.y - size / 2, size, size);
        context.restore();
      });
      context.globalAlpha = 1;
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
    window.addEventListener("scroll", restart, { passive: true });
    document.addEventListener("visibilitychange", restart);
    motion.addEventListener("change", restart);
    return () => {
      cancelAnimationFrame(frame); observer.disconnect();
      logos.forEach((image) => { image.onload = null; });
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", restart);
      document.removeEventListener("visibilitychange", restart);
      motion.removeEventListener("change", restart);
    };
  }, []);
  return <canvas ref={canvas} className="signal-network" aria-hidden="true" />;
}
