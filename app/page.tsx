import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Stats from "@/components/Stats";
import About from "@/components/About";
import Services from "@/components/Services";
import Work from "@/components/Work";
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
        <About />
        <Services />
        <Work />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
