import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "BrickBytes: every plot, in plain sight";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Shared link preview for every page (WhatsApp, LinkedIn, X, Slack).
// Rendered once at build time from brand elements: the logo, flat glass-system
// shapes and Plus Jakarta Sans.
export default async function OpenGraphImage() {
  const [logoSvg, shapesSvg, jakarta, inter] = await Promise.all([
    readFile(join(process.cwd(), "public/logo.svg"), "base64"),
    readFile(join(process.cwd(), "public/brand/glass-shapes.svg"), "base64"),
    readFile(join(process.cwd(), "src/assets/fonts/PlusJakartaSans-ExtraBold.ttf")),
    readFile(join(process.cwd(), "src/assets/fonts/Inter-Regular.ttf")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          position: "relative",
          width: "100%",
          height: "100%",
          background: "#f7f4ef",
          fontFamily: "Inter",
        }}
      >
        <img
          src={`data:image/svg+xml;base64,${shapesSvg}`}
          width={680}
          height={680}
          style={{ position: "absolute", right: -150, top: 10 }}
          alt=""
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: 700,
            height: "100%",
            padding: "72px 0 72px 80px",
          }}
        >
          <img src={`data:image/svg+xml;base64,${logoSvg}`} width={260} height={56} alt="" />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                fontFamily: "Plus Jakarta Sans",
                fontSize: 84,
                lineHeight: 0.98,
                letterSpacing: "-0.035em",
                color: "#1c1a17",
              }}
            >
              Every plot, in plain sight.
            </div>
            <div style={{ marginTop: 28, fontSize: 28, lineHeight: 1.4, color: "#5a6272" }}>
              Custom software and live plot maps for real estate developers.
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 20, fontSize: 24 }}>
            <div style={{ fontFamily: "Plus Jakarta Sans", color: "#1c1a17" }}>Technology that holds.</div>
            <div style={{ color: "#5a6272" }}>brickbytes.in</div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Plus Jakarta Sans", data: jakarta, weight: 800, style: "normal" },
        { name: "Inter", data: inter, weight: 400, style: "normal" },
      ],
    },
  );
}
