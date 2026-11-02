import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export default function Navbar({ onOpenInquiry }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHeroSection, setIsHeroSection] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 40);
      setIsHeroSection(scrollY < 80);

      const winHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (winHeight > 0) {
        setScrollProgress(Math.min(100, Math.max(0, (scrollY / winHeight) * 100)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const isHomePage = location.pathname === '/';

  const navLinks = [
    { label: 'Properties', href: '/properties' },
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Partnerships', href: '/partnerships' },
    { label: 'Contact', href: '/contact' },
    { label: 'Inquiries', href: '/inquiries', isBadge: true }
  ];

  // On homepage hero, start transparent; on other pages always opaque
  const navBg = isHomePage && isHeroSection && !isMobileMenuOpen
    ? 'bg-transparent'
    : isScrolled || !isHomePage
      ? 'bg-[#FAF7F2]/96 backdrop-blur-md border-b border-[rgba(15,15,14,0.10)] shadow-[0_2px_20px_rgba(15,15,14,0.06)]'
      : 'bg-[#FAF7F2]/90 backdrop-blur-sm';

  const textColor = isHomePage && isHeroSection && !isMobileMenuOpen
    ? 'text-white'
    : 'text-[#3A3A35]';

  const logoNameColor = isHomePage && isHeroSection && !isMobileMenuOpen
    ? 'text-white group-hover:text-[#D4A853]'
    : 'text-[#0F0F0E] group-hover:text-[#B8913A]';

  const logoMarkBg = isHomePage && isHeroSection && !isMobileMenuOpen
    ? 'bg-transparent border-white/30 text-white'
    : 'bg-[#F0EBE1] border-[rgba(184,145,58,0.4)] text-[#B8913A]';

  const activeColor = isHomePage && isHeroSection && !isMobileMenuOpen
    ? 'text-[#D4A853]'
    : 'text-[#B8913A]';

  const hoverColor = isHomePage && isHeroSection && !isMobileMenuOpen
    ? 'text-stone-200 hover:text-white'
    : 'text-[#5A5A52] hover:text-[#0F0F0E]';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        isScrolled ? 'py-3' : 'py-5'
      } ${navBg}`}
    >
      {/* Scroll Progress Bar */}
      <div
        className="absolute bottom-0 left-0 h-[2px] transition-all duration-100 ease-out pointer-events-none"
        style={{
          width: `${scrollProgress}%`,
          background: 'linear-gradient(to right, rgba(184,145,58,0.4), #B8913A, #D4A853)'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">

          {/* Brand */}
          <Link to="/" className="group flex items-center gap-3">
            <div className={`h-9 w-9 rounded-sm border flex items-center justify-center font-serif font-bold text-lg transition-all duration-300 ${logoMarkBg}`}>
              M
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className={`font-serif text-lg tracking-wider font-semibold transition-colors duration-300 ${logoNameColor}`}>
                  MIRĀS
                </span>
                <span className={`text-[10px] tracking-widest uppercase font-sans font-light border-l pl-2 transition-colors duration-300 ${
                  isHomePage && isHeroSection && !isMobileMenuOpen
                    ? 'text-[#D4A853] border-white/20'
                    : 'text-[#B8913A] border-[rgba(15,15,14,0.14)]'
                }`}>
                  مِيراث
                </span>
              </div>
              <span className={`text-[10px] tracking-[0.16em] uppercase font-sans font-medium transition-colors duration-300 ${
                isHomePage && isHeroSection && !isMobileMenuOpen ? 'text-white/60' : 'text-[#6B6B5A]'
              }`}>
                Real Estate Advisory
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-7 text-[13px] tracking-wide font-medium" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.href;
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`transition-colors duration-200 relative py-1 ${
                    isActive ? activeColor : hoverColor
                  }`}
                >
                  {link.label}
                  {link.isBadge && (
                    <span className={`ml-1.5 px-1.5 py-px rounded text-[9px] font-mono uppercase border ${
                      isHomePage && isHeroSection && !isMobileMenuOpen
                        ? 'bg-white/10 border-white/20 text-white/70'
                        : 'bg-[#F0EBE1] border-[rgba(15,15,14,0.12)] text-[#6B6B5A]'
                    }`}>
                      Live
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#B8913A] rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* CTA */}
          <div className="hidden sm:flex items-center gap-4">
            <button
              onClick={() => onOpenInquiry ? onOpenInquiry() : window.location.href = '/contact'}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded text-xs tracking-wider uppercase font-semibold transition-all duration-200 cursor-pointer ${
                isHomePage && isHeroSection && !isMobileMenuOpen
                  ? 'bg-white/10 hover:bg-white/20 border border-white/25 text-white'
                  : 'bg-[#B8913A] hover:bg-[#D4A853] text-[#FAF7F2] shadow-sm hover:shadow-[#B8913A]/25 hover:shadow-lg'
              }`}
            >
              <span>Consult an Advisor</span>
              <ArrowUpRight size={14} />
            </button>
          </div>

          {/* Mobile toggle */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded border transition-colors ${
                isHomePage && isHeroSection && !isMobileMenuOpen
                  ? 'border-white/20 text-white bg-white/10 hover:bg-white/20'
                  : 'border-[rgba(15,15,14,0.12)] text-[#3A3A35] bg-[#F0EBE1] hover:bg-[#E8E1D5]'
              }`}
              aria-label={isMobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF7F2] border-t border-[rgba(15,15,14,0.08)] px-4 pt-4 pb-6 mt-0 shadow-xl">
          <div className="space-y-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.href;
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`flex items-center justify-between px-3 py-2.5 rounded text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-[#F0EBE1] text-[#B8913A]'
                      : 'text-[#3A3A35] hover:bg-[#F0EBE1] hover:text-[#0F0F0E]'
                  }`}
                >
                  <span>{link.label}</span>
                  {link.isBadge && (
                    <span className="px-1.5 py-px bg-[#E8E1D5] border border-[rgba(15,15,14,0.12)] text-[#6B6B5A] rounded text-[10px] font-mono">
                      DB
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
          <div className="pt-4 mt-3 border-t border-[rgba(15,15,14,0.08)]">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                if (onOpenInquiry) onOpenInquiry();
                else window.location.href = '/contact';
              }}
              className="w-full flex items-center justify-center gap-2 bg-[#B8913A] hover:bg-[#D4A853] text-[#FAF7F2] font-semibold px-4 py-2.5 rounded text-xs tracking-wider uppercase cursor-pointer transition-colors"
            >
              <span>Consult an Advisor</span>
              <ArrowUpRight size={14} />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
