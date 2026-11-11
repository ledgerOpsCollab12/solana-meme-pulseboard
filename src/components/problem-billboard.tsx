import { useEffect, useRef, useState } from "react";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getBillboardStage } from "@/lib/billboard-progress";

type Problem = { n: string; title: string; description: string; short: string };

export function ProblemBillboard({ problems }: { problems: Problem[] }) {
  const section = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [reduced, setReduced] = useState(false);
  const navHeight = () => document.querySelector<HTMLElement>(".site-nav")?.offsetHeight ?? 100;
  useEffect(() => {
    const element = section.current;
    if (!element) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotion = () => setReduced(motion.matches);
    syncMotion();
    motion.addEventListener("change", syncMotion);
    let frame = 0;
    const update = () => {
      frame = 0;
      const scene = element.querySelector<HTMLElement>(".pb-scene");
      if (scene) setActive(getBillboardStage(navHeight() - element.getBoundingClientRect().top, element.offsetHeight - scene.offsetHeight, problems.length));
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("scroll", schedule); window.removeEventListener("resize", schedule); motion.removeEventListener("change", syncMotion); };
  }, [problems.length]);

  const move = (stage: number) => {
    const element = section.current;
    const scene = element?.querySelector<HTMLElement>(".pb-scene");
    if (!element || !scene) return;
    window.scrollTo({ top: window.scrollY + element.getBoundingClientRect().top - navHeight() + (element.offsetHeight - scene.offsetHeight) * (stage + .1) / problems.length, behavior: reduced ? "instant" : "smooth" });
  };

  return (
    <section ref={section} className="pb-journey" aria-labelledby="market-title">
      <div className="pb-scene">
        <div className="pb-main">
          <div className="pb-heading">
            <p className="up-eyebrow">WALLET INTELLIGENCE / THE PROBLEM</p>
            <h2 id="market-title">The first software built for <em>quality wallet tracking.</em></h2>
            <p>The memecoin market moves billions of dollars a day and profitable wallets exist — what separates them from the losers is access to quality tools.</p>
          </div>
          <div className="pb-problems">
            {problems.map((problem, index) => (
              <article key={problem.n} hidden={!reduced && index !== active}>
                <p className="up-eyebrow">{problem.n} / 04</p>
                <h3>{problem.title}</h3>
                <p>{problem.description}</p>
              </article>
            ))}
          </div>
        </div>
        <nav className="pb-tabs" aria-label="Problems">
          {problems.map((problem, index) => (
            <Button key={problem.n} variant="ghost" aria-current={index === active ? "step" : undefined} onClick={() => move(index)}>
              <span>{problem.n}</span><strong>{problem.short}</strong>
            </Button>
          ))}
        </nav>
        <div className="pb-foot"><span>FOUR PROBLEMS · ONE AT A TIME</span><span>SCROLL TO CONTINUE <ArrowDown aria-hidden="true" /></span></div>
      </div>
    </section>
  );
}
