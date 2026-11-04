import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ArrowUpRight, ShieldCheck, Clock } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0C0C0A] border-t border-[rgba(255,255,255,0.08)] text-[#8A8578] font-sans text-xs pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-14 border-b border-[rgba(255,255,255,0.08)]">
          
          {/* Brand & Positioning */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-sm bg-[#161614] border border-[#B8913A]/40 flex items-center justify-center text-[#B8913A] font-serif font-bold text-base">
                S
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-lg tracking-wider font-semibold text-[#E8E3DC]">
                  SADU
                </span>
                <span className="text-[9px] tracking-[0.2em] uppercase text-[#B8913A]">
                  Real Estate Development
                </span>
              </div>
            </div>

            <p className="text-[#8A8578] text-xs leading-relaxed max-w-md">
              Prime developments and curated real estate acquisitions across Riyadh, Jeddah, Mecca, Medina, and Dubai.
            </p>

            <div className="pt-2 flex items-center gap-2 text-[#8A8578] text-[11px]">
              <ShieldCheck size={14} className="text-[#B8913A]" />
              <span>REGA Registered & Regulated Development Standards</span>
            </div>

            <div className="pt-1 flex items-center gap-2 text-[#8A8578] text-[11px]">
              <Clock size={14} className="text-[#B8913A]" />
              <span>Private Desk: Sun – Thu · 09:00 – 18:00 (AST)</span>
            </div>
          </div>

          {/* Locations */}
          <div className="space-y-3">
            <p className="font-serif font-semibold text-[#E8E3DC] tracking-wider text-sm uppercase">Exclusive Markets</p>
            <div className="space-y-2 text-[11.5px] leading-relaxed">
              <p className="text-[#C8C3BA] flex items-center gap-1.5">
                <MapPin size={11} className="text-[#B8913A]" /> Riyadh Headquarters
              </p>
              <p className="text-[#C8C3BA] flex items-center gap-1.5">
                <MapPin size={11} className="text-[#B8913A]" /> Jeddah Waterfront
              </p>
              <p className="text-[#C8C3BA] flex items-center gap-1.5">
                <MapPin size={11} className="text-[#B8913A]" /> Mecca Holy Precinct
              </p>
              <p className="text-[#C8C3BA] flex items-center gap-1.5">
                <MapPin size={11} className="text-[#B8913A]" /> Medina Central Corridor
              </p>
              <p className="text-[#C8C3BA] flex items-center gap-1.5">
                <MapPin size={11} className="text-[#B8913A]" /> Dubai Luxury High-Rise
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <p className="font-serif font-semibold text-[#E8E3DC] tracking-wider text-sm uppercase">Navigation</p>
            <ul className="space-y-2 text-[12px]">
              <li>
                <Link to="/properties" className="hover:text-[#B8913A] transition-colors">Portfolio</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#B8913A] transition-colors">About SADU</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-[#B8913A] transition-colors">Services</Link>
              </li>
              <li>
                <Link to="/partnerships" className="hover:text-[#B8913A] transition-colors">Partnerships</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#B8913A] transition-colors">Contact</Link>
              </li>
              <li>
                <Link to="/inquiries" className="hover:text-[#B8913A] transition-colors flex items-center gap-1">
                  <span>Inquiries DB</span>
                  <span className="text-[9px] bg-[#161614] border border-[rgba(255,255,255,0.08)] text-[#B8913A] px-1 rounded">Live</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Direct Concierge */}
          <div className="space-y-3">
            <p className="font-serif font-semibold text-[#E8E3DC] tracking-wider text-sm uppercase">Direct Desk</p>
            <div className="space-y-2 text-xs">
              <p className="text-[#8A8578]">Phone:</p>
              <a href="tel:+966114567890" className="text-[#C8C3BA] hover:text-[#B8913A] block font-mono">
                +966 (11) 456-7890
              </a>

              <p className="text-[#8A8578] pt-1">Inquiries:</p>
              <a href="mailto:contact@sadu-development.sa" className="text-[#C8C3BA] hover:text-[#B8913A] block font-mono">
                contact@sadu-development.sa
              </a>

              <div className="pt-2">
                <a
                  href="https://wa.me/966501234567"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#161614] border border-[rgba(255,255,255,0.1)] text-[#B8913A] hover:border-[#B8913A] transition-colors text-[11px]"
                >
                  <span>WhatsApp Concierge</span>
                  <ArrowUpRight size={11} />
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[#6B6B5A] text-[11px]">
          <p>© {currentYear} Sadu Real Estate Development. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Riyadh · Jeddah · Mecca · Medina · Dubai</span>
            <span>REGA Compliant</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
