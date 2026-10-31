import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUp, Cog } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getBillboardStage } from "@/lib/billboard-progress";

type Problem = { n: string; title: string; description: string };

export function ProblemBillboard({ problems }: { problems: Problem[] }) {
  const section = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  useEffect(() => {
    const element = section.current;
    if (!element) return;
    let frame = 0;
    const update = () => {
      const scene = element.querySelector<HTMLElement>(".billboard-scene");
      if (!scene) return;
      const scroll = -element.getBoundingClientRect().top;
      const stage = getBillboardStage(scroll, element.offsetHeight - scene.offsetHeight, problems.length);
      setActive(stage);
      element.style.setProperty("--billboard-stage", String(stage));
      frame = 0;
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("scroll", schedule); window.removeEventListener("resize", schedule); };
  }, [problems.length]);

  const move = (stage: number) => {
    const element = section.current;
    const scene = element?.querySelector<HTMLElement>(".billboard-scene");
    if (!element || !scene) return;
    const top = element.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top + (element.offsetHeight - scene.offsetHeight) * (stage + .1) / problems.length, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  };

  return (
    <section ref={section} className="problem-billboard" aria-labelledby="market-title">
      <div className="billboard-scene">
        <div className="billboard-heading">
          <span className="ef-tag"><b>WW/01</b> The problem</span>
          <h2 id="market-title" className="ef-h2">The first software built for <span className="text-accent">quality wallet tracking</span>.</h2>
          <p>The memecoin market moves billions of dollars a day and profitable wallets exist — what separates them from the losers is access to quality tools.</p>
        </div>
        <div className="billboard-machine">
          <div className="billboard-mechanism" aria-hidden="true"><Cog /><span>WALLET INTELLIGENCE</span><span>0{active + 1} / 04</span></div>
          <div className="billboard-window">
            {problems.map((problem, index) => (
              <article key={problem.n} className={`billboard-panel billboard-panel-${index}`} aria-hidden={index !== active} inert={index !== active}>
                <div className="billboard-card-top"><span>RISK / P-{problem.n}</span><span>WHALEWATCH</span></div>
                <h3><span className="billboard-number">{problem.n}</span><span>{problem.title}</span></h3>
                <p>{problem.description}</p>
                <div className="billboard-card-bottom" aria-hidden="true"><span /> <span /> <span /></div>
              </article>
            ))}
          </div>
          <div className="billboard-controls">
            <span className="billboard-pagination" aria-hidden="true">{problems.map((p, i) => <i key={p.n} className={i === active ? "is-active" : ""} />)}</span>
            <Button variant="outline" size="icon" disabled={active === 0} onClick={() => move(active - 1)} aria-label="Previous problem" title="Previous problem"><ArrowUp /></Button>
            <Button variant="outline" size="icon" disabled={active === problems.length - 1} onClick={() => move(active + 1)} aria-label="Next problem" title="Next problem"><ArrowDown /></Button>
          </div>
        </div>
      </div>
    </section>
  );
}