import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export default function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!show) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-4 right-4 z-40 p-2.5 rounded-full bg-[#151A21]/90 backdrop-blur-md border border-neutral-700/80 text-stone-300 hover:text-[#C5A265] hover:border-[#C5A265]/60 shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer animate-in fade-in duration-200"
      aria-label="Scroll back to top"
      title="Scroll back to top"
    >
      <ArrowUp size={16} />
    </button>
  );
}
