import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { WalletPreview } from "@/components/wallet-preview";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "WhaleWatch — Profitable memecoin wallets, in real time" },
      { name: "description", content: "Track the most profitable memecoin trading wallets on Solana for free. Understand consistency, behavior, and win rate before building your strategy." },
      { property: "og:title", content: "WhaleWatch — Profitable memecoin wallets, in real time" },
      { property: "og:description", content: "Real-time wallet movements, insights, and tools to understand how profitable memecoin traders trade." },
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

const IDEAS: [string, string, string, string][] = [
  ["01", "SUERTE NO ES MÉTODO", "Un leaderboard te miente",
    "Cualquiera le atina a un token que se dispara de la noche a la mañana. Una ganancia enorme no prueba consistencia — y copiar a quien solo tuvo suerte es, casi siempre, perder dinero."],
  ["02", "VELOCIDAD", "Si llegas tarde, pierdes",
    "Los bots de alta frecuencia entran y salen en milisegundos. Para que el dato sirva, tu orden tiene que moverse al mismo tiempo que la de ellos: por eso el feed se actualiza al segundo, sin retrasos."],
  ["03", "CLASIFICACIÓN", "Sabe a quién seguir",
    "Clasificamos cada wallet por comportamiento, consistencia y otras señales — no solo por su ganancia total. Somos el primero en hacerlo así."],
];

type Move = { id: number; trader: string; side: "COMPRA" | "VENTA"; coin: string; qty: number; usd: number; time: string };

let idc = 0;
function randomMove(): Move {
  const t = TRADERS[Math.floor(Math.random() * TRADERS.length)] ?? TRADERS[0];
  const coin = Object.keys(COINS)[Math.floor(Math.random() * 6)] ?? "BONK";
  if (!t) throw new Error("No demo traders available");
  const usd = Math.round(50000 + Math.random() * 4950000);
  return {
    id: idc++, trader: t.name, coin, usd,
    side: Math.random() > 0.45 ? "COMPRA" : "VENTA",
    qty: usd / (COINS[coin] ?? 1),
    time: new Date().toLocaleTimeString("es-MX"),
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
          <span className="h-2 w-2 rounded-full bg-gain animate-live" /> EN VIVO
        </span>
      </nav>

      <section className="hero-layout">
        <div className="hero-copy">
        <span className="inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1 font-mono text-xs text-muted-foreground">
          <span className="h-2 w-2 rounded-full bg-gain animate-live" /> LIVE · SOLANA BLOCKCHAIN · FREE
        </span>
        <h1 className="mt-6 text-left text-4xl font-bold leading-[1.12] lg:text-5xl">
          See the movements of the <span className="text-accent">most profitable</span> memecoin trading wallets in real time.
        </h1>
        <p className="mt-6 max-w-xl text-left text-base leading-relaxed text-muted-foreground">
          We don’t just show you a leaderboard of the most profitable wallets. We give you insights and tools to segment them by consistency, behavior, win rate, and more, along with tools to understand how they trade—so you’re not following wallets blindly, but learning how to build a safer strategy.
        </p>
        <Button asChild className="glow mt-7 h-12 px-6"><a href="#feed">View live movements ↗</a></Button>
        </div>
        <WalletPreview />
      </section>

      <section className="border-t py-16">
        <h2 className="max-w-3xl text-2xl font-bold leading-snug md:text-4xl">
          No mostramos un leaderboard.
          <span className="text-muted-foreground"> Integramos las herramientas para que un trader normal le saque provecho.</span>
        </h2>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {IDEAS.map(([n, tag, t, d]) => (
            <div key={n} className="rounded-lg border bg-card p-6">
              <span className="font-mono text-xs text-accent">{n} · {tag}</span>
              <h3 className="mt-3 text-lg font-semibold">{t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="feed" className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-lg border bg-card p-5 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-semibold">Movimientos en tiempo real</h2>
            <span className="font-mono text-xs text-muted-foreground">Volumen sesión: ${fmt(volume)}</span>
          </div>
          <div className="space-y-1 font-mono text-sm">
            {moves.map((m) => (
              <div key={m.id} className="animate-flash grid grid-cols-[70px_1fr_80px_1fr] items-center gap-2 rounded px-2 py-2 md:grid-cols-[80px_1fr_80px_1fr_1fr]">
                <span className="text-xs text-muted-foreground">{m.time}</span>
                <span className="truncate">{m.trader}</span>
                <span className={m.side === "COMPRA" ? "text-gain" : "text-loss"}>{m.side}</span>
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
                    <span className="text-xs text-muted-foreground">{t.win}% aciertos</span>
                  </span>
                </span>
                <span className="font-mono text-gain">+${t.pnl}M</span>
              </li>
            ))}
          </ol>
        </div>
      </section>


      <footer className="border-t pt-6 text-center text-xs text-muted-foreground">
        Datos de demostración. No constituye asesoría financiera.
      </footer>
    </main>
  );
}
