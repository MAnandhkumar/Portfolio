"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Experience from "@/components/sections/Experience";
import Education from "@/components/sections/Education";
import Contact from "@/components/sections/Contact";

interface PortfolioWrapperProps {
  dictionary: any;
  locale: string;
}

export default function PortfolioWrapper({ dictionary, locale }: PortfolioWrapperProps) {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "about", "skills", "experience", "education", "contact"];
      const scrollPosition = window.scrollY + 120;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = 70;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <Navbar
        activeSection={activeSection}
        scrollToSection={scrollToSection}
        dict={dictionary.nav}
        locale={locale}
      />
      <main className="flex-1">
        <Hero scrollToSection={scrollToSection} dict={dictionary.hero} />
        <About dict={dictionary.about} />
        <Skills dict={dictionary.skills} />
        <Experience dict={dictionary.experience} />
        <Education dict={dictionary.education} />
        <Contact dict={dictionary.contact} />
      </main>
      <Footer />
    </>
  );
}
