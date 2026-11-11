import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowDown, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getToolJourneyPhase, getToolPhaseOffset, WALLET_TOOLS } from "@/lib/tool-journey";

export function EditorialSolutions({ videoUrl, alertsCta }: { videoUrl: string; alertsCta: ReactNode }) {
  const area = useRef<HTMLElement>(null);
  const recording = useRef<HTMLVideoElement>(null);
  const [phase, setPhase] = useState(0);
  const [reduced, setReduced] = useState(false);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const element = area.current;
    if (!element) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotion = () => setReduced(motion.matches);
    syncMotion();
    motion.addEventListener("change", syncMotion);
    const nav = document.querySelector<HTMLElement>(".site-nav");
    const syncNav = () => {
      element.closest("main")?.style.setProperty("--site-nav-height", `${nav?.offsetHeight ?? 100}px`);
    };
    const resize = new ResizeObserver(syncNav);
    if (nav) resize.observe(nav);
    syncNav();
    let frame = 0;
    const update = () => {
      frame = 0;
      const scene = element.querySelector<HTMLElement>(".tool-scene");
      if (!scene) return;
      const rect = element.getBoundingClientRect();
      const navHeight = nav?.offsetHeight ?? 100;
      setPhase(getToolJourneyPhase(navHeight - rect.top, element.offsetHeight - scene.offsetHeight));
      setInView(rect.top < window.innerHeight && rect.bottom > navHeight && !document.hidden);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    document.addEventListener("visibilitychange", schedule);
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      motion.removeEventListener("change", syncMotion);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      document.removeEventListener("visibilitychange", schedule);
    };
  }, []);
  useEffect(() => {
    const video = recording.current;
    if (!video) return;
    if (phase === 1 && inView && !reduced) void video.play().catch(() => {});
    else video.pause();
  }, [phase, inView, reduced]);
  const move = (next: number) => {
    const element = area.current;
    const scene = element?.querySelector<HTMLElement>(".tool-scene");
    if (!element || !scene) return;
    const navHeight = document.querySelector<HTMLElement>(".site-nav")?.offsetHeight ?? 100;
    window.scrollTo({ top: window.scrollY + element.getBoundingClientRect().top - navHeight + getToolPhaseOffset(next, element.offsetHeight - scene.offsetHeight), behavior: reduced ? "instant" : "smooth" });
  };
  return <section ref={area} className="tool-journey" aria-label="WhaleWatch solutions">
    <div className="tool-scene">
      <div className="tool-opening" hidden={!reduced && phase !== 0}>
        <p className="up-eyebrow">OUR SOLUTION</p>
        <h2>Four tools.<br/><em>One clearer strategy.</em></h2>
        <p>Wallet quality · Behavior · Live alerts · Token understanding</p>
      </div>
      <div className="tool-demonstration" hidden={!reduced && phase === 0}>
        <p className="tool-heading">Four tools. One clearer strategy.</p>
        {WALLET_TOOLS.map((tool, index) => <article key={tool.n} hidden={!reduced && phase !== index + 1} className="tool-state" aria-label={tool.label}>
          <p className="tool-caption"><span>{tool.n} / 04</span>{tool.label}</p>
          <div className="tool-focus">
            <h3><span className="tool-bullet" aria-hidden="true"/><span>{tool.lines.map((line, i) => <span key={line} className={i === 2 ? "text-primary" : undefined}>{line}</span>)}</span></h3>
            <div className="tool-video">
              {index === 0 ? <video ref={recording} src={videoUrl} muted loop playsInline controls preload="metadata" aria-label="Video: Wallet quality filters"/> : <div className="tool-video-pending"><Video aria-hidden="true"/><span>Video coming soon</span></div>}
            </div>
          </div>
          {index === 2 && <div className="tool-alerts-cta">{alertsCta}</div>}
        </article>)}
      </div>
      <nav className="tool-progress" aria-label="Wallet tools">
        <div>{WALLET_TOOLS.map((tool, index) => <Button key={tool.n} variant="ghost" size="icon" title={tool.label} aria-label={`Show ${tool.label}`} aria-current={phase === index + 1 ? "step" : undefined} onClick={() => move(index + 1)}>{tool.n}</Button>)}</div>
        <Button variant="ghost" size="icon" title={phase === 4 ? "Continue to API access" : "Next tool"} aria-label={phase === 4 ? "Continue to API access" : "Next tool"} onClick={() => phase === 4 ? document.getElementById("api-notice")?.scrollIntoView({ behavior: reduced ? "instant" : "smooth" }) : move(phase + 1)}><ArrowDown/></Button>
      </nav>
    </div>
  </section>;
}