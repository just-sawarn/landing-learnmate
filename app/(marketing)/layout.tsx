import { Geist, Geist_Mono } from "next/font/google";
import "./marketing.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"], display: "swap" });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], display: "swap" });

export default function MarketingLayout({ children }: LayoutProps<"/">) {
  return <div className={`${geistSans.variable} ${geistMono.variable} lm-root font-sans`}>{children}</div>;
}
