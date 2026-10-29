import type { Metadata } from "next";
import TechnologyPage from "@/components/TechnologyPage";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd, constructMetadata, serviceJsonLd } from "@/lib/seo";

const description =
  "BrickBytes plot layout software: an interactive plot map for buyers, live plot inventory, instant answers to buyer questions and a control center for your team.";

export const metadata: Metadata = constructMetadata({
  title: "Plot Layout Software for Real Estate Developers | BrickBytes",
  description,
  path: "/technology",
});

export default function TechnologyRoute() {
  return (
    <div className="relative min-h-screen">
      <JsonLd
        nodes={[
          breadcrumbJsonLd("Technology", "/technology"),
          serviceJsonLd({ name: "Plot layout software", description, path: "/technology" }),
        ]}
      />
      <main>
        <TechnologyPage />
      </main>
    </div>
  );
}
