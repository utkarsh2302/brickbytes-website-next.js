import type { Metadata } from "next";
import AboutPage from "@/components/AboutPage";
import { constructMetadata } from "@/lib/seo";

export const metadata: Metadata = constructMetadata({
  title: "About BrickBytes | The Team Behind Interactive Master Plans",
  description: "Meet the Jaipur team behind BrickBytes, built by BrickNova Technologies. We help real estate developers sell plots and homes with interactive live project maps.",
  path: "/about",
});

export default function AboutRoute() {
  return (
    <div className="relative min-h-screen">
      <main>
        <AboutPage />
      </main>
    </div>
  );
}
