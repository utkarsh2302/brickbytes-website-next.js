import type { JsonLdNode } from "@/lib/seo";

// Renders schema.org nodes as one JSON-LD graph. "<" is escaped so a string
// value can never close the script tag early.
export default function JsonLd({ nodes }: { nodes: JsonLdNode[] }) {
  const graph = { "@context": "https://schema.org", "@graph": nodes };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph).replace(/</g, "\\u003c") }}
    />
  );
}
