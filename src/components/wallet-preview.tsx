import { useEffect, useState } from "react";
import { Activity, Award, Bell, Copy, ExternalLink, Pause, Play, Trash2, Wallet, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { nextPreviewStage, PREVIEW_INTERVAL_MS } from "@/lib/preview-cycle";

const wallets = [
  ["5gp2JS...ExjG", "54,750.1", "89.2", "213.0", "60", "64,970"],
  ["AHcTvK...v3K3", "22,282.7", "90.7", "530.4", "54", "9,368"],
  ["5K3N1v...iTUT", "19,425.9", "46.1", "842.5", "45", "2,587"],
  ["Hgzeyu...wky7", "8,626.3", "85.3", "323.2", "60", "2,632"],
  ["9DY29n...Pfgt", "6,863.8", "100.0", "192.5", "60", "14,331"],
  ["rBAvAp...6spW", "5,682.0", "83.3", "367.9", "40", "4,371"],
];
const tracked = ["Czk7c6...X6orPX", "CExcaq...7T6d7X", "GR2yqt...BRMNvj", "9DY29n...e8Pfgt", "8g3hnY...YXWjey", "5K3N1v...D7iTUT"];

function Leaderboard() {
  return <div className="preview-board">
    <div className="preview-filters"><div><b>P&L</b><span>Win Rate</span><span>ROI %</span><span>Score</span><span>Trades</span></div><div><span>1H</span><span>24H</span><span>7D</span><b>ALL</b></div></div>
    <table><thead><tr>{["TRADER", "P&L (SOL)", "WIN RATE", "ROI %", "SCORE", "TRADES"].map(t => <th key={t}>{t}</th>)}</tr></thead><tbody>
      {wallets.map(([name, pnl, win, roi, score, trades], i) => <tr key={name}>
        <td><div className="preview-trader"><span className={i === 0 ? "preview-medal first" : "preview-medal"}>{i < 3 ? <Award /> : i + 1}</span><div><strong>{name}</strong><small>ⓘ BOT_PROFITABLE</small></div></div></td>
        <td><span className="preview-profit">+{pnl}</span></td><td><span>{win}%</span><span className={Number(win) < 50 ? "preview-bar low" : "preview-bar"} /></td><td className="text-gain">+{roi}%</td><td><span className="preview-score">{score}</span></td><td>{trades}</td>
      </tr>)}
    </tbody></table>
  </div>;
}

export function WalletPreview() {
  const [stage, setStage] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => setStage(nextPreviewStage), PREVIEW_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [paused]);

  return <div className="wallet-preview-wrap">
    <div className="wallet-preview" data-preview-stage={stage} aria-label="WhaleWatch product preview">
      <div className="preview-topbar"><span><Activity /> <strong>Whale<span className="text-accent">Watch</span></strong></span><span className="preview-top-tabs">Top Traders <span>Tokens</span></span><span><Wallet /><Bell /></span></div>
      <div className={stage === 1 ? "preview-underlay dimmed" : "preview-underlay"}><Leaderboard /></div>
      {stage === 1 && <aside className="preview-drawer preview-enter">
        <div className="preview-drawer-head"><small>LIVE WALLET</small><X /><strong>5gp2JSboozZwqx1RA1S4she7vAvBaj4mpcoADDDEExjG</strong></div>
        <div className="preview-tracked"><small>TRACKED WALLET</small><p>5gp2JSbo...DEExjG</p><div><span>View on Solscan <ExternalLink /></span><b>Track wallet</b></div></div>
        <h4>Open Positions <span>50</span></h4>
        {["21,317,059.165841", "1,726,137,670.853195", "1,682,959,246.87801", "960,316,932.302618", "1,722,395,786.787248", "1,714,897,965.530392"].map(n => <div className="preview-position" key={n}><span>Token</span><strong>{n}</strong></div>)}
        <h4>Registered Activity</h4>
      </aside>}
      {stage === 2 && <div className="preview-alerts preview-enter">
        <div className="preview-alert-head"><strong>Wallet Alerts</strong><X /><small>Live activity</small></div>
        <div className="preview-alert-tabs"><b>TRACKED WALLETS</b><span>AVAILABLE WALLETS</span><span>PROFITABLE WALLETS</span></div>
        <div className="preview-alert-grid"><div><div className="preview-column-title">TRACKED WALLETS</div>{tracked.map((w, i) => <div className={i === 0 ? "preview-wallet selected" : "preview-wallet"} key={w}><div><strong><span className="preview-dot" />{w}</strong><small>{i === 0 ? "0" : 5759 + i * 63} transactions</small></div><Copy /><Trash2 /></div>)}</div>
        <div><div className="preview-column-title">ACTIVITY · Czk7c6...X6orPX</div>{tracked.map((w, i) => <div className="preview-activity" key={w}><div><span className="preview-dot sell" /><strong>Czk7c6...X6orPX</strong><Copy /><b>SELL</b></div><small><span>{w}</span><span>{i === 0 ? "37,173,490,151.19707" : "100,000"}　11:59:30 a.m.</span></small></div>)}</div></div>
      </div>}
    </div>
    <div className="preview-controls"><span className="font-mono text-xs text-muted-foreground">{["01 / WALLET RANKINGS", "02 / WALLET INSIGHTS", "03 / LIVE ACTIVITY"][stage]}</span><div className="flex items-center gap-2">{[0, 1, 2].map(i => <Button key={i} variant="ghost" size="icon" className="preview-step" aria-label={`Show preview ${i + 1}`} aria-pressed={i === stage} onClick={() => setStage(i)}><span className={i === stage ? "bg-accent" : "bg-muted-foreground"} /></Button>)}<Button variant="ghost" size="icon" aria-label={paused ? "Play preview" : "Pause preview"} onClick={() => setPaused(p => !p)}>{paused ? <Play /> : <Pause />}</Button></div></div>
  </div>;
}