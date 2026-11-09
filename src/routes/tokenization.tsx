import { createFileRoute, Link } from "@tanstack/react-router";
import { ContentPage, EditorialSection } from "@/components/content-page";
import { contentHead } from "@/lib/content-head";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/tokenization")({
  head: () => contentHead("Business tokenization", "Business model design, project tokenization and connections with clients for blockchain-enabled businesses."),
  component: Tokenization,
});

function Tokenization() {
  return <ContentPage category="Ecosystem / Tokenization" title="Tokenize a project. Build its business." intro="We help projects and businesses design a business model, structure their tokenization and connect with clients. A token should support a clear purpose and a viable business.">
    <EditorialSection index="01" title="Start with the business model"><p>Define the offering, the customers it serves and how the project creates value. We work with you to shape the business model before designing its tokenized structure.</p></EditorialSection>
    <EditorialSection index="02" title="Build the tokenized model"><p>We design and develop tokenization around the needs of your project or business, connecting its technical implementation with its intended role in the model.</p><p className="editorial-note">The legal structure and applicable requirements must be assessed for each project and jurisdiction. Tokenization is not a guarantee of funding or returns.</p></EditorialSection>
    <EditorialSection index="03" title="Connect with clients"><p>We help connect the initiative with potential clients and commercial opportunities, so the work extends beyond issuing a token to developing a business around it.</p><Button asChild variant="outline"><Link to="/about" hash="contact">Discuss your project <ArrowUpRight /></Link></Button></EditorialSection>
  </ContentPage>;
}