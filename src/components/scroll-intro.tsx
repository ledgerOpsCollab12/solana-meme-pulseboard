import { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroWalletVideo } from "@/components/hero-wallet-video";
import { getIntroProgress } from "@/lib/intro-progress";

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
      const top = section.getBoundingClientRect().top + window.scrollY;
      const state = getIntroProgress(window.scrollY - top, section.offsetHeight - height);
      const start = Math.min(height * 0.73, height - button.offsetHeight - 32);
      const end = height - button.offsetHeight - 18;
      button.style.setProperty("--cta-y", `${motion.matches ? end : start + (end - start) * state.cta}px`);
      button.style.setProperty("--cta-scale", `${motion.matches ? 0.85 : 1 - state.cta * 0.15}`);
      section.style.setProperty("--intro-opacity", `${state.titleOpacity}`);
      section.style.setProperty("--intro-scale", `${1 + state.progress * 0.06}`);
      section.style.setProperty("--shell-opacity", `${state.shell}`);
      section.style.setProperty("--content-opacity", `${state.content}`);
      section.style.setProperty("--facts-opacity", `${state.facts}`);
      section.style.setProperty("--window-scale", `${0.93 + state.shell * 0.07}`);
      const product = section.querySelector<HTMLElement>(".holo-product");
      if (product) product.inert = !motion.matches && state.content < 0.85;
      const title = section.querySelector<HTMLElement>(".intro-title-layer");
      if (title) title.inert = !motion.matches && state.titleOpacity === 0;
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
      <section ref={intro} className="scroll-intro holo-intro" aria-labelledby="intro-title">
        <div className="holo-sticky">
          <div className="intro-title-layer">
            <h1 id="intro-title" className="intro-headline">Track the <em>most profitable wallets</em> in memecoin trading.</h1>
          </div>
          <div className="holo-product">
            <div className="holo-heading"><span>WHALEWATCH / WALLET INTELLIGENCE</span><span className="product-live"><i /> SOLANA · LIVE · FREE</span></div>
            <div className="holo-composition">
              <div className="holo-copy">
                <span className="ef-tag"><b>BEYOND THE LEADERBOARD</b></span>
                <h2>Don’t just<br />follow.<br /><em>Understand.</em></h2>
                <div className="holo-glass">
                  <p>A leaderboard of the highest-PnL wallets isn’t enough.</p>
                  <p>Most aren’t consistent, they’re bots you can’t keep up with, or they fake volume to profit off you copying their moves.</p>
                  <p>We give you insights and tools so a trader with limited resources can build a realistic strategy.</p>
                </div>
              </div>
              <div className="product-video-frame holo-window" aria-label="WhaleWatch product recording">
                <div className="product-frame-top"><span className="product-frame-dots" aria-hidden="true"><i /><i /><i /></span><span>01 / QUALITY & CLASSIFICATION</span><span className="product-live"><i /> LIVE DATA</span></div>
                <div className="holo-video"><HeroWalletVideo /></div>
                <div className="product-frame-bottom"><span>SOLANA / WALLET METRICS</span><span>WHALEWATCH</span></div>
              </div>
            </div>
            <div className="ef-facts holo-facts">
              <div><strong>100%</strong><span>Data coverage</span></div>
              <div><strong>Livestream</strong><span>From Solana blockchain</span></div>
              <div><strong>12 AMMs</strong><span>Pump.fun → Orca</span></div>
              <div><strong>$0</strong><span>Free access</span></div>
            </div>
          </div>
        </div>
      </section>
      <Button ref={cta} type="button" size="lg" className="persistent-live-cta">
        See live movements <ArrowUpRight aria-hidden="true" />
      </Button>
    </>
  );
}