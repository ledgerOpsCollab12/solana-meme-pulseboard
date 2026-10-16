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

const IDEAS: [string, string, string, string, string, string][] = [
  ["01", "SUERTE NO ES MÉTODO", "Un leaderboard te miente",
    "Cualquiera le atina a un token que se dispara de la noche a la mañana. Una ganancia enorme no prueba consistencia — y copiar a quien solo tuvo suerte es, casi siempre, perder dinero.",
    "Permitimos que filtres wallets no solo por PnL, sino por win rate, ROI, cantidad invertida, etc. Todos estos datos te permiten seguir a las cuentas más consistentes y entender qué características comparten entre ellas.", ""],
  ["02", "VELOCIDAD", "Si llegas tarde, pierdes",
    "Los bots operan a velocidades que un trader con herramientas limitadas no puede imitar.",
    "Clasificamos las cuentas con comportamiento de humano y de bot. Permitimos visualizar el número de trades y acceder a su historial de movimientos para que sepas si puedes imitar sus movimientos sin necesidad de un bot altamente preciso.",
    "Estamos trabajando en nuestra próxima funcionalidad: integrar un bot flexible y de baja latencia que puedas utilizar."],
  ["03", "CLASIFICACIÓN", "Entiende a quién sigues",
    "En el copy trading no es suficiente con seguir a una wallet ganadora, sino entender su estrategia para que las emociones no te ganen en las turbulencias. Entender su estrategia te permite asumir un riesgo controlado y, sobre todo, saber cómo seguirla.",
    "Una vez que elijas las wallets que quieres trackear, agrégalas a un panel donde veas sus movimientos en tiempo real. Esto te permite analizar con qué frecuencia operan, ver sus ganancias en tiempo real, conocer el tipo de tokens en los que invierten y entender cómo debes operar para copiarlas de la mejor manera posible.", ""],
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
        <h2 id="market-title" className="max-w-5xl text-2xl font-bold leading-snug md:text-4xl">
          El mercado de las memecoins tiene un volumen de billones de dólares al día, existen cuentas con ganancias, lo que las separa de las perdedoras es el acceso a <span className="text-accent">herramientas de calidad.</span>
        </h2>
        <p className="mt-5 max-w-3xl text-lg text-muted-foreground">
          Somos el primer software pensado para un tracking de calidad de wallets.
        </p>
        <h3 className="mt-12 text-xl font-semibold">
          Si eres un trader de memecoins seguramente sabes lo siguiente:
        </h3>
        <div className="problem-solution-grid mt-6">
          {IDEAS.map(([n, tag, t, d, solution, notice]) => (
            <div key={n} className="problem-solution-column">
            <article className="problem-card rounded-lg border bg-card p-6">
              <span className="font-mono text-xs text-accent">{n} · {tag}</span>
              <h3 className="mt-3 text-lg font-semibold">{t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d}</p>
            </article>
            <div className="solution-connector">
              <span className="solution-arrow" aria-hidden="true">↓</span>
              <h4 className="font-mono text-xs font-semibold uppercase text-accent">Nuestra solución</h4>
              <span className="solution-arrow" aria-hidden="true">↓</span>
            </div>
            <article className="solution-card rounded-lg border bg-card p-6" aria-label={`Nuestra solución: ${t}`}>
              <p className="text-sm leading-relaxed">{solution}</p>
              {notice && (
                <aside className="mt-5 border-t pt-4">
                  <span className="font-mono text-xs text-accent">EN DESARROLLO</span>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{notice}</p>
                </aside>
              )}
            </article>
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
