import Navbar from "@/components/Navbar";
import HeroV2 from "@/components/HeroV2";
import Marquee from "@/components/Marquee";
import BuildStory from "@/components/BuildStory";
import PortfolioReel from "@/components/PortfolioReel";
import Services from "@/components/Services";
import About from "@/components/About";
import Stats from "@/components/Stats";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <>
      <Navbar />
      <main>
        {/* 00 — Invitation */}
        <HeroV2 />

        {/* small breath: tech marquee */}
        <Marquee />

        {/* 01 — The Build (centerpiece, scroll-driven) */}
        <BuildStory />

        {/* 02 — Portfolio reveal (the just-built site shows real work) */}
        <PortfolioReel />

        {/* 03 — Services */}
        <Services />

        {/* 04 — Studio (about + stats) */}
        <About />
        <Stats />

        {/* 05 — Questions */}
        <FAQ />

        {/* 06 — Contact */}
        <Contact />
      </main>
      <Footer />
    </>
  );
}
