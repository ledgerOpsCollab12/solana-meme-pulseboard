import { useEffect, useRef } from "react";

// An illustrative, deterministic signal field. It never requests wallet data.
export function SignalNetwork() {
  const canvas = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const element = canvas.current;
    const context = element?.getContext("2d");
    if (!element || !context) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let width = 0;
    let height = 0;
    const tokens = getComputedStyle(document.documentElement);
    const ink = tokens.getPropertyValue("--signal-line").trim();
    const primary = tokens.getPropertyValue("--primary").trim();
    const gain = tokens.getPropertyValue("--gain").trim();
    const text = tokens.getPropertyValue("--muted-foreground").trim();
    const points = Array.from({ length: 54 }, (_, i) => {
      const side = i % 2;
      const row = Math.floor(i / 2);
      return { x: side ? .72 + ((row * 17) % 25) / 100 : .03 + ((row * 13) % 25) / 100, y: .08 + ((row * 19) % 79) / 100 };
    });
    const render = (timestamp: number) => {
      context.clearRect(0, 0, width, height);
      const time = motion.matches ? 0 : timestamp / 1000;
      const hub = { x: width * .5, y: height * .61 };
      context.lineWidth = .7;
      points.forEach((point, i) => {
        const x = point.x * width;
        const y = point.y * height;
        const neighbor = points[(i + 6) % points.length];
        context.strokeStyle = ink;
        context.beginPath();
        context.moveTo(x, y);
        if (neighbor && Math.abs(point.y - neighbor.y) < .38) context.lineTo(neighbor.x * width, neighbor.y * height);
        context.stroke();
        context.fillStyle = i % 4 === 0 ? gain : primary;
        context.globalAlpha = .35;
        context.fillRect(x - 2, y - 2, 4, 4);
        context.globalAlpha = 1;
        if (i % 3 !== 0) return;
        const bend = { x: sideX(point.x, width), y: hub.y + (i % 5 - 2) * 9 };
        context.beginPath();
        context.moveTo(x, y);
        context.lineTo(bend.x, bend.y);
        context.lineTo(hub.x, hub.y);
        context.stroke();
        const progress = (time * .18 + i * .117) % 1;
        const sx = progress < .75 ? x + (bend.x - x) * progress / .75 : bend.x + (hub.x - bend.x) * (progress - .75) / .25;
        const sy = progress < .75 ? y + (bend.y - y) * progress / .75 : bend.y + (hub.y - bend.y) * (progress - .75) / .25;
        context.fillStyle = i % 2 ? primary : gain;
        context.fillRect(sx - 2, sy - 2, 4, 4);
      });
      // A precision capture gate, not a decorative glowing orb.
      context.strokeStyle = primary;
      context.globalAlpha = .5;
      context.strokeRect(hub.x - 14, hub.y - 14, 28, 28);
      context.strokeRect(hub.x - 7, hub.y - 7, 14, 14);
      context.globalAlpha = 1;
      context.font = "10px 'JetBrains Mono', monospace";
      context.textAlign = "center";
      context.fillStyle = text;
      context.fillText("CAPTURE / CLASSIFY", hub.x, hub.y + 37);
      if (width > 700) {
        const cycle = Math.floor(time / 2) % 3;
        ["SIGNAL DETECTED", "PATTERN CLASSIFIED", "MOVEMENT INDEXED"].forEach((label, i) => {
          context.globalAlpha = i === cycle ? .65 : .22;
          context.textAlign = i % 2 ? "right" : "left";
          const x = i % 2 ? width * .94 : width * .06;
          context.fillText(`${String(i + 1).padStart(2, "0")} / ${label}`, x, height * (.54 + i * .08));
        });
        context.globalAlpha = 1;
      }
      if (!motion.matches && element.getBoundingClientRect().bottom > 0) frame = requestAnimationFrame(render);
    };
    function sideX(x: number, w: number) { return w * (x < .5 ? .38 : .62); }
    const resize = () => {
      cancelAnimationFrame(frame);
      width = element.clientWidth;
      height = element.clientHeight;
      const ratio = Math.min(window.devicePixelRatio, 2);
      element.width = width * ratio;
      element.height = height * ratio;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      render(performance.now());
    };
    const observer = new IntersectionObserver(([entry]) => {
      cancelAnimationFrame(frame);
      if (entry?.isIntersecting) render(performance.now());
    });
    observer.observe(element);
    resize();
    window.addEventListener("resize", resize);
    motion.addEventListener("change", resize);
    return () => { cancelAnimationFrame(frame); observer.disconnect(); window.removeEventListener("resize", resize); motion.removeEventListener("change", resize); };
  }, []);
  return <canvas ref={canvas} className="signal-network" aria-hidden="true" />;
}