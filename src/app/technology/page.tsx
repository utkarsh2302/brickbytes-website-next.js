import type { Metadata } from "next";
import TechnologyPage from "@/components/TechnologyPage";
import { constructMetadata } from "@/lib/seo";

export const metadata: Metadata = constructMetadata({
  title: "Master Plan Explorer & Live Plot Inventory | BrickBytes",
  description: "See the BrickBytes platform: an interactive master plan explorer, live plot inventory, buyer engagement tools and a developer control center for every project.",
  path: "/technology",
});

export default function TechnologyRoute() {
  return (
    <div className="relative min-h-screen">
      <main>
        <TechnologyPage />
      </main>
    </div>
  );
}
