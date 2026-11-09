import { createFileRoute } from "@tanstack/react-router";
import { ContentPage, EditorialSection } from "@/components/content-page";
import { contentHead } from "@/lib/content-head";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
export const Route = createFileRoute("/zerofeex")({ head: () => contentHead("ZeroFeeX", "Explore ZeroFeeX, software designed to avoid trading commissions when buying and selling cryptocurrencies."), component: ZeroFeeX });
function ZeroFeeX() {
  return <ContentPage category="Ecosystem / ZeroFeeX" title="ZeroFeeX" intro="Software designed to help you avoid trading commissions when buying and selling cryptocurrencies.">
    <EditorialSection index="01" title="Keep trading costs in focus"><p>ZeroFeeX is part of our software ecosystem, focused on reducing the commissions involved in cryptocurrency purchases and sales. It complements WhaleWatch's focus on understanding trading behavior.</p><p className="editorial-note">Trading commissions are different from network fees, spreads and slippage. “Zero commissions” does not mean every transaction has no cost; coverage and applicable conditions need to be confirmed.</p></EditorialSection>
    <EditorialSection index="02" title="Discover ZeroFeeX"><p>The official website link will be added here once confirmed.</p><Button asChild variant="outline"><a href="/collaborations#contact">Ask about ZeroFeeX <ArrowUpRight /></a></Button></EditorialSection>
  </ContentPage>;
}