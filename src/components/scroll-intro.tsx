import { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ScrollIntro() {
  const intro = useRef<HTMLElement>(null);
  const cta = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const section = intro.current;
    const button = cta.current;
    if (!section || !button) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    const update = () => {
      const height = window.innerHeight;
      const progress = Math.min(1, Math.max(0, window.scrollY / (height * 0.65)));
      const eased = progress * progress * (3 - 2 * progress);
      const start = Math.min(height * 0.73, height - button.offsetHeight - 32);
      const end = height - button.offsetHeight - 18;
      button.style.setProperty("--cta-y", `${motion.matches ? (progress > 0.1 ? end : start) : start + (end - start) * eased}px`);
      button.style.setProperty("--cta-scale", `${1 - eased * 0.15}`);
      section.style.setProperty("--intro-opacity", `${1 - Math.min(1, progress * 1.6)}`);
      section.style.setProperty("--intro-shift", `${motion.matches ? 0 : -progress * height * 0.25}px`);
      frame = 0;
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    motion.addEventListener("change", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      motion.removeEventListener("change", schedule);
    };
  }, []);

  return (
    <>
      <section ref={intro} className="scroll-intro" aria-labelledby="intro-title">
        <h1 id="intro-title" className="intro-headline">Track the <em>most profitable wallets</em> in memecoin trading.</h1>
      </section>
      <Button ref={cta} type="button" size="lg" className="persistent-live-cta">
        See live movements <ArrowUpRight aria-hidden="true" />
      </Button>
    </>
  );
}