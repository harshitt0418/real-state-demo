import React, { useState, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function FloatingBriefButton({ onOpenInquiry }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`floating-brief-btn ${isVisible ? 'is-visible' : ''}`}>
      <button
        onClick={() => onOpenInquiry ? onOpenInquiry() : window.location.href = '/contact'}
        className="group flex items-center gap-2.5 bg-[#B8913A] hover:bg-[#D4A853] text-[#FAF7F2] px-4 py-3 rounded-full shadow-xl hover:shadow-[#B8913A]/30 hover:shadow-2xl transition-all duration-300 cursor-pointer text-xs font-semibold tracking-wider uppercase"
        aria-label="Submit Private Brief"
      >
        <span className="hidden sm:block">Private Brief</span>
        <ArrowUpRight size={16} />
      </button>
    </div>
  );
}
