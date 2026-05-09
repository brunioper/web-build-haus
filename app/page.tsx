import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Stats from "@/components/Stats";
import BuildShowcase from "@/components/BuildShowcase";
import Work from "@/components/Work";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Technologies from "@/components/Technologies";
import About from "@/components/About";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Stats />
        <BuildShowcase />
        <Work />
        <Services />
        <Process />
        <Technologies />
        <About />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
