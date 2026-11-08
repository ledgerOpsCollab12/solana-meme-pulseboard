import { useEffect, useRef, useState } from "react";
import { Activity, ArrowRight, Award, Bell, BookOpen, ChevronRight, Coins, Pause, Play, RotateCcw, Search, Users, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { REFERENCE_COLUMNS } from "@/lib/wallet-reference";
import { getRecordedSnapshot, SIMULATION_METRICS, SIMULATION_PERIODS, SIMULATION_SUMMARY, type SimulationMetric, type SimulationPeriod } from "@/lib/interactive-wallet-reference";
import { getGuidedTour, nextGuidedStep } from "@/lib/guided-wallet-tour";
import { RecordedWalletPanels } from "@/components/recorded-wallet-panels";

export function WalletInterfaceTour() {
  const host = useRef<HTMLDivElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const elapsed = useRef(0);
  const [time, setTime] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [visible, setVisible] = useState(false);
  const [ready, setReady] = useState(false);
  const [period, setPeriod] = useState<SimulationPeriod>("ALL");
  const [metric, setMetric] = useState<SimulationMetric>("P&L");
  const [panel, setPanel] = useState<"wallet" | "alerts" | null>(null);
  const [tracked, setTracked] = useState(false);
  const [connectors, setConnectors] = useState<string[]>([]);
  const { stage, index, progress } = getGuidedTour(time);
  const snapshot = getRecordedSnapshot(period, metric);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const change = () => setReduced(media.matches);
    change(); media.addEventListener("change", change);
    const element = host.current;
    const refresh = () => {
      if (!element) return;
      const rect = element.getBoundingClientRect();
      setVisible(!element.closest(".holo-product")?.hasAttribute("inert") && rect.bottom > 0 && rect.top < window.innerHeight);
      setReady(element.closest(".integrated-interface")?.getAttribute("data-presentation-ready") === "true");
    };
    const observer = new IntersectionObserver(refresh, { threshold: .3 });
    if (element) observer.observe(element);
    const mutation = new MutationObserver(refresh);
    const parent = element?.closest(".holo-product");
    if (parent) mutation.observe(parent, { subtree: true, attributes: true, attributeFilter: ["inert", "data-presentation-ready"] });
    refresh();
    return () => { observer.disconnect(); mutation.disconnect(); media.removeEventListener("change", change); };
  }, []);

  useEffect(() => {
    if (paused || reduced || !visible || !ready || stage.finished) return;
    let last = performance.now();
    const timer = window.setInterval(() => {
      const now = performance.now();
      if (!document.hidden) { elapsed.current += Math.min(now - last, 150); setTime(elapsed.current); }
      last = now;
    }, 100);
    return () => window.clearInterval(timer);
  }, [paused, reduced, visible, ready, stage.finished]);

  useEffect(() => {
    if (stage.period) setPeriod(stage.period);
    if (stage.metric) setMetric(stage.metric);
    setPanel(stage.panel ?? null);
    if (stage.id === "track" || stage.id === "alerts") setTracked(true);
    if (stage.id === "coverage") setTracked(false);
    const scroll = viewport.current;
    scroll?.scrollTo({ left: 0, top: 0, behavior: "instant" });
    if (!scroll || reduced) return;
    const timer = window.setTimeout(() => {
      if (stage.scroll === "right") scroll.scrollTo({ left: scroll.scrollWidth - scroll.clientWidth, behavior: "smooth" });
      if (stage.scroll === "down") scroll.scrollTo({ top: Math.min(145, scroll.scrollHeight - scroll.clientHeight), behavior: "smooth" });
    }, 2200);
    return () => window.clearTimeout(timer);
  }, [stage, reduced]);

  useEffect(() => {
    const root = host.current;
    if (!root) return;
    if (panel && !stage.panel) { setConnectors([]); return; }
    const dock = root.closest(".holo-sticky")?.querySelector(".persistent-live-dock");
    dock?.setAttribute("data-tour-complete", String(Boolean(stage.finished)));
    const draw = () => {
      const note = root.querySelector<HTMLElement>(".simulation-guide-message");
      if (!note) return;
      const bounds = root.getBoundingClientRect();
      const b = note.getBoundingClientRect();
      const paths = stage.targets.flatMap(selector => {
        const target = root.querySelector<HTMLElement>(selector);
        if (!target) return [];
        const a = target.getBoundingClientRect();
        if (a.right < bounds.left || a.left > bounds.right || a.top > bounds.bottom) return [];
        const x = Math.max(12, Math.min(bounds.width - 12, a.left - bounds.left + a.width / 2));
        const y = a.top - bounds.top;
        const endX = b.left - bounds.left + Math.min(b.width - 12, Math.max(12, x - (b.left - bounds.left)));
        const endY = b.bottom - bounds.top;
        return [`M ${x} ${y} L ${x} ${endY + 6} L ${endX} ${endY + 6} L ${endX} ${endY}`];
      });
      setConnectors(paths);
    };
    const observer = new ResizeObserver(draw); observer.observe(root);
    const scroll = viewport.current; scroll?.addEventListener("scroll", draw, { passive: true });
    const timer = window.setTimeout(draw, 300); draw();
    return () => { observer.disconnect(); scroll?.removeEventListener("scroll", draw); clearTimeout(timer); dock?.removeAttribute("data-tour-complete"); };
  }, [stage, panel, period, metric]);

  const seek = (value: number) => { elapsed.current = value; setTime(value); };
  const selectPeriod = (value: SimulationPeriod) => { setPeriod(value); viewport.current?.scrollTo({ top: 0, left: 0, behavior: "instant" }); };
  const selectMetric = (value: SimulationMetric) => { setMetric(value); viewport.current?.scrollTo({ top: 0, left: 0, behavior: "instant" }); };
  const icons = [Coins, Wallet, Activity, Users];
  const controlsActive = ready && stage.id !== "coverage" && !stage.finished;
  return <div ref={host} className="wallet-interface-tour interactive-wallet-tour" data-tour-stage={stage.id} data-period={period} data-metric={metric} aria-label="Guided interactive tracker simulation">
    <div className="replica-panel">
      <div className="replica-nav">
        <strong><Activity /><span>Memecoin</span> Screener</strong>
        <div className="replica-nav-tabs" aria-hidden="true"><b>Top Traders</b><span>Tokens</span><span>New Pools · LIVE</span></div>
        <span className="replica-connect" aria-hidden="true"><Wallet /> Connect Wallet</span><span className="replica-search" aria-hidden="true"><Search /> Search wallet, tag or type...</span>
        <Button data-notification-bell variant="ghost" size="icon" className={`replica-bell ${stage.id === "track" ? "simulation-target" : ""}`} aria-label="Open simulated wallet alerts" onClick={() => setPanel("alerts")}><Bell /><small>{tracked ? 1 : 0}</small></Button><BookOpen aria-hidden="true" />
      </div>
      <div className="simulation-guide-band">
        <div className="simulation-guide-heading"><span>TRACKER SIMULATION <i /> {String(index + 1).padStart(2, "0")} / 14</span><div className="tour-controls">
          <Button variant="ghost" size="icon" aria-label="Restart interface animation" title="Restart" onClick={() => seek(0)}><RotateCcw /></Button>
          {!reduced && <Button variant="ghost" size="icon" aria-label={paused ? "Play interface animation" : "Pause interface animation"} title={paused ? "Play" : "Pause"} onClick={() => setPaused(value => !value)}>{paused ? <Play /> : <Pause />}</Button>}
          <Button variant="ghost" size="icon" aria-label="Next interface explanation" title="Next explanation" onClick={() => seek(nextGuidedStep(time))}><ChevronRight /></Button>
        </div></div>
        <p className="simulation-guide-message">{stage.message}</p><progress max={1} value={progress} aria-label="Guided tour progress" />
      </div>
      <div className="replica-body">
        <div className="replica-title"><h3>Top Traders</h3><p>Analyze the most profitable wallets and filter by performance metrics.</p></div>
        {stage.id === "coverage" && <div className="replica-summary">{SIMULATION_SUMMARY.map((item, itemIndex) => {
          const Icon = icons[itemIndex] ?? Activity;
          return <div key={item.label} data-summary={itemIndex} className={itemIndex === 1 || itemIndex === 3 ? "tour-circled" : ""}><span>{item.label}<Icon /></span><strong>{item.value}</strong>{"detail" in item && <small>{item.detail}</small>}</div>;
        })}</div>}
        <div className="replica-performance"><h4>Trader Performance</h4><p>Filter and sort the performance of tracked wallets.</p></div>
        <div className="replica-filters">
          <div><small>METRIC</small><div data-filter-group="metric" className={controlsActive ? "simulation-active-filters" : ""}>{SIMULATION_METRICS.map(value => <Button variant="ghost" key={value} data-metric={value} aria-pressed={metric === value} className={metric === value ? "selected" : ""} onClick={() => selectMetric(value)}>{value}</Button>)}</div></div>
          <div><small>PERIOD</small><div data-filter-group="period" className={controlsActive ? "simulation-active-filters" : ""}>{SIMULATION_PERIODS.map(value => <Button variant="ghost" key={value} data-period={value} aria-pressed={period === value} className={period === value ? "selected" : ""} onClick={() => selectPeriod(value)}>{value}</Button>)}</div></div>
          <div><small>TYPE</small><div><span>All Traders (100)</span></div></div>
        </div>
        <div ref={viewport} className="replica-table-scroll" tabIndex={0} aria-label="Recorded wallet metrics table">
          <table className="replica-table"><thead><tr><th className="replica-trader-cell">TRADER</th>{REFERENCE_COLUMNS.map((name, column) => <th key={name} data-metric-header={column}><span>{name}</span></th>)}</tr></thead><tbody>
            {snapshot?.rows.map((row, rowIndex) => <tr key={row.wallet}>
              <td className="replica-trader-cell"><div className="replica-identity"><span className="replica-rank">{rowIndex + 1}</span><span className={`replica-medal medal-${rowIndex}`}>{rowIndex < 3 ? <Award /> : rowIndex + 1}</span><div>
                {row.wallet.startsWith("5gp2JS") ? <Button variant="ghost" data-wallet={row.wallet} className={stage.id === "wallet" ? "simulation-target" : ""} onClick={() => setPanel("wallet")}>{row.wallet}</Button> : <strong>{row.wallet}</strong>}
                <span data-classification={row.classification} className={stage.id === "types" && (row.classification === "PROFITABLE" || row.classification === "BOT_PROFITABLE") ? "simulation-target" : ""}>{row.classification}</span><small>{row.values[3]}</small>
              </div></div></td>
              {row.values.map((value, column) => <td key={column}><span data-metric-value={rowIndex === 0 ? column : undefined} className={[value?.startsWith("+") ? "replica-positive" : value?.startsWith("-") ? "replica-negative" : "", column === 0 ? "replica-pnl" : "", column === 3 ? "replica-score" : "", stage.id === "quality" && rowIndex === 0 && column === 1 ? "simulation-target" : ""].join(" ")}>{value ?? "—"}</span></td>)}
            </tr>)}
          </tbody></table>
          {!snapshot && <div className="simulation-unrecorded" role="status">This filter combination is not documented in the recording.</div>}
        </div>
        <div className="simulation-table-status"><span>{snapshot ? `${snapshot.rows.length} verified reference rows · ${period} / ${metric}` : "No substituted data"}</span><ArrowRight aria-label="More columns to the right" /></div>
      </div>
      <RecordedWalletPanels panel={panel} tracked={tracked} highlight={stage.id === "detail" || stage.id === "alerts"} onTrack={() => setTracked(true)} onClose={() => setPanel(null)} />
      {stage.finished && <div className="simulation-finished"><p>{stage.message}</p><Button variant="outline" onClick={() => seek(0)}><RotateCcw /> Replay simulation</Button></div>}
    </div>
    {ready && <svg className="tour-connector simulation-connectors" aria-hidden="true"><defs><marker id="wallet-tour-arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M 0 0 L 7 4 L 0 8" /></marker></defs>{connectors.map((path, pathIndex) => <path key={pathIndex} d={path} markerEnd="url(#wallet-tour-arrow)" />)}</svg>}
  </div>;
}
