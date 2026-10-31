import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight, ShieldCheck, Compass, PhoneCall } from 'lucide-react';

export default function Navbar({ onOpenInquiry }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 30);

      // Calculate scroll progress percentage
      const winHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (winHeight > 0) {
        const progress = (scrollY / winHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, progress)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: 'Properties', href: '/properties' },
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Partnerships', href: '/partnerships' },
    { label: 'Contact', href: '/contact' },
    { label: 'Inquiries DB', href: '/inquiries', isBadge: true }
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#0F1216]/95 backdrop-blur-md border-b border-neutral-800/90 py-3 shadow-xl' 
          : 'bg-gradient-to-b from-[#0F1216]/90 via-[#0F1216]/50 to-transparent py-5'
      }`}
    >
      {/* Scroll Reading Progress Bar */}
      <div 
        className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-[#C5A265]/60 via-[#C5A265] to-[#B28F52] transition-all duration-100 ease-out z-50 pointer-events-none"
        style={{ width: `${scrollProgress}%` }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Identity */}
          <Link to="/" className="group flex items-center gap-3">
            <div className="h-9 w-9 rounded-sm bg-[#1A2028] border border-[#C5A265]/40 flex items-center justify-center text-[#C5A265] font-serif font-bold text-lg group-hover:border-[#C5A265] transition-colors shadow-inner">
              M
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-serif text-lg tracking-wider font-semibold text-[#F3EFEA] group-hover:text-[#C5A265] transition-colors">
                  MIRĀS
                </span>
                <span className="text-[10px] tracking-widest text-[#C5A265] uppercase font-sans font-light border-l border-neutral-700 pl-2">
                  مِيراث
                </span>
              </div>
              <span className="text-[10px] tracking-[0.16em] uppercase text-stone-400 font-sans font-medium">
                Real Estate Advisory
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-7 text-[13px] tracking-wide font-medium" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.href;
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`transition-colors duration-200 relative py-1 ${
                    isActive 
                      ? 'text-[#C5A265]' 
                      : 'text-stone-300 hover:text-white'
                  }`}
                >
                  {link.label}
                  {link.isBadge && (
                    <span className="ml-1.5 px-1.5 py-0.2 bg-neutral-800 border border-neutral-700 text-[#C5A265] rounded text-[9px] font-mono uppercase">
                      Live
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C5A265]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="hidden sm:flex items-center gap-4">
            <button
              onClick={() => onOpenInquiry ? onOpenInquiry() : window.location.href = '/contact'}
              className="inline-flex items-center gap-2 bg-[#C5A265] hover:bg-[#B28F52] text-[#0F1216] font-semibold px-4 py-2 rounded text-xs tracking-wider uppercase transition-all duration-200 shadow-sm hover:shadow-[#C5A265]/20 hover:shadow-lg cursor-pointer"
            >
              <span>Consult an Advisor</span>
              <ArrowUpRight size={14} />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-3 lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-stone-300 hover:text-white bg-neutral-800/80 rounded border border-neutral-700"
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
        <div className="lg:hidden bg-[#12161D] border-b border-neutral-800 px-4 pt-3 pb-6 mt-3 space-y-3 animate-in slide-in-from-top-2 duration-200">
          <div className="space-y-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.href;
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`block px-3 py-2 rounded text-sm font-medium ${
                    isActive 
                      ? 'bg-neutral-800 text-[#C5A265]' 
                      : 'text-stone-300 hover:bg-neutral-800/50 hover:text-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{link.label}</span>
                    {link.isBadge && (
                      <span className="px-1.5 py-0.5 bg-neutral-900 border border-neutral-700 text-[#C5A265] rounded text-[10px] font-mono">
                        MERN DB
                      </span>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="pt-3 border-t border-neutral-800">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                if (onOpenInquiry) onOpenInquiry();
                else window.location.href = '/contact';
              }}
              className="w-full flex items-center justify-center gap-2 bg-[#C5A265] text-[#0F1216] font-semibold px-4 py-2.5 rounded text-xs tracking-wider uppercase"
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
