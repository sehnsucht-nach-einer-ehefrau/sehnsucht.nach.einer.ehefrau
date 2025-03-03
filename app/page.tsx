"use client";

import { useEffect, useRef, useState } from "react";
import HomePage from "@/pages/home/home";
import Navbar from "@/components/navbar";
import ProjectPage from "@/pages/projects/projects";
import KnowledgePage from "@/pages/knowledge/knowledge";
import ContactPage from "@/pages/contact/contact";
import ResumePage from "@/pages/resume/resume";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(2); // Default to Home (index 2)
  const sections = ["Projects", "Knowledge", "Home", "Contact", "Resume"];

  // Function to scroll to a specific section
  const scrollToSection = (index: number) => {
    if (containerRef.current) {
      const sectionElement = containerRef.current.children[index];
      sectionElement.scrollIntoView({ behavior: "smooth", inline: "start" });
      setActiveIndex(index);
    }
  };

  // Update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      const scrollLeft = container.scrollLeft;
      const containerWidth = container.clientWidth;

      // Calculate which section is most visible
      const sectionIndex = Math.round(scrollLeft / containerWidth);
      if (sectionIndex >= 0 && sectionIndex < sections.length) {
        setActiveIndex(sectionIndex);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);

      // Initial scroll to Home section (index 2)
      container.scrollLeft = 2 * container.clientWidth;
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Navbar activeIndex={activeIndex} onSelectionChange={scrollToSection} />
      <div
        ref={containerRef}
        className="flex-1 flex overflow-x-auto snap-x snap-mandatory hide-scrollbar"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <section className="min-w-full h-full snap-start flex-shrink-0 overflow-y-auto">
          <ProjectPage />
        </section>
        <section className="min-w-full h-full snap-start flex-shrink-0">
          <KnowledgePage />
        </section>
        <section className="min-w-full h-full snap-start flex-shrink-0">
          <HomePage />
        </section>
        <section className="min-w-full h-full snap-start flex-shrink-0">
          <ContactPage />
        </section>
        <section className="min-w-full h-full snap-start flex-shrink-0">
          <ResumePage />
        </section>
      </div>
    </div>
  );
}
