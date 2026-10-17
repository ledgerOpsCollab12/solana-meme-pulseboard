import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { ArrowUpRight, Code2, MessageSquare } from "lucide-react";
import { RequestForm } from "@/components/request-form";
import { PROGRAM_URL } from "@/lib/request-schema";
import { WalletPreview } from "@/components/wallet-preview";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "WhaleWatch — Real-time transactions of the most profitable wallets in memecoin trading" },
      { name: "description", content: "A leaderboard of the highest-PnL wallets isn’t enough. WhaleWatch gives you insights and tools to segment wallets by consistency and behavior, so you can build a realistic strategy — free." },
      { property: "og:title", content: "WhaleWatch — Real-time transactions of the most profitable wallets in memecoin trading" },
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
    description: "Knowing how to follow a profitable account is what matters. Each one has its own patterns of trading, gains, losses and risk. Choosing the wrong moment to follow one — entering late or failing to sell in time — can cost you money even when you're copying a winning account. Some trade fast, others manipulate price or liquidity. Understand their patterns and define your entry, exit and risk rules before you copy a single move.",
  },
  {
    n: "04",
    title: "Existing wallet trackers lack memecoin logic",
    description: "Solana wallet trackers already exist, but none are built for how memecoins actually trade. Ours is the first tool designed specifically for this market.",
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

function Index() {
  useReveal();

  return (
    <main className="mx-auto max-w-[1440px] px-6 py-8 lg:px-10">
      <nav className="flex items-center justify-between">
        <span className="text-xl font-bold">🐋 Whale<span className="text-primary">Watch</span></span>
        <Button asChild variant="outline"><a href="#api-access"><Code2 /> API access</a></Button>
      </nav>

      <section className="hero-layout">
        <div className="hero-copy">
        <span className="inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1 font-mono text-xs text-muted-foreground">
          <span className="h-2 w-2 rounded-full bg-gain animate-live" /> LIVE · SOLANA BLOCKCHAIN · FREE
        </span>
        <h1 className="mt-6 text-left text-4xl font-bold leading-[1.12] lg:text-5xl">
          Real-time transactions of the <span className="text-accent">most profitable wallets</span> in memecoin trading.
        </h1>
        <p className="mt-6 max-w-xl text-left text-base leading-relaxed text-muted-foreground">
          Access to a leaderboard of the highest-PnL wallets isn’t enough. Most aren’t consistent, they’re bots you can’t keep up with, or they fake volume to profit off you copying their moves. We give you insights and tools so a trader with limited resources can build a realistic strategy.
        </p>
        </div>
        <WalletPreview />
      </section>
      <Button asChild className="mb-12 min-h-28 w-full whitespace-normal px-6 py-7 text-2xl font-bold md:min-h-36 md:text-3xl"><a href={PROGRAM_URL} target="_blank" rel="noopener noreferrer"><span>See live movements</span><ArrowUpRight className="size-8 shrink-0 md:size-10" /></a></Button>

      <section className="overflow-x-clip border-t py-16" aria-labelledby="market-title">
        <h2 id="market-title" className="max-w-4xl text-2xl font-bold leading-snug md:text-4xl">
          The first software built for <span className="text-accent">quality wallet tracking</span>.
        </h2>
        <p className="mt-5 max-w-3xl text-lg text-muted-foreground">
          The memecoin market moves billions of dollars a day and profitable wallets exist — what separates them from the losers is access to quality tools.
        </p>
        <div className="problem-timeline mt-12">
          {PROBLEMS.map((p) => (
            <article key={p.n} className="problem-item" data-reveal>
              <div className="problem-body rounded-lg border bg-card p-6">
                <h3 className="problem-title">
                  <span className="problem-num" aria-hidden="true">{Number(p.n)}</span>
                  <span>{p.title}</span>
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.description}</p>
              </div>
            </article>
          ))}
          <div className="solution-band">
            <h3 className="solution-band-title">Our solution</h3>
            <p className="mt-2 text-sm text-muted-foreground">Three tools that turn raw wallet data into a strategy you can actually run.</p>
          </div>
        </div>
        <div className="solution-rows">
          {SOLUTIONS.map((s) => (
            <article key={s.n} className="solution-row" aria-label={`Our solution: ${s.title}`}>
              <div className="solution-row-copy">
                <span className="font-mono text-xs text-accent">{s.n}</span>
                <h4 className="mt-2 text-2xl font-bold leading-snug">{s.title}</h4>
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
              <div className="solution-video" aria-label={`Video placeholder: ${s.title}`}>
                <span className="font-mono text-xs text-muted-foreground">▶ VIDEO · {s.title}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="api-access" className="scroll-mt-8 grid gap-10 border-t py-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16" aria-labelledby="api-title">
        <div><Code2 className="mb-5 size-8 text-primary" /><h2 id="api-title" className="text-3xl font-bold leading-tight">Request API access or a tool tailored to your needs</h2></div>
        <RequestForm kind="api" />
      </section>
      <section id="recommendations" className="grid gap-10 border-t py-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16" aria-labelledby="recommendations-title">
        <div><MessageSquare className="mb-5 size-8 text-primary" /><h2 id="recommendations-title" className="text-3xl font-bold leading-tight">Send a recommendation</h2><p className="mt-5 text-base leading-relaxed text-muted-foreground">Suggest a feature that you think would improve analysis for our users. If it's a great idea, you may see it integrated soon.</p></div>
        <RequestForm kind="recommendation" />
      </section>

      <footer className="border-t pt-6 text-center text-xs text-muted-foreground">
        Demo data. Not financial advice.
      </footer>
    </main>
  );
}
