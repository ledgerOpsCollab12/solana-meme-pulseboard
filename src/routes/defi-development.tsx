import { createFileRoute, Link } from "@tanstack/react-router";
import { ContentPage, EditorialSection } from "@/components/content-page";
import { contentHead } from "@/lib/content-head";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/defi-development")({
  head: () => contentHead("DeFi development", "Decentralized finance products, data from any blockchain and tailored software development for companies and independent projects."),
  component: DeFiDevelopment,
});

function DeFiDevelopment() {
  return <ContentPage category="Ecosystem / DeFi development" title="Build decentralized finance." intro="We develop decentralized finance products and custom software for companies and independent projects, combining blockchain data with the tools their users need.">
    <EditorialSection index="01" title="Data from any blockchain"><p>We can obtain data from any blockchain and scope the integration around your product. Together we define the chain, the information needed and the delivery requirements.</p><p className="editorial-note">Chain-specific availability, historical coverage and latency are assessed for each project.</p></EditorialSection>
    <EditorialSection index="02" title="Products built around your users"><p>Develop the software, integrations, dashboards, custom functions and data visualizations your initiative needs. We shape the work around the financial use case and the decisions your users need to make.</p></EditorialSection>
    <EditorialSection index="03" title="Grow through collaboration"><p>We seek alliances with companies and independent initiatives to develop products together. Bring your expertise, an existing project or a new opportunity; we define the scope and responsibilities together.</p><Button asChild variant="outline"><Link to="/about" hash="contact">Talk about a collaboration <ArrowUpRight /></Link></Button></EditorialSection>
  </ContentPage>;
}