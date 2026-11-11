import { createFileRoute } from "@tanstack/react-router";
import { UpcomingPage } from "@/components/upcoming/upcoming-page";
import { contentHead } from "@/lib/content-head";
export const Route = createFileRoute("/upcoming")({ head: () => contentHead("Upcoming features", "From who's winning to who you can actually follow. Explore WhaleWatch's Predictability Lab, Risk Profile and configurable Follow Bot, now in development."), component: UpcomingPage });