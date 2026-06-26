import { ImageResponse } from "next/og";

export const alt = "Confía — verifica antes de creer, verifica antes de donar";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 60%, #2563eb 100%)",
          color: "white",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 84,
              height: 84,
              borderRadius: 22,
              background: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 52,
            }}
          >
            🛡️
          </div>
          <div style={{ fontSize: 60, fontWeight: 800, letterSpacing: -1 }}>Confía 🇻🇪</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ fontSize: 72, fontWeight: 800, lineHeight: 1.05 }}>
            Verifica antes de creer.
          </div>
          <div style={{ fontSize: 72, fontWeight: 800, lineHeight: 1.05, color: "#bfdbfe" }}>
            Verifica antes de donar.
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 30, color: "#dbeafe" }}>
          <div>Rumores · Estafas de cripto · Recursos oficiales</div>
          <div style={{ fontWeight: 700 }}>Build4Venezuela</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
