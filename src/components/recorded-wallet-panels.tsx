import { Bell, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GUIDED_WALLET_ADDRESS, RECORDED_ALERTS, RECORDED_HISTORY } from "@/lib/interactive-wallet-reference";

export function RecordedWalletPanels({ panel, tracked, highlight, onTrack, onClose }: { panel: "wallet" | "alerts" | null; tracked: boolean; highlight: boolean; onTrack: () => void; onClose: () => void }) {
  if (!panel) return null;
  return <div className="simulation-panel-layer">
    <div className="simulation-panel-backdrop" onClick={onClose} />
    {panel === "wallet" ? <aside className="simulation-wallet-drawer" aria-label="Recorded wallet history">
      <header><span>LIVE WALLET</span><Button variant="ghost" size="icon" aria-label="Close wallet history" onClick={onClose}><X /></Button><strong>{GUIDED_WALLET_ADDRESS}</strong></header>
      <div className="simulation-drawer-content"><div className="simulation-tracked-wallet"><small>TRACKED WALLET</small><p>5gp2JS...DEExjG</p><Button data-track-wallet variant="outline" className={highlight ? "simulation-target" : ""} onClick={onTrack}>{tracked ? <Check /> : <Bell />}{tracked ? "Tracking" : "Track wallet"}</Button></div>
        <h4>Registered Activity <small>50</small></h4>
        {RECORDED_HISTORY.map((amount, index) => <div className="simulation-history-row" key={index}><div><b>Unknown token</b><span>SELL · 20/10/2026</span><small>10:07:39 p.m.</small></div><strong>{amount} SOL</strong></div>)}
      </div>
    </aside> : <section className="simulation-alerts" aria-label="Recorded wallet alerts">
      <header><div><h4>Wallet Alerts</h4><small>Live activity</small></div><Button variant="ghost" size="icon" aria-label="Close wallet alerts" onClick={onClose}><X /></Button></header>
      <div className="simulation-alert-tabs"><span>TRACKED WALLETS</span><span>AVAILABLE WALLETS</span><span>PROFITABLE WALLETS</span></div>
      <div className="simulation-alert-columns"><aside><small>TRACKED WALLETS</small>{tracked && <div className="simulation-selected-wallet"><strong>5gp2JS...DEExjG</strong><small>111893 transactions</small></div>}</aside><div className="simulation-alert-feed"><small>ACTIVITY · 5gp2JS...DEExjG</small>{tracked && RECORDED_ALERTS.map((alert, index) => <div className="simulation-alert-row" key={alert.token}><div><strong>5gp2JS...DEExjG</strong><span data-alert-token={index === 0 ? "true" : undefined} className={highlight && index === 0 ? "simulation-target" : ""}>{alert.token}</span></div><div><b>{alert.side}</b><span data-alert-amount={index === 0 ? "true" : undefined} className={highlight && index === 0 ? "simulation-target" : ""}>{alert.amount}</span><small data-alert-time={index === 0 ? "true" : undefined} className={highlight && index === 0 ? "simulation-target" : ""}>{alert.time}</small></div></div>)}</div></div>
    </section>}
  </div>;
}