import { useEffect, useRef, useState } from "react";
import { Activity, Award, Bell, BookOpen, ChevronRight, CircleHelp, Coins, Pause, Play, RotateCcw, Search, Users, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { REFERENCE_COLUMNS, REFERENCE_ROWS, REFERENCE_SUMMARY } from "@/lib/wallet-reference";
import { getWalletTour, nextWalletTourStep } from "@/lib/wallet-tour";

export function WalletInterfaceTour() {
  const host = useRef<HTMLDivElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const elapsed = useRef(0);
  const [time, setTime] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [visible, setVisible] = useState(false);
  const [connector, setConnector] = useState("");
  const state = getWalletTour(time);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const change = () => setReduced(media.matches);
    change();
    media.addEventListener("change", change);
    const element = host.current;
    const observer = new IntersectionObserver(([entry]) => {
      const product = element?.closest(".holo-product");
      setVisible(Boolean(entry?.isIntersecting) && !product?.hasAttribute("inert"));
    }, { threshold: 0.5 });
    if (element) observer.observe(element);
    // The parent reveal uses inert while hidden in the same viewport.
    const mutation = new MutationObserver(() => {
      if (!element) return;
      const rect = element.getBoundingClientRect();
      setVisible(!element.closest(".holo-product")?.hasAttribute("inert") && rect.bottom > 0 && rect.top < window.innerHeight);
    });
    const parent = element?.closest(".holo-product");
    if (parent) mutation.observe(parent, { attributes: true, attributeFilter: ["inert"] });
    return () => { observer.disconnect(); mutation.disconnect(); media.removeEventListener("change", change); };
  }, []);

  useEffect(() => {
    if (paused || reduced || !visible) return;
    let last = performance.now();
    const timer = window.setInterval(() => {
      const now = performance.now();
      if (!document.hidden) {
        elapsed.current += Math.min(now - last, 150);
        setTime(elapsed.current);
      }
      last = now;
    }, 100);
    return () => window.clearInterval(timer);
  }, [paused, reduced, visible]);

  useEffect(() => {
    const root = host.current;
    const scroll = viewport.current;
    if (!root || !scroll) return;
    const cell = root.querySelector<HTMLElement>(`[data-metric-header="${state.column}"]`);
    const pinnedWidth = root.querySelector<HTMLElement>(".replica-trader-cell")?.offsetWidth ?? 265;
    const target = state.stage === "metrics" && cell ? Math.max(0, cell.offsetLeft - pinnedWidth - 8) : 0;
    scroll.scrollTo({ left: target, top: 0, behavior: reduced ? "instant" : "smooth" });
  }, [state.stage, state.column, reduced]);

  useEffect(() => {
    const root = host.current;
    if (!root) return;
    const draw = () => {
      const selector = state.stage === "coverage" ? '[data-summary="1"]' : state.stage === "leaderboard" ? ".replica-table-scroll" : `[data-metric-value="${state.column}"]`;
      const target = root.querySelector<HTMLElement>(selector);
      const note = root.querySelector<HTMLElement>(".tour-explanation");
      const panel = root.querySelector<HTMLElement>(".replica-panel");
      if (!target || !note || !panel) return;
      const bounds = root.getBoundingClientRect();
      const a = target.getBoundingClientRect();
      const b = note.getBoundingClientRect();
      const p = panel.getBoundingClientRect();
      const x = Math.min(p.right - bounds.left - 15, Math.max(p.left - bounds.left + 15, a.left - bounds.left + a.width / 2));
      const y = a.bottom - bounds.top;
      const endX = b.left - bounds.left + 28;
      const endY = b.top - bounds.top;
      setConnector(`M ${x} ${y} L ${x} ${p.bottom - bounds.top + 12} L ${endX} ${p.bottom - bounds.top + 12} L ${endX} ${endY - 5}`);
    };
    const observer = new ResizeObserver(draw);
    observer.observe(root);
    const scroll = viewport.current;
    scroll?.addEventListener("scroll", draw, { passive: true });
    const timer = window.setTimeout(draw, 100);
    draw();
    return () => { observer.disconnect(); scroll?.removeEventListener("scroll", draw); clearTimeout(timer); };
  }, [state.stage, state.column]);

  const seek = (value: number) => { elapsed.current = value; setTime(value); };
  const message = state.stage === "coverage" ? "We collect all token transactions in real time from all active wallets." : state.stage === "leaderboard" ? "You can select a period of time and view the wallets with the highest PnL." : "View data to measure the quality of each wallet, such as";
  const icons = [Coins, Wallet, Activity, Users];

  return (
    <div ref={host} className="wallet-interface-tour" data-tour-stage={state.stage} data-tour-column={state.column} aria-label="Animated reference wallet interface">
      <div className="replica-panel">
        <div className="replica-nav" aria-hidden="true">
          <strong><Activity /><span>Memecoin</span> Screener</strong>
          <div className="replica-nav-tabs"><b>Top Traders</b><span>Tokens</span><span>New Pools · LIVE</span></div>
          <span className="replica-connect"><Wallet /> Connect Wallet</span><span className="replica-search"><Search /> Search wallet, tag or type...</span><span className="replica-bell"><Bell /><small>12</small></span><BookOpen />
        </div>
        <div className="replica-body">
          <div className="replica-title"><h3>Top Traders</h3><p>Analyze the most profitable wallets and filter by performance metrics.</p></div>
          <div className="replica-summary">
            {REFERENCE_SUMMARY.map((item, index) => {
              const Icon = icons[index] ?? Activity;
              return <div key={item.label} data-summary={index} className={state.stage === "coverage" && (index === 1 || index === 3) ? "tour-circled" : ""}><span>{item.label}<Icon /></span><strong>{item.value}</strong>{"detail" in item && <small>{item.detail}</small>}</div>;
            })}
          </div>
          <div className="replica-performance"><h4>Trader Performance</h4><p>Filter and sort the performance of tracked wallets.</p></div>
          <div className="replica-filters" aria-hidden="true">
            <div><small>METRIC</small><div>{["P&L", "Win Rate", "ROI %", "Score", "Trades", "Invested", "Best Trade"].map((label, index) => <span key={label} className={index === 0 ? "selected" : ""}>{label}</span>)}</div></div>
            <div><small>PERIOD</small><div>{["1H", "6H", "24H", "7D", "30D", "ALL"].map(label => <span key={label} className={label === "ALL" ? "selected" : ""}>{label}</span>)}</div></div>
            <div><small>TYPE</small><div><span>All Traders (100)</span></div></div>
          </div>
          <div ref={viewport} className={`replica-table-scroll ${state.stage === "leaderboard" ? "tour-list-ring" : ""}`} tabIndex={0} aria-label="Recorded wallet metrics table">
            <table className="replica-table"><thead><tr><th className="replica-trader-cell">TRADER</th>{REFERENCE_COLUMNS.map((name, column) => <th key={name} data-metric-header={column}><span className={state.column === column ? "tour-circled" : ""}>{name}</span></th>)}</tr></thead><tbody>
              {REFERENCE_ROWS.map((row, index) => <tr key={row.wallet} className={state.stage === "metrics" && index === 0 ? "replica-followed" : ""}>
                <td className="replica-trader-cell"><div className={`replica-identity ${state.stage === "metrics" && index === 0 ? "tour-circled" : ""}`}><span className="replica-rank">{index + 1}</span><span className={`replica-medal medal-${index}`} >{index < 3 ? <Award /> : index + 1}</span><div><strong>{row.wallet}</strong><span><CircleHelp /> BOT_PROFITABLE</span><small>{row.values[3]}</small></div></div></td>
                {row.values.map((value, column) => <td key={column}><span data-metric-value={index === 0 ? column : undefined} className={[value.startsWith("+") ? "replica-positive" : value.startsWith("-") ? "replica-negative" : "", column === 0 ? "replica-pnl" : "", column === 3 ? "replica-score" : "", state.column === column && index === 0 ? "tour-circled" : ""].join(" ")}>{value}{column === 1 && <i className={index === 2 ? "replica-rate low" : "replica-rate"} />}</span></td>)}
              </tr>)}
            </tbody></table>
          </div>
        </div>
      </div>
      <svg className="tour-connector" aria-hidden="true"><defs><marker id="wallet-tour-arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M 0 0 L 7 4 L 0 8" /></marker></defs><path d={connector} markerEnd="url(#wallet-tour-arrow)" /></svg>
      <div className="tour-footer">
        <div className="tour-explanation"><span className="tour-stage-label">{state.stage === "coverage" ? "01 / COVERAGE" : state.stage === "leaderboard" ? "02 / WALLET SELECTION" : "03 / WALLET QUALITY"}</span><p>{message}{state.stage === "metrics" && <strong> {REFERENCE_COLUMNS[state.column]?.toLowerCase()}.</strong>}</p></div>
        <div className="tour-controls">
          <Button type="button" variant="ghost" size="icon" aria-label="Restart interface animation" title="Restart" onClick={() => seek(0)}><RotateCcw /></Button>
          {!reduced && <Button type="button" variant="ghost" size="icon" aria-label={paused ? "Play interface animation" : "Pause interface animation"} title={paused ? "Play" : "Pause"} onClick={() => setPaused(value => !value)}>{paused ? <Play /> : <Pause />}</Button>}
          <Button type="button" variant="ghost" size="icon" aria-label="Next interface explanation" title="Next explanation" onClick={() => seek(nextWalletTourStep(time))}><ChevronRight /></Button>
        </div>
      </div>
    </div>
  );
}