import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
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

const TRADERS = [
  { name: "degenwhale.sol", pnl: 48.2, win: 81 },
  { name: "SatoshiGhost", pnl: 37.9, win: 76 },
  { name: "pumpking_88.sol", pnl: 29.4, win: 72 },
  { name: "MemeSensei", pnl: 22.1, win: 69 },
  { name: "lunahunter.sol", pnl: 17.6, win: 66 },
];
const COINS: Record<string, number> = { BONK: 0.000031, WIF: 2.4, POPCAT: 1.1, MEW: 0.0085, GOAT: 0.62, FARTCOIN: 0.94 };

const IDEAS: [string, string, string, string, string, string, string][] = [
  ["01", "LUCK ISN'T A METHOD", "A leaderboard lies to you",
    "Anyone can hit a token that moons overnight. A huge gain proves nothing about consistency — and copying someone who simply got lucky is, almost always, losing money.",
    "Filter wallets not just by PnL, but by win rate, ROI, capital deployed and more. These signals let you follow the most consistent accounts and see what they have in common.", "",
    "Wallet quality filters"],
  ["02", "SPEED", "Arrive late and you lose",
    "Bots trade at speeds a trader with limited tools simply can't match.",
    "We classify accounts by bot-like and human behavior. See trade counts and full movement history so you know whether you can copy a wallet without needing a low-latency bot.",
    "In development: a flexible, low-latency bot you can run yourself.",
    "Bot & human behavior classification"],
  ["03", "CLASSIFICATION", "Know who you're following",
    "Knowing how to follow a profitable account is what matters. Each one has its own patterns of trading, gains, losses and risk. Choosing the wrong moment to follow one — entering late or failing to sell in time — can cost you money even when you're copying a winning account. Some trade fast, others manipulate price or liquidity. Understand their patterns and define your entry, exit and risk rules before you copy a single move.",
    "Add the wallets you want to track to a panel with their movements in real time. See how often they trade, watch their gains live, know which tokens they buy, and understand how to copy them the right way.", "",
    "Real-time alerts from profitable wallets"],
];

type Move = { id: number; trader: string; side: "BUY" | "SELL"; coin: string; qty: number; usd: number; time: string };

let idc = 0;
function randomMove(): Move {
  const t = TRADERS[Math.floor(Math.random() * TRADERS.length)] ?? TRADERS[0];
  const coin = Object.keys(COINS)[Math.floor(Math.random() * 6)] ?? "BONK";
  if (!t) throw new Error("No demo traders available");
  const usd = Math.round(50000 + Math.random() * 4950000);
  return {
    id: idc++, trader: t.name, coin, usd,
    side: Math.random() > 0.45 ? "BUY" : "SELL",
    qty: usd / (COINS[coin] ?? 1),
    time: new Date().toLocaleTimeString("en-US"),
  };
}
const fmt = (n: number) => n.toLocaleString("en-US", { maximumFractionDigits: n < 10 ? 2 : 0 });

function Index() {
  const [moves, setMoves] = useState<Move[]>([]);
  const [volume, setVolume] = useState(0);

  useEffect(() => {
    const init = Array.from({ length: 8 }, randomMove);
    setMoves(init);
    const iv = setInterval(() => {
      const m = randomMove();
      setMoves((p) => [m, ...p].slice(0, 14));
      setVolume((v) => v + m.usd);
    }, 1800);
    return () => clearInterval(iv);
  }, []);

  return (
    <main className="mx-auto max-w-[1440px] px-6 py-8 lg:px-10">
      <nav className="flex items-center justify-between">
        <span className="text-xl font-bold">🐋 Whale<span className="text-primary">Watch</span></span>
        <span className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
          <span className="h-2 w-2 rounded-full bg-gain animate-live" /> LIVE
        </span>
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
          In the memecoin market, access to a leaderboard of the highest-PnL wallets isn’t enough. Most aren’t consistent, they’re bots you can’t keep up with, or they fake volume to profit off you copying their moves. We give you insights and tools so a trader with limited resources can build a realistic strategy.
        </p>
        <Button asChild className="glow mt-7 h-12 px-6"><a href="#feed">See live movements ↗</a></Button>
        </div>
        <WalletPreview />
      </section>

      <section className="border-t py-16" aria-labelledby="market-title">
        <h2 id="market-title" className="max-w-4xl text-2xl font-bold leading-snug md:text-4xl">
          The first software built for <span className="text-accent">quality wallet tracking</span>.
        </h2>
        <p className="mt-5 max-w-3xl text-lg text-muted-foreground">
          The memecoin market moves billions of dollars a day and profitable wallets exist — what separates them from the losers is access to quality tools.
        </p>
        <h3 className="mt-12 text-xl font-semibold">
          If you trade memecoins, you already know this:
        </h3>
        <div className="problem-timeline mt-6">
          {IDEAS.map(([n, tag, t, d]) => (
            <article key={n} className="problem-item">
              <div className="problem-rail">
                <span className="problem-num" aria-hidden="true">{Number(n)}</span>
              </div>
              <div className="problem-body rounded-lg border bg-card p-6">
                <span className="font-mono text-xs text-accent">{tag}</span>
                <h3 className="mt-3 text-lg font-semibold">{t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d}</p>
              </div>
            </article>
          ))}
          <div className="solution-band">
            <h3 className="solution-band-title">Our solution</h3>
            <p className="mt-2 text-sm text-muted-foreground">Three tools that turn raw wallet data into a strategy you can actually run.</p>
          </div>
        </div>
        <div className="solution-rows">
          {IDEAS.map(([n, , , , solution, notice, solutionTitle]) => (
            <article key={n} className="solution-row" aria-label={`Our solution: ${solutionTitle}`}>
              <div className="solution-row-copy">
                <span className="font-mono text-xs text-accent">{n}</span>
                <h4 className="mt-2 text-2xl font-bold leading-snug">{solutionTitle}</h4>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground">{solution}</p>
                {notice && (
                  <p className="mt-5 border-l-2 border-accent pl-4 text-sm leading-relaxed">
                    <span className="block font-mono text-xs text-accent">IN DEVELOPMENT</span>
                    {notice}
                  </p>
                )}
              </div>
              <div className="solution-video" aria-label={`Video placeholder: ${solutionTitle}`}>
                <span className="font-mono text-xs text-muted-foreground">▶ VIDEO · {solutionTitle}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="feed" className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-lg border bg-card p-5 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-semibold">Real-time movements</h2>
            <span className="font-mono text-xs text-muted-foreground">Session volume: ${fmt(volume)}</span>
          </div>
          <div className="space-y-1 font-mono text-sm">
            {moves.map((m) => (
              <div key={m.id} className="animate-flash grid grid-cols-[70px_1fr_80px_1fr] items-center gap-2 rounded px-2 py-2 md:grid-cols-[80px_1fr_80px_1fr_1fr]">
                <span className="text-xs text-muted-foreground">{m.time}</span>
                <span className="truncate">{m.trader}</span>
                <span className={m.side === "BUY" ? "text-gain" : "text-loss"}>{m.side}</span>
                <span className="hidden md:block">{fmt(m.qty)} {m.coin}</span>
                <span className="text-right">${fmt(m.usd)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg border bg-card p-5">
          <h2 className="mb-4 font-semibold">Top traders (30d)</h2>
          <ol className="space-y-3">
            {TRADERS.map((t, i) => (
              <li key={t.name} className="flex items-center justify-between rounded bg-muted px-3 py-3">
                <span className="flex items-center gap-3">
                  <span className="font-mono text-accent">#{i + 1}</span>
                  <span>
                    <span className="block text-sm font-semibold">{t.name}</span>
                    <span className="text-xs text-muted-foreground">{t.win}% win rate</span>
                  </span>
                </span>
                <span className="font-mono text-gain">+${t.pnl}M</span>
              </li>
            ))}
          </ol>
        </div>
      </section>


      <footer className="border-t pt-6 text-center text-xs text-muted-foreground">
        Demo data. Not financial advice.
      </footer>
    </main>
  );
}
