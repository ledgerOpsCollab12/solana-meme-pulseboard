import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Waves } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PROGRAM_URL } from "@/lib/request-schema";

export function SiteFooter() {
  return <footer role="contentinfo" className="ecosystem-footer" aria-label="WhaleWatch footer">
    <div className="footer-brand"><Link to="/" aria-label="WhaleWatch home"><Waves aria-hidden="true" /><span>WhaleWatch</span></Link><span className="footer-signature">ONCHAIN INTELLIGENCE. OPEN POSSIBILITIES.</span></div>
    <nav className="footer-columns" aria-label="Footer navigation">
      <div><h2>Explore</h2><a href={PROGRAM_URL} target="_blank" rel="noopener noreferrer">Live tracker <ArrowUpRight /></a><Link to="/upcoming">Upcoming features</Link><Link to="/upcoming" hash="predictability">Wallet predictability</Link><Link to="/upcoming" hash="copy-trading">Copy trading</Link></div>
      <div><h2>Build</h2><Link to="/api">Data API</Link><Link to="/api" hash="simple-queries">Simple queries</Link><Link to="/api" hash="custom-solutions">Custom solutions</Link><Link to="/collaborations">Collaborations</Link></div>
      <div><h2>Ecosystem</h2><Link to="/zerofeex">ZeroFeeX</Link><Link to="/about" hash="tokenization">Tokenization</Link><Link to="/collaborations" hash="capabilities">DeFi development</Link></div>
      <div><h2>Company</h2><Link to="/about">About us</Link><Link to="/collaborations">Partner with us</Link><Link to="/collaborations" hash="contact">Contact</Link></div>
      <div><h2>Community</h2><Link to="/community" hash="instagram">Instagram</Link><Link to="/community" hash="telegram">Telegram</Link><Link to="/" hash="decoding">Suggest a feature</Link></div>
    </nav>
    <div className="footer-bottom"><Button asChild variant="outline"><a href={PROGRAM_URL} target="_blank" rel="noopener noreferrer">Open the live tracker <ArrowUpRight /></a></Button><p>© 2026 WhaleWatch</p><p>Not financial advice. Trading involves risk.</p></div>
  </footer>;
}