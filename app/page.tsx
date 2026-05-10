import Navbar from "@/components/Navbar";
import MacbookHero from "@/components/MacbookHero";
import ChapterStory from "@/components/ChapterStory";
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
        {/* 00 — The hero IS the laptop. Full-bleed, slow, cinematic. */}
        <MacbookHero />

        {/* 01–05 — The build, told as five full-screen chapters that
            assemble themselves while you scroll. */}
        <ChapterStory />

        {/* 06 — Portfolio reveal */}
        <PortfolioReel />

        {/* 07 — Services */}
        <Services />

        {/* 08 — Studio */}
        <About />
        <Stats />

        {/* 09 — Questions */}
        <FAQ />

        {/* 10 — Contact */}
        <Contact />
      </main>
      <Footer />
    </>
  );
}
