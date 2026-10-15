import { createFileRoute } from "@tanstack/react-router";
import { Home } from "@/components/mss/home";
import { pageHead } from "@/lib/mss/seo";
export const Route = createFileRoute("/")({
  head: () => pageHead("Mahavir Security Solution | Security, Facility & Workforce Planning", "India-first security, facility and workforce enquiries. Plan your coverage with MSS. Based in Gujarat, serving India and clients worldwide."),
  component: Home,
});
