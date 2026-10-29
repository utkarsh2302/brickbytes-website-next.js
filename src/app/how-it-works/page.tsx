import type { Metadata } from "next";
import HowItWorksPage from "@/components/HowItWorksPage";
import { constructMetadata } from "@/lib/seo";

export const metadata: Metadata = constructMetadata({
  title: "How It Works: From Layout Plan to Live 3D Map | BrickBytes",
  description: "Send your CAD or PDF layout plan and BrickBytes builds an interactive 3D project map, usually in 10 to 14 business days. See the three-step onboarding process.",
  path: "/how-it-works",
});

export default function HowItWorksRoute() {
  return (
    <div className="relative min-h-screen">
      <main>
        <HowItWorksPage />
      </main>
    </div>
  );
}
