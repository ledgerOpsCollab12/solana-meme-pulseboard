import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "WhaleWatch — Movimientos en vivo de los mejores traders cripto" },
      { name: "description", content: "Visualiza en tiempo real las compras y ventas de las cuentas más rentables en criptomonedas." },
      { property: "og:title", content: "WhaleWatch — Traders cripto en tiempo real" },
      { property: "og:description", content: "Sigue cada movimiento de las ballenas más rentables del mercado cripto." },
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
  { name: "0xAlpha.eth", pnl: 48.2, win: 81 },
  { name: "SatoshiGhost", pnl: 37.9, win: 76 },
  { name: "WhaleKing_88", pnl: 29.4, win: 72 },
  { name: "DeFiSensei", pnl: 22.1, win: 69 },
  { name: "LunaHunter", pnl: 17.6, win: 66 },
];
const COINS: Record<string, number> = { BTC: 67250, ETH: 3480, SOL: 172, BNB: 590, XRP: 0.58, DOGE: 0.16 };

type Move = { id: number; trader: string; side: "COMPRA" | "VENTA"; coin: string; qty: number; usd: number; time: string };

let idc = 0;
function randomMove(): Move {
  const t = TRADERS[Math.floor(Math.random() * TRADERS.length)];
  const coin = Object.keys(COINS)[Math.floor(Math.random() * 6)];
  const usd = Math.round(50000 + Math.random() * 4950000);
  return {
    id: idc++, trader: t.name, coin, usd,
    side: Math.random() > 0.45 ? "COMPRA" : "VENTA",
    qty: usd / COINS[coin],
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
    <main className="mx-auto max-w-6xl px-6 py-10">
      <nav className="flex items-center justify-between">
        <span className="text-xl font-bold">🐋 Whale<span className="text-primary">Watch</span></span>
        <span className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
          <span className="h-2 w-2 rounded-full bg-gain animate-live" /> EN VIVO
        </span>
      </nav>

      <section className="py-16 text-center">
        <h1 className="text-4xl font-bold leading-tight md:text-6xl">
          Mira lo que hacen <span className="text-primary">las ballenas</span>,<br />en el momento en que lo hacen.
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-muted-foreground">
          Rastreamos las cuentas más rentables del mercado cripto y te mostramos cada compra y venta en tiempo real.
        </p>
        <a href="#feed" className="glow mt-8 inline-block rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground transition hover:opacity-90">
          Ver movimientos en vivo
        </a>
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

      <section className="grid gap-6 py-16 md:grid-cols-3">
        {[
          ["Datos al segundo", "Cada transacción aparece apenas ocurre en la blockchain."],
          ["Solo los mejores", "Filtramos cuentas por rentabilidad y consistencia comprobada."],
          ["Alertas inteligentes", "Recibe avisos cuando una ballena mueve más de $1M."],
        ].map(([t, d]) => (
          <div key={t} className="rounded-lg border p-6">
            <h3 className="font-semibold text-primary">{t}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{d}</p>
          </div>
        ))}
      </section>

      <footer className="border-t pt-6 text-center text-xs text-muted-foreground">
        Datos de demostración. No constituye asesoría financiera.
      </footer>
    </main>
  );
}
