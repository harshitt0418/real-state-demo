import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > 600);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-32 right-6 z-40 h-9 w-9 rounded-full bg-[#FAF7F2] border border-[rgba(15,15,14,0.14)] text-[#6B6B5A] hover:text-[#B8913A] hover:border-[#B8913A] shadow-md hover:shadow-lg flex items-center justify-center transition-all duration-300 cursor-pointer"
      aria-label="Back to top"
    >
      <ArrowUp size={15} />
    </button>
  );
}
