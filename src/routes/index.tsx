import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { ArrowUpRight, Code2, MessageSquare, Sparkles } from "lucide-react";
import { RequestForm } from "@/components/request-form";
import { PROGRAM_URL } from "@/lib/request-schema";
import { ProtocolMarquee } from "@/components/protocol-marquee";
import { WalletPreview } from "@/components/wallet-preview";
import { Button } from "@/components/ui/button";
import solution01Video from "@/assets/solution-01.mp4.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "WhaleWatch — Track the most profitable wallets in memecoin trading" },
      { name: "description", content: "A leaderboard of the highest-PnL wallets isn’t enough. WhaleWatch gives you insights and tools to segment wallets by consistency and behavior, so you can build a realistic strategy — free." },
      { property: "og:title", content: "WhaleWatch — Track the most profitable wallets in memecoin trading" },
      { property: "og:description", content: "Most top wallets aren’t consistent, are bots you can’t keep up with, or fake volume. Get insights and tools to build a realistic strategy with limited resources." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&family=Space+Grotesk:wght@400;600;700&display=swap" },
    ],
  }),
  component: Index,
});

const PROBLEMS = [
  {
    n: "01",
    title: "A leaderboard lies to you",
    description: "Anyone can hit a token that moons overnight. A huge gain proves nothing about consistency — and copying someone who simply got lucky is, almost always, losing money.",
  },
  {
    n: "02",
    title: "Arrive late and you lose",
    description: "Bots trade at speeds a trader with limited tools simply can't match.",
  },
  {
    n: "03",
    title: "Know who you're following",
    description: "Knowing how to follow a profitable account is what matters. Choosing the wrong moment to follow one — entering late or failing to sell in time — can cost you money even when you're copying a winning account. Some trade fast, others manipulate price or liquidity. Understand their patterns and define your entry, exit and risk rules before you copy a single move.",
  },
  {
    n: "04",
    title: "Existing wallet trackers lack memecoin logic",
    description: "Solana wallet trackers already exist, but none have the logic to track memecoin wallets correctly. Ours is the first tool designed specifically for this market.",
  },
];

type Solution = { n: string; title: string; paragraphs: string[]; notice?: string };

const SOLUTIONS: Solution[] = [
  {
    n: "01",
    title: "Wallet quality filters",
    paragraphs: ["Filter wallets not just by PnL, but by win rate, ROI, capital deployed and more. These signals let you follow the most consistent accounts and see what they have in common."],
  },
  {
    n: "02",
    title: "Bot & human behavior classification",
    paragraphs: ["We classify accounts by bot-like and human behavior. See trade counts and full movement history so you know whether you can copy a wallet without needing a low-latency bot."],
    notice: "In development: a flexible, low-latency bot you can run yourself.",
  },
  {
    n: "03",
    title: "Real-time alerts from profitable wallets",
    paragraphs: ["Add the wallets you want to track to a panel with their movements in real time. See how often they trade, watch their gains live, know which tokens they buy, and understand how to copy them the right way."],
  },
  {
    n: "04",
    title: "Token understanding",
    paragraphs: ["Set a minimum wallet PnL to discover which tokens have the most open positions held by wallets meeting your threshold. Analyze these tokens, identify their key characteristics, and understand what profitable traders look for when deciding to enter a position."],
  },
  {
    n: "05",
    title: "100% data coverage in real time, access to API and custom solutions",
    paragraphs: [
      "We collect data directly from the Solana blockchain using our own infrastructure, tracking all major AMMs, including Pump.fun, PumpSwap, Raydium, Meteora, Moonit, and Orca. This gives us 100% coverage of trading data from active memecoin wallets.",
      "Take your analysis to the next level with our API. Request access to the data you need, custom tools, and tailored solutions to power your wallet analysis.",
    ],
  },
];

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll("[data-reveal]");
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("revealed"); io.unobserve(e.target); } });
    }, { threshold: 0.25 });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function CtaStrip({ idx, title, text, href = PROGRAM_URL, label = "Open the live tracker", external = true }: { idx: string; title: string; text: string; href?: string; label?: string; external?: boolean }) {
  return (
    <aside className="ef-card ef-strip" data-reveal-plain>
      <span className="ef-strip-idx">{idx}</span>
      <div><h3>{title}</h3><p>{text}</p></div>
      <a className="ef-btn" href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{label} <ArrowUpRight /></a>
    </aside>
  );
}

function Index() {
  useReveal();

  return (
    <main className="mx-auto max-w-[1360px] px-5 py-6 lg:px-10">
      <nav className="site-nav">
        <div className="site-nav-actions">
          <Button asChild variant="outline"><a href="#decoding"><MessageSquare /> Decoding memecoin market for you</a></Button>
          <a className="ef-btn" href={PROGRAM_URL} target="_blank" rel="noopener noreferrer">Open the live tracker <ArrowUpRight /></a>
          <Button asChild variant="outline"><a href="#api-access"><Sparkles /> Request a tailored feature</a></Button>
          <Button asChild variant="outline"><a href="#api-access"><Code2 /> API access</a></Button>
        </div>
      </nav>

      <section className="hero-layout">
        <div className="hero-copy">
          <span className="ef-tag"><span className="h-2 w-2 rounded-full bg-gain animate-live" /> <b>WW/00</b> Live · Solana · Free</span>
          <h1 className="ef-h1 mt-6">Track the <em>most profitable wallets</em> in memecoin trading.</h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
            Access to a leaderboard of the highest-PnL wallets isn’t enough. Most aren’t consistent, they’re bots you can’t keep up with, or they fake volume to profit off you copying their moves. We give you insights and tools so a trader with limited resources can build a realistic strategy.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button type="button" className="ef-btn">See live movements <ArrowUpRight /></button>
            <a className="ef-btn ef-btn-ghost" href="#api-access">API access</a>
          </div>
          <div className="ef-facts">
            <div><strong>100%</strong><span>Data coverage</span></div>
            <div><strong>Livestream</strong><span>From Solana blockchain</span></div>
            <div><strong>12 AMMs</strong><span>Pump.fun → Orca</span></div>
            <div><strong>$0</strong><span>Free access</span></div>
          </div>
        </div>
        <WalletPreview />
      </section>

      <CtaStrip idx="CTA/01" title="The wallets are moving right now." text="Every second you read, top wallets are entering positions. Watch them live." />
      <ProtocolMarquee />

      <section className="overflow-x-clip py-20" aria-labelledby="market-title">
        <span className="ef-tag"><b>WW/01</b> The problem</span>
        <h2 id="market-title" className="ef-h2 mt-5 max-w-4xl">The first software built for <span className="text-accent">quality wallet tracking</span>.</h2>
        <p className="mt-5 max-w-3xl text-lg text-muted-foreground">
          The memecoin market moves billions of dollars a day and profitable wallets exist — what separates them from the losers is access to quality tools.
        </p>
        <div className="ef-problems">
          {PROBLEMS.map((p) => (
            <article key={p.n} className="ef-card ef-card-hover ef-problem problem-item" data-reveal>
              <div className="problem-body ef-problem-inner">
                <div className="ef-problem-head"><span className="ef-problem-num">{p.n}</span><b>RISK / P-{p.n}</b></div>
                <h3>{p.title}</h3>
                <p>{p.description}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10"><CtaStrip idx="CTA/02" title="Stop copying blind." text="Filter wallets by consistency, win rate and behavior before you follow a single trade." /></div>

        <div className="ef-divider"><span className="ef-tag"><b>WW/02</b> Our solution</span></div>
        <h2 className="ef-h2 text-center">Our solution</h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-muted-foreground">Five tools that turn raw wallet data into a strategy you can actually run.</p>

        <div className="mt-12 flex flex-col gap-6">
          {SOLUTIONS.map((s, i) => (
            <div key={s.n} className="flex flex-col gap-6">
              <article className="ef-card ef-solution" aria-label={`Our solution: ${s.title}`}>
                <div className="ef-solution-copy">
                  <span className="ef-solution-tag">MODULE S-{s.n}</span>
                  <h4 className="mt-4 text-2xl font-bold leading-snug tracking-tight lg:text-[1.7rem]">{s.title}</h4>
                  {s.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="mt-4 text-base leading-relaxed text-muted-foreground">{paragraph}</p>
                  ))}
                  {s.notice && (
                    <p className="mt-5 border-l-2 border-accent pl-4 text-sm leading-relaxed">
                      <span className="block font-mono text-xs text-accent">IN DEVELOPMENT</span>
                      {s.notice}
                    </p>
                  )}
                </div>
                {s.n === "01" ? (
                  <video className="ef-video overflow-hidden object-cover" src={solution01Video.url} autoPlay muted loop playsInline aria-label={`Video: ${s.title}`} />
                ) : (
                  <div className="ef-video" aria-label={`Video placeholder: ${s.title}`}>
                    <span className="font-mono text-xs text-muted-foreground">▶ VIDEO · S-{s.n}</span>
                  </div>
                )}
              </article>
              {i === 2 && <CtaStrip idx="CTA/03" title="Get the alerts before the pump." text="Add profitable wallets to your panel and see every move as it happens." label="Start tracking free" />}
            </div>
          ))}
        </div>

        <div className="mt-10"><CtaStrip idx="CTA/04" title="Need the raw data?" text="Real-time API and tools built for your strategy." href="#api-access" label="Request API access" external={false} /></div>
      </section>

      <section id="api-access" className="ef-card ef-form-section scroll-mt-8" aria-labelledby="api-title">
        <div><span className="ef-tag"><b>WW/03</b> API & custom</span><h2 id="api-title" className="mt-5 text-3xl font-bold leading-tight tracking-tight">Request API access or a tool tailored to your needs</h2><p className="mt-5 text-base leading-relaxed text-muted-foreground">We provide real-time API access tailored to your needs. Whether you're building low-latency trading tools or need specific wallet and token data, we've got you covered. You can also request custom features built for your use case, and we'll work with you to find the best pricing.</p></div>
        <RequestForm kind="api" />
      </section>
      <section id="decoding" className="ef-card ef-form-section mt-8 scroll-mt-8" aria-labelledby="decoding-title">
        <div><span className="ef-tag"><b>WW/04</b> Community</span><h2 id="decoding-title" className="mt-5 text-3xl font-bold leading-tight tracking-tight">Decoding memecoin market for you</h2><p className="mt-5 text-base leading-relaxed text-muted-foreground">Most traders don't have the infrastructure to analyze wallet and token data the way they want. We're changing that by letting our community shape what we build. Every month, we'll develop a new feature based on your suggestions. Submit your ideas, and we'll select the best or most requested one. The winning feature will be announced here and shared with you by email.</p></div>
        <RequestForm kind="recommendation" />
      </section>

      <div className="mt-10"><CtaStrip idx="CTA/05" title="Still reading? The wallets aren’t." text="Free, real-time, on Solana." /></div>

      <footer className="mt-10 border-t pt-6 text-center text-xs text-muted-foreground">
        Demo data. Not financial advice.
      </footer>
    </main>
  );
}
