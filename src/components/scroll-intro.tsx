import { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroWalletVideo } from "@/components/hero-wallet-video";
import { getIntroProgress } from "@/lib/intro-progress";
import { SignalNetwork } from "@/components/signal-network";
import { ProtocolMarquee } from "@/components/protocol-marquee";

export function ScrollIntro() {
  const intro = useRef<HTMLElement>(null);
  const cta = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = intro.current;
    const button = cta.current;
    if (!section || !button) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    const update = () => {
      const height = section.querySelector<HTMLElement>(".holo-sticky")?.offsetHeight ?? window.innerHeight;
      const top = section.getBoundingClientRect().top + window.scrollY;
      const state = getIntroProgress(window.scrollY - top, section.offsetHeight - height);
      const start = Math.min(window.innerHeight * 0.73, window.innerHeight - button.offsetHeight - 32);
      const slot = section.querySelector<HTMLElement>(".intro-cta-slot");
      const scene = section.querySelector<HTMLElement>(".holo-sticky");
      const end = slot && scene ? slot.getBoundingClientRect().top - scene.getBoundingClientRect().top : start;
      button.style.setProperty("--cta-y", `${start + (end - start) * state.cta}px`);
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
          <SignalNetwork />
          <div className="intro-title-layer">
            <h1 id="intro-title" className="intro-headline typed-headline" aria-label="Track the most profitable wallets in memecoin trading.">
              <span aria-hidden="true" className="typed-word">Track </span><span aria-hidden="true" className="typed-word">the </span><em><span aria-hidden="true" className="typed-word">most </span><span aria-hidden="true" className="typed-word">profitable </span><span aria-hidden="true" className="typed-word">wallets </span></em><span aria-hidden="true" className="typed-word">in </span><span aria-hidden="true" className="typed-word">memecoin </span><span aria-hidden="true" className="typed-word">trading.</span>
            </h1>
          </div>
          <div className="holo-product">
            <div className="holo-heading"><span>WHALEWATCH / WALLET INTELLIGENCE</span><span className="product-live"><i /> SOLANA · LIVE · FREE</span></div>
            <div className="holo-composition">
              <div className="holo-copy">
                <span className="ef-tag"><b>BEYOND THE LEADERBOARD</b></span>
                <h2>Don’t just <br />follow. <br /><em>Understand.</em></h2>
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
            <div className="intro-cta-slot" aria-hidden="true" />
          </div>
          <div ref={cta} className="persistent-live-dock">
            <div className="live-dock-copy"><span className="live-dock-index" aria-hidden="true">CTA/01</span><div><h3>The wallets are moving right now.</h3><p>Every second you read, top wallets are entering positions. Watch them live.</p></div></div>
            <Button type="button" size="lg" className="persistent-live-cta">See live movements <ArrowUpRight aria-hidden="true" /></Button>
          </div>
        </div>
      </section>
      <div className="intro-evidence">
            <div className="ef-facts intro-facts">
              <div><strong>100%</strong><span>Data coverage</span></div>
              <div><strong>Livestream</strong><span>From Solana blockchain</span></div>
              <div><strong>12 AMMs</strong><span>Pump.fun → Orca</span></div>
              <div><strong>$0</strong><span>Free access</span></div>
            </div>
        <ProtocolMarquee />
      </div>
    </>
  );
}