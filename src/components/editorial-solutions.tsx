import { useEffect, useRef, useState } from "react";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";

type Solution = { n: string; title: string; paragraphs: string[]; notice?: string };
const labels = ["Quality filters", "Behavior", "Real-time alerts", "Token understanding", "Blockchain data"];
export function EditorialSolutions({ solutions, videoUrl }: { solutions: Solution[]; videoUrl: string }) {
  const area = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  useEffect(() => {
    const update = () => {
      let selected = 0;
      area.current?.querySelectorAll<HTMLElement>("[data-solution]").forEach((section, index) => {
        if (section.getBoundingClientRect().top <= window.innerHeight * .35) selected = index;
      });
      setActive(selected);
    };
    window.addEventListener("scroll", update, { passive: true }); update();
    return () => window.removeEventListener("scroll", update);
  }, []);
  return <section className="ed-solutions" aria-label="WhaleWatch solutions"><p className="up-eyebrow">OUR SOLUTION</p><h2>Five tools.<br/><em>One clearer strategy.</em></h2><p className="ed-lead">Five tools that turn raw wallet data into a strategy you can actually run.</p><div className="ed-flow" ref={area}><nav aria-label="Wallet tools" className="ed-tools-nav">{solutions.map((solution, index) => <Button variant="ghost" key={solution.n} aria-current={active === index ? "step" : undefined} onClick={() => document.getElementById(`solution-${solution.n}`)?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" })}><span>{solution.n}</span><strong>{labels[index]}</strong><ArrowDown/></Button>)}</nav><div>{solutions.map(solution => <article key={solution.n} id={`solution-${solution.n}`} data-solution className="ed-module"><p className="up-eyebrow">MODULE {solution.n}</p><h3>{solution.title}</h3>{solution.paragraphs.map(text => <p key={text}>{text}</p>)}{solution.notice && <p className="up-callout">{solution.notice}</p>}{solution.n === "01" && <video className="ed-recording" src={videoUrl} autoPlay muted loop playsInline controls aria-label={`Video: ${solution.title}`}/>}</article>)}</div></div></section>;
}