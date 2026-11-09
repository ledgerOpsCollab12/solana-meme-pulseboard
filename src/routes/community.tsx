import { createFileRoute, Link } from "@tanstack/react-router";
import { Instagram, Send } from "lucide-react";
import { ContentPage, EditorialSection } from "@/components/content-page";
import { contentHead } from "@/lib/content-head";
import { Button } from "@/components/ui/button";
export const Route = createFileRoute("/community")({ head: () => contentHead("Community", "WhaleWatch on Instagram and Telegram, and community suggestions for future wallet analysis tools."), component: Community });
function Community() {
  return <ContentPage category="Community / Stay connected" title="A better view, together." intro="Follow the project, join the conversation and help shape the tools we build next.">
    <EditorialSection id="instagram" index="01" title="Instagram"><Instagram className="section-symbol" aria-hidden="true" /><p>A space for product updates, wallet-analysis insights and a closer look at what we are building.</p><p className="editorial-note">Official profile link pending.</p></EditorialSection>
    <EditorialSection id="telegram" index="02" title="Telegram"><Send className="section-symbol" aria-hidden="true" /><p>A channel for project news, upcoming features and the WhaleWatch community.</p><p className="editorial-note">Official channel link pending.</p></EditorialSection>
    <EditorialSection index="03" title="What should we build next?"><p>Share the data, analysis or tools that would improve your workflow. Community feedback helps shape future development.</p><Button asChild variant="outline"><Link to="/" hash="decoding">Suggest a feature</Link></Button></EditorialSection>
  </ContentPage>;
}