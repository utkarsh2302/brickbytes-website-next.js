import type { Metadata } from "next";
import AboutPage from "@/components/AboutPage";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd, constructMetadata } from "@/lib/seo";

export const metadata: Metadata = constructMetadata({
  title: "About BrickBytes | The Team Behind Interactive Plot Maps",
  description: "Meet the Jaipur team behind BrickBytes, built by BrickNova Technologies. We help real estate developers sell plots and homes with interactive live project maps.",
  path: "/about",
});

export default function AboutRoute() {
  return (
    <div className="relative min-h-screen">
      <JsonLd nodes={[breadcrumbJsonLd("About", "/about")]} />
      <main>
        <AboutPage />
      </main>
    </div>
  );
}
