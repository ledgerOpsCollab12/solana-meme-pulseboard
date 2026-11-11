import { createFileRoute } from "@tanstack/react-router";
import { TokenizationPage } from "@/components/tokenization/tokenization-page";
import { contentHead } from "@/lib/content-head";

export const Route = createFileRoute("/tokenization")({
  head: () => contentHead("Real-world asset tokenization", "Turn real assets into capital with end-to-end legal structure, verifiable on-chain backing, a tailored business model and market connections."),
  component: TokenizationPage,
});