import { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NarratedWalletVideo } from "@/components/narrated-wallet-video";
import narratedMp4 from "@/assets/wallet-tour-narrated-nov09.mp4.asset.json";
import narratedWebm from "@/assets/wallet-tour-narrated-nov09.webm.asset.json";
import narratedPoster from "@/assets/wallet-tour-poster-nov09.jpg.asset.json";
import { getIntroProgress } from "@/lib/intro-progress";
import { SignalNetwork } from "@/components/signal-network";
import { ProtocolMarquee } from "@/components/protocol-marquee";
import { getOpeningProgress } from "@/lib/opening-progress";
import { createIntroAnimationDriver } from "@/lib/intro-animation-driver";
import { getProductFocus } from "@/lib/product-focus";

export function ScrollIntro() {
  const intro = useRef<HTMLElement>(null);
  const cta = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = intro.current;
    const button = cta.current;
    if (!section || !button) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const journey = section.closest<HTMLElement>(".horizon-journey");
    journey?.setAttribute("data-intro-live", "true");
    const started = performance.now();
    const update = () => {
      const opening = getOpeningProgress(performance.now() - started, motion.matches);
      section.style.setProperty("--opening-shift", `${opening.shift}svh`);
      section.style.setProperty("--opening-blur", `${opening.blur}px`);
      section.style.setProperty("--opening-scene", `${opening.scene}`);
      journey?.style.setProperty("--opening-scene", `${opening.scene}`);
      const height = section.querySelector<HTMLElement>(".holo-sticky")?.offsetHeight ?? window.innerHeight;
      const top = section.getBoundingClientRect().top + window.scrollY;
      const state = getIntroProgress(window.scrollY - top, section.offsetHeight - height);
       const focus = getProductFocus(state.progress);
       section.style.setProperty("--product-focus", `${focus.focus}`);
       section.querySelector(".integrated-interface")?.setAttribute("data-presentation-ready", String(motion.matches || focus.ready));
      const start = Math.min(window.innerHeight * 0.73, window.innerHeight - button.offsetHeight - 32);
      const slot = section.querySelector<HTMLElement>(".intro-cta-slot");
      const scene = section.querySelector<HTMLElement>(".holo-sticky");
       const end = slot && scene ? slot.getBoundingClientRect().top - scene.getBoundingClientRect().top : start;
      button.style.setProperty("--cta-y", `${start + (end - start) * state.cta}px`);
      section.style.setProperty("--intro-opacity", `${state.titleOpacity}`);
      section.style.setProperty("--intro-scale", `${1 + state.progress * 0.06}`);
      section.style.setProperty("--title-blur", `${state.titleBlur}px`);
      section.style.setProperty("--product-blur", `${state.productBlur}px`);
      section.style.setProperty("--shell-opacity", `${state.shell}`);
      section.style.setProperty("--content-opacity", `${state.content}`);
      section.style.setProperty("--facts-opacity", `${state.facts}`);
      section.style.setProperty("--cta-reveal", `${state.shell}`);
      section.style.setProperty("--window-scale", `${0.93 + state.shell * 0.07}`);
      const product = section.querySelector<HTMLElement>(".holo-product");
      if (product) product.inert = !motion.matches && state.content < 0.85;
      const title = section.querySelector<HTMLElement>(".intro-title-layer");
      if (title) title.inert = !motion.matches && state.titleOpacity === 0;
      return !opening.done;
    };
    const driver = createIntroAnimationDriver(update, {
      request: (callback) => requestAnimationFrame(callback),
      cancel: (id) => cancelAnimationFrame(id),
    });
    const refresh = () => driver.refresh();
    const visible = () => { if (!document.hidden) refresh(); };
    const observer = new ResizeObserver(refresh);
    observer.observe(section);
    const scene = section.querySelector<HTMLElement>(".holo-sticky");
    if (scene) observer.observe(scene);
    refresh();
    window.addEventListener("scroll", refresh, { passive: true });
    window.addEventListener("resize", refresh);
    window.addEventListener("pageshow", refresh);
    window.addEventListener("focus", refresh);
    document.addEventListener("visibilitychange", visible);
    motion.addEventListener("change", refresh);
    return () => {
      driver.stop();
      journey?.removeAttribute("data-intro-live");
      observer.disconnect();
      window.removeEventListener("scroll", refresh);
      window.removeEventListener("resize", refresh);
      window.removeEventListener("pageshow", refresh);
      window.removeEventListener("focus", refresh);
      document.removeEventListener("visibilitychange", visible);
      motion.removeEventListener("change", refresh);
    };
  }, []);

  return (
    <>
      <div className="horizon-journey">
      <div className="horizon-backdrop"><SignalNetwork /></div>
      <section ref={intro} className="scroll-intro holo-intro panoramic-intro horizon-intro optical-product-intro" aria-labelledby="intro-title">
        <div className="holo-sticky">
          <div className="horizon-livestream"><i aria-hidden="true" /> Livestream from Solana blockchain</div>
          <div className="intro-title-layer">
            <h1 id="intro-title" className="intro-headline" aria-label="Track the most profitable wallets in memecoin trading.">
              {["Track the most", "profitable wallets", "in memecoin trading."].map((line, index) => {
                const content = line;
                return index === 1 ? <em key={line} className="headline-line" aria-hidden="true">{content}</em> : <span key={line} className="headline-line" aria-hidden="true">{content}</span>;
              })}
            </h1>
          </div>
          <div className="holo-product optical-product">
            <div className="holo-heading"><span>WHALEWATCH / WALLET INTELLIGENCE</span><span className="product-live"><i /> SOLANA · LIVE · FREE</span></div>
            <div className="holo-composition integrated-composition optical-composition">
              <div className="holo-copy">
                <span className="ef-tag"><b>BEYOND THE LEADERBOARD</b></span>
                <h2>We classify for you <em>all wallets trading memecoins.</em></h2>
                <div className="holo-glass">
                  <p>Go beyond the leaderboard. Analyze top-performing wallets by PnL, win rate, consistency, trading activity, and more. Get real-time alerts and tools to understand how each wallet trades.</p>
                </div>
              </div>
              <div className="holo-video integrated-interface" aria-label="WhaleWatch narrated product presentation">
                <NarratedWalletVideo recording={{ mp4: narratedMp4.url, webm: narratedWebm.url, poster: narratedPoster.url, endingStart: 86.3 }} />
              </div>
            </div>
          </div>
          <div className="intro-cta-slot" aria-hidden="true" />
          <div ref={cta} className="persistent-live-dock">
            <div className="live-dock-copy"><span className="live-dock-index" aria-hidden="true"><i /></span><div><h3>The wallets are moving right now.</h3><p>Every second you read, top wallets are entering positions. Watch them live.</p></div></div>
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
      </div>
    </>
  );
}