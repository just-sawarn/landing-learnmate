import type { Metadata } from "next";
import { Suspense } from "react";
import { AuthProvider } from "@/components/landing/auth-context";
import { BentoGrid } from "@/components/landing/bento/bento-grid";
import { seo } from "@/components/landing/content";
import { Faq } from "@/components/landing/faq";
import { FinalCta } from "@/components/landing/final-cta";
import { Footer } from "@/components/landing/footer";
import { GuruSection } from "@/components/landing/guru-section";
import { Hero } from "@/components/landing/hero";
import { HowItWorks } from "@/components/landing/how-it-works/how-it-works";
import { Marquee } from "@/components/landing/marquee";
import { Navbar } from "@/components/landing/navbar";
import { Problem } from "@/components/landing/problem";
import { SessionProbe } from "@/components/landing/session-probe";
import { TrustStrip } from "@/components/landing/trust-strip";
import { MotionRoot } from "@/components/landing/motion-root";

export const metadata: Metadata = {
  title: seo.title,
  description: seo.description,
  openGraph: { title: seo.title, description: seo.description, type: "website" },
  twitter: { card: "summary_large_image", title: seo.title, description: seo.description },
};

export default function LandingPage() {
  return (
    <AuthProvider>
      <MotionRoot>
        <Suspense fallback={null}>
          <SessionProbe />
        </Suspense>
        <Navbar />
        <main>
          <Hero />
          <TrustStrip />
          <Problem />
          <BentoGrid />
          <HowItWorks />
          <GuruSection />
          <Marquee />
          <Faq />
          <FinalCta />
        </main>
        <Footer />
      </MotionRoot>
    </AuthProvider>
  );
}
