import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "BrickBytes: every plot, in plain sight";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Shared link preview for every page (WhatsApp, LinkedIn, X, Slack).
// Rendered once at build time.
export default async function OpenGraphImage() {
  const [logoSvg, glassSymbol] = await Promise.all([
    readFile(join(process.cwd(), "public/logo.svg"), "base64"),
    readFile(join(process.cwd(), "src/app/og-symbol.jpg"), "base64"),
  ]);

  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", background: "#f7f4ef" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: 620,
            padding: "72px 0 72px 80px",
          }}
        >
          <img src={`data:image/svg+xml;base64,${logoSvg}`} width={260} height={56} alt="" />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 76, lineHeight: 1.05, letterSpacing: "-0.03em", color: "#1c1a17" }}>
              Every plot, in plain sight.
            </div>
            <div style={{ marginTop: 28, fontSize: 30, lineHeight: 1.35, color: "#71717a" }}>
              Interactive master plans and live plot inventory for real estate developers.
            </div>
          </div>
          <div style={{ fontSize: 26, color: "#ff5e13" }}>brickbytes.in</div>
        </div>
        <img src={`data:image/jpeg;base64,${glassSymbol}`} width={580} height={580} style={{ margin: "25px 0 0 0" }} alt="" />
      </div>
    ),
    size,
  );
}
