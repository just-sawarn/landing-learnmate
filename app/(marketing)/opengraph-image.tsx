import { ImageResponse } from "next/og";

export const alt = "LearnMate: turn your study material into lessons you can run";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#F7F6F2",
        color: "#0F172A",
        padding: 72,
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 34, fontWeight: 600 }}>
        <svg width="44" height="44" viewBox="0 0 28 28" fill="none">
          <path
            d="M13 6.5C10.5 4.8 7 4.5 3.5 5v15.5c3.5-.5 7-.2 9.5 1.5V6.5z"
            stroke="#0F172A"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path
            d="M15 6.5c2.5-1.7 6-2 9.5-1.5v15.5c-3.5-.5-7-.2-9.5 1.5V6.5z"
            stroke="#0F172A"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <rect x="13" y="5" width="2" height="18" rx="1" fill="#0F172A" />
        </svg>
        LearnMate
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div style={{ fontSize: 88, fontWeight: 600, letterSpacing: -3, lineHeight: 1.02, maxWidth: 980 }}>
          Your textbook, turned into lessons you can run.
        </div>
        <div style={{ fontSize: 32, color: "#334155" }}>
          Animated lessons · a real IDE · Guru, a tutor that asks first
        </div>
      </div>
      <div style={{ display: "flex", gap: 12, fontSize: 24, color: "#5A6A80" }}>
        Equinox 2026 · Gemini × Claude × Groq
      </div>
    </div>,
    size,
  );
}
