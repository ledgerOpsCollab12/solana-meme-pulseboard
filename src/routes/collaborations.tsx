import { createFileRoute } from "@tanstack/react-router";
import { Network, Code2, Blocks } from "lucide-react";
import { ContentPage, EditorialSection } from "@/components/content-page";
import { RequestForm } from "@/components/request-form";
import { contentHead } from "@/lib/content-head";
export const Route = createFileRoute("/collaborations")({ head: () => contentHead("Collaborations", "Partner on data from any blockchain, decentralized finance products, tokenization and custom software."), component: Collaborations });
function Collaborations() {
  return <ContentPage category="Company / Partnerships" title="Let's build what comes next." intro="We are looking for alliances with companies and independent projects to grow initiatives together — combining blockchain data, decentralized finance and software development.">
    <div id="capabilities" className="capability-grid"><article><Network aria-hidden="true" /><h2>Any blockchain</h2><p>We can obtain data from any blockchain and scope the integration around your requirements.</p></article><article><Blocks aria-hidden="true" /><h2>Decentralized finance</h2><p>Develop DeFi products and tokenized business models that support your initiative.</p></article><article><Code2 aria-hidden="true" /><h2>Custom software</h2><p>Build dashboards, integrations, functions and data products for your users.</p></article></div>
    <EditorialSection index="01" title="Shared capabilities. New possibilities."><p>Bring your product, expertise or independent initiative. We can collaborate on data acquisition, technical development, visualization and connecting projects with clients. Together we define the opportunity, responsibilities and a practical scope.</p></EditorialSection>
    <section id="contact" className="content-contact"><div><p className="content-kicker">Collaborate with us</p><h2>Tell us about your project.</h2><p>Introduce your company or initiative, what you want to build and where you see an opportunity to work together.</p></div><RequestForm kind="collaboration" /></section>
  </ContentPage>;
}