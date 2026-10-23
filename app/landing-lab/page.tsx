import { notFound } from "next/navigation";
import { Geist, Geist_Mono } from "next/font/google";
import "../(marketing)/marketing.css";
import { Lab } from "./lab";

const sans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const mono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

/** Dev-only: each landing primitive animating in isolation. 404s in production. */
export default function LandingLab() {
  if (process.env.NODE_ENV === "production") notFound();
  return (
    <div className={`${sans.variable} ${mono.variable} lm-root font-sans`}>
      <Lab />
    </div>
  );
}
