import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Code2, MessageSquare, Sparkles } from "lucide-react";
import { RequestForm } from "@/components/request-form";
import { PROGRAM_URL } from "@/lib/request-schema";
import { EditorialSolutions } from "@/components/editorial-solutions";
import { ScrollIntro } from "@/components/scroll-intro";
import { Button } from "@/components/ui/button";
import solution01Video from "@/assets/solution-01-annotated.mp4.asset.json";
import { SiteFooter } from "@/components/site-footer";
import { UpcomingPage } from "@/components/upcoming/upcoming-page";

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
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&family=Manrope:wght@400;500;600&family=Space+Grotesk:wght@400;600;700&display=swap" },
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

function CtaStrip({ idx, title, text, href = PROGRAM_URL, label = "Open the live tracker", external = true }: { idx: string; title: string; text: string; href?: string; label?: string; external?: boolean }) {
  return (
    <aside className="ed-cta">
      <span className="up-eyebrow">{idx}</span>
      <div><h3>{title}</h3><p>{text}</p></div>
      <Button asChild size="lg"><a href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{label} <ArrowUpRight /></a></Button>
    </aside>
  );
}

function Index() {

  return (
    <main className="landing-main mx-auto max-w-[1360px] px-5 lg:px-10">
      <ScrollIntro />
      <nav className="site-nav" aria-label="Main navigation">
        <div className="site-nav-actions">
          <Button asChild variant="outline"><a href="#decoding"><MessageSquare /> Decoding memecoin market for you</a></Button>
          <div className="tracker-access">
            <Button asChild className="nav-tracker"><a href={PROGRAM_URL} target="_blank" rel="noopener noreferrer">Open the live tracker <ArrowUpRight /></a></Button>
            <Button asChild className="nav-tracker"><a href={PROGRAM_URL} target="_blank" rel="noopener noreferrer">Login <ArrowUpRight /></a></Button>
          </div>
          <Button asChild variant="outline"><a href="#api-access"><Sparkles /> Request a tailored feature</a></Button>
          <Button asChild variant="outline"><a href="#api-access"><Code2 /> API access</a></Button>
        </div>
      </nav>

      <div className="ed-home-story">
      <section className="ed-quality">
        <p className="up-eyebrow">WALLET INTELLIGENCE</p>
        <h2>The first software built<br/>for <em>quality wallet tracking.</em></h2>
        <p>The memecoin market moves billions of dollars a day and profitable wallets exist — what separates them from the losers is access to quality tools.</p>
        <div className="ed-problems">{PROBLEMS.map(problem => <article key={problem.n}><p className="up-eyebrow">{problem.n} / THE PROBLEM</p><h3>{problem.title}</h3><p>{problem.description}</p></article>)}</div>
      </section>
      <CtaStrip idx="THE NEXT STEP" title="Stop copying blind." text="Filter wallets by consistency, win rate and behavior before you follow a single trade." />
      <EditorialSolutions solutions={SOLUTIONS} videoUrl={solution01Video.url} />
      <CtaStrip idx="REAL-TIME ALERTS" title="Get the alerts before the pump." text="Add profitable wallets to your panel and see every move as it happens." label="Start tracking free" />
      <CtaStrip idx="BUILD WITH OUR DATA" title="Need the raw data?" text="Real-time API and tools built for your strategy." href="#api-access" label="Request API access" external={false} />

      <UpcomingPage embedded />

      <section id="api-access" className="ed-contact" aria-labelledby="api-title">
        <div><p className="up-eyebrow">BUILD / API & CUSTOM</p><h2 id="api-title">Blockchain data<br/><em>on your terms.</em></h2><p className="mt-5 text-base leading-relaxed text-muted-foreground">We provide real-time API access tailored to your needs. Whether you're building low-latency trading tools or need specific wallet and token data, we've got you covered. You can also request custom features built for your use case, and we'll work with you to find the best pricing.</p></div>
        <RequestForm kind="api" />
      </section>
      <section id="decoding" className="ed-contact" aria-labelledby="decoding-title">
        <div><p className="up-eyebrow">COMMUNITY</p><h2 id="decoding-title">Decoding memecoin<br/><em>market for you.</em></h2><p className="mt-5 text-base leading-relaxed text-muted-foreground">Most traders don't have the infrastructure to analyze wallet and token data the way they want. We're changing that by letting our community shape what we build. Every month, we'll develop a new feature based on your suggestions. Submit your ideas, and we'll select the best or most requested one. The winning feature will be announced here and shared with you by email.</p></div>
        <RequestForm kind="recommendation" />
      </section>

      <div className="mt-10"><CtaStrip idx="CTA/05" title="Still reading? The wallets aren’t." text="Free, real-time, on Solana." /></div>

      </div>
      <SiteFooter />
    </main>
  );
}
