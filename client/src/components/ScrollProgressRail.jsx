import React, { useState, useEffect } from 'react';

export default function ScrollProgressRail() {
  const [activeSection, setActiveSection] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const sections = [
    { id: 'hero-section', label: 'Overview' },
    { id: 'curated-section', label: 'Curated Units' },
    { id: 'corridors-section', label: 'City Corridors' },
    { id: 'advisory-section', label: 'Advisory Arc' },
    { id: 'intelligence-section', label: 'Intelligence' },
    { id: 'pathways-section', label: 'Pathways' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsVisible(scrollY > 250);

      const sectionElements = sections.map(s => document.getElementById(s.id));
      const scrollPosition = scrollY + window.innerHeight * 0.35;

      sectionElements.forEach((el, index) => {
        if (!el) return;
        const top = el.offsetTop;
        const height = el.offsetHeight;
        if (scrollPosition >= top && scrollPosition < top + height) {
          setActiveSection(index);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Section navigation rail"
      className="hidden xl:flex fixed right-6 top-1/2 -translate-y-1/2 z-40 flex-col items-end gap-3 pointer-events-auto transition-opacity duration-500 animate-in fade-in"
    >
      {sections.map((sec, idx) => {
        const isActive = activeSection === idx;
        return (
          <button
            key={sec.id}
            onClick={() => scrollToSection(sec.id)}
            className="group flex items-center gap-2 cursor-pointer py-1"
            aria-label={`Scroll to ${sec.label}`}
          >
            {/* Hover tooltip */}
            <span
              className={`text-[9.5px] font-mono uppercase tracking-widest transition-all duration-200 opacity-0 group-hover:opacity-100 ${
                isActive ? 'text-[#B8913A] font-semibold opacity-100' : 'text-[#8A8A75]'
              }`}
            >
              {sec.label}
            </span>

            {/* Pill Indicator */}
            <div
              className={`transition-all duration-300 rounded-full ${
                isActive
                  ? 'w-6 h-1.5 bg-[#B8913A]'
                  : 'w-2 h-1.5 bg-[rgba(15,15,14,0.2)] group-hover:bg-[#B8913A]/50 group-hover:w-3.5'
              }`}
            />
          </button>
        );
      })}
    </aside>
  );
}
