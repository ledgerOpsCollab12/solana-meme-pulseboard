import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, Waves } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteFooter } from "@/components/site-footer";
import { PROGRAM_URL } from "@/lib/request-schema";

export function ContentPage({ category, title, intro, children }: { category: string; title: string; intro: string; children: ReactNode }) {
  return <main className="content-page">
    <header className="content-header"><Link to="/" className="content-brand"><Waves aria-hidden="true" />WhaleWatch</Link><Button asChild variant="outline"><a href={PROGRAM_URL} target="_blank" rel="noopener noreferrer">Live tracker <ArrowUpRight /></a></Button></header>
    <div className="content-inner"><Button asChild variant="link" className="back-home"><Link to="/"><ArrowLeft />Back to WhaleWatch</Link></Button>
      <div className="content-opening"><p className="content-kicker">{category}</p><h1>{title}</h1><p>{intro}</p></div>
      {children}
    </div><SiteFooter />
  </main>;
}

export function EditorialSection({ id, index, title, children }: { id?: string; index: string; title: string; children: ReactNode }) {
  return <section id={id} className="editorial-section"><div className="editorial-label"><span>{index}</span><h2>{title}</h2></div><div className="editorial-body">{children}</div></section>;
}