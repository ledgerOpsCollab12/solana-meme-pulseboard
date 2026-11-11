import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getBillboardStage } from "@/lib/billboard-progress";

type Problem = {
  n: string;
  short: string;
  left?: ReactNode;
  big?: boolean;
  subtitle?: ReactNode;
  title?: ReactNode;
  lead?: ReactNode;
  description?: ReactNode;
  compare?: { label: string; text: string; tone: "muted" | "accent" }[];
};

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

  const current = problems[active] ?? problems[0];
  // A slide without its own left title gives the whole stage to its text.
  const wide = !reduced && !current?.left;

  return (
    <section ref={section} className="pb-journey" aria-label="Wallet intelligence — the problem">
      <div className="pb-scene">
        <div className={"pb-main" + (wide ? " pb-main--wide" : "")}>
          {!reduced && !wide ? (
            <div className={"pb-heading" + (!reduced && current?.big ? " pb-heading--big" : "")}>
              {reduced ? null : <h2 key={active}>{current?.left}</h2>}
              {reduced || !current?.subtitle ? null : <p>{current.subtitle}</p>}
            </div>
          ) : null}
          <div className="pb-problems">
            {problems.map((problem, index) => (
              <article key={problem.n} hidden={!reduced && index !== active}>
                <p className="up-eyebrow">{problem.n} / 04</p>
                {reduced && problem.left ? <h2 className="pb-static-title">{problem.left}</h2> : null}
                {reduced && problem.subtitle ? <p className="pb-static-subtitle">{problem.subtitle}</p> : null}
                {problem.title ? <h3>{problem.title}</h3> : null}
                {problem.lead ? <p className="pb-lead">{problem.lead}</p> : null}
                {problem.compare ? (
                  <div className="pb-compare">
                    {problem.compare.map((block) => (
                      <div key={block.label} className={"pb-compare-block is-" + block.tone}>
                        <p className="pb-compare-label">{block.label}</p>
                        <p>{block.text}</p>
                      </div>
                    ))}
                  </div>
                ) : null}
                {problem.description ? <p className="pb-desc">{problem.description}</p> : null}
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
