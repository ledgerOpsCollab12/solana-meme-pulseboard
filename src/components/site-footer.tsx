import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Waves } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PROGRAM_URL } from "@/lib/request-schema";

export function SiteFooter() {
  return <footer role="contentinfo" className="ecosystem-footer" aria-label="WhaleWatch footer">
    <div className="footer-brand"><Link to="/" aria-label="WhaleWatch home"><Waves aria-hidden="true" /><span>WhaleWatch</span></Link><span className="footer-signature">ONCHAIN INTELLIGENCE. OPEN POSSIBILITIES.</span></div>
    <nav className="footer-columns" aria-label="Footer navigation">
      <div><h2>Explore</h2><a href={PROGRAM_URL} target="_blank" rel="noopener noreferrer">Live tracker <ArrowUpRight /></a><Link to="/upcoming">Upcoming features</Link><ul className="footer-subitems"><li>Wallet predictability</li><li>Copy trading</li></ul></div>
      <div><h2>Build</h2><Link to="/api">Blockchain data on your terms</Link><ul className="footer-subitems"><li>Data API</li><li>Simple queries</li><li>Custom solutions</li><li>Collaborations</li></ul></div>
      <div><h2>Ecosystem</h2><a href="https://www.zerofeex.com/" target="_blank" rel="noopener noreferrer">ZeroFeeX <ArrowUpRight /></a><Link to="/tokenization">Tokenization</Link><Link to="/defi-development">DeFi development</Link></div>
      <div><h2>Company</h2><Link to="/about">About us</Link><ul className="footer-subitems"><li>Partner with us</li><li>Contact</li></ul></div>
      <div><h2>Community</h2>{/* Replace these labels with direct official social links once provided. */}<span className="footer-social-label">Instagram</span><span className="footer-social-label">Telegram</span><Link to="/" hash="decoding">Suggest a feature</Link></div>
    </nav>
    <div className="footer-bottom"><Button asChild variant="outline"><a href={PROGRAM_URL} target="_blank" rel="noopener noreferrer">Open the live tracker <ArrowUpRight /></a></Button><p>© 2026 WhaleWatch</p><p>Not financial advice. Trading involves risk.</p></div>
  </footer>;
}