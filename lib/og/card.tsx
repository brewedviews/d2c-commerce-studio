import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const ogSize = { width: 1200, height: 630 };

const serif = readFile(join(process.cwd(), "assets/fonts/InstrumentSerif-Regular.ttf"));

async function publicImageDataUrl(src: string) {
  const buf = await readFile(join(process.cwd(), "public", src));
  return `data:image/jpeg;base64,${buf.toString("base64")}`;
}

/** The OG renderer's fonts lack U+20B9, so the rupee sign is drawn. */
function Rupee() {
  return (
    <svg width="13" height="18" viewBox="0 0 13 18" style={{ marginRight: 1 }}>
      <path d="M1 1.5h11M1 6h11M4 1.5h1.5a4.5 4.5 0 0 1 0 9H2.5L10 17" fill="none" stroke="#b3361c" strokeWidth="1.6" />
    </svg>
  );
}

/** Shared Open Graph card: editorial headline on paper, optional screenshot panel. */
export async function ogCard({
  title,
  eyebrow,
  image,
  panelColor = "#131311",
}: {
  title: string;
  eyebrow: string;
  image?: string;
  panelColor?: string;
}) {
  const screenshot = image ? await publicImageDataUrl(image) : undefined;

  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", background: "#f3f0e8", color: "#131311" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "56px 60px",
            width: screenshot ? "56%" : "100%",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 34, fontFamily: "Serif" }}>
            <div style={{ width: 16, height: 16, borderRadius: 999, background: "#b3361c" }} />
            {site.name}
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 20, letterSpacing: 2, textTransform: "uppercase", color: "#625e55", marginBottom: 18 }}>{eyebrow}</div>
            <div style={{ fontFamily: "Serif", fontSize: screenshot ? 76 : 96, lineHeight: 0.95, letterSpacing: -1.5 }}>{title}</div>
          </div>
          <div style={{ display: "flex", fontSize: 22, color: "#625e55", gap: 28 }}>
            <span>{site.descriptor}</span>
            <span style={{ display: "flex", alignItems: "center", color: "#b3361c" }}>
              Projects from&nbsp;
              <Rupee />
              {site.startingPrice.replace("₹", "")}
            </span>
          </div>
        </div>
        {screenshot && (
          <div style={{ display: "flex", width: "44%", height: "100%", background: panelColor, alignItems: "center", paddingLeft: 48, overflow: "hidden" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={screenshot} width={720} height={450} style={{ borderRadius: 6, boxShadow: "0 30px 60px rgba(0,0,0,0.45)" }} alt="" />
          </div>
        )}
      </div>
    ),
    {
      ...ogSize,
      fonts: [{ name: "Serif", data: await serif, style: "normal", weight: 400 }],
    },
  );
}
