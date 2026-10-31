import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, ArrowUpRight, ShieldCheck, Clock } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0A0D10] border-t border-neutral-800/80 text-stone-400 font-sans text-xs pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-14 border-b border-neutral-800/80">
          
          {/* Brand & Positioning */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-sm bg-[#1A2028] border border-[#C5A265]/40 flex items-center justify-center text-[#C5A265] font-serif font-bold text-base">
                M
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-lg tracking-wider font-semibold text-[#F3EFEA]">
                  MIRĀS ADVISORY
                </span>
                <span className="text-[9px] tracking-[0.2em] uppercase text-[#C5A265]">
                  Capital & Architectural Property
                </span>
              </div>
            </div>

            <p className="text-stone-400 text-xs leading-relaxed max-w-md">
              A specialized real estate consultancy and institutional channel partner connecting discerning capital with vetted developments across the Kingdom of Saudi Arabia.
            </p>

            <div className="pt-2 flex items-center gap-2 text-stone-400 text-[11px]">
              <ShieldCheck size={14} className="text-[#C5A265]" />
              <span>Compliant with REGA (Real Estate General Authority) Channel Standards</span>
            </div>

            <div className="pt-1 flex items-center gap-2 text-stone-400 text-[11px]">
              <Clock size={14} className="text-[#C5A265]" />
              <span>Advisory Hours: Sun – Thu · 09:00 – 18:00 (GMT+3 Riyadh)</span>
            </div>
          </div>

          {/* Locations */}
          <div className="space-y-3">
            <p className="font-serif font-semibold text-stone-200 tracking-wider text-sm uppercase">Key Corridors</p>
            <div className="space-y-3 text-[11.5px] leading-relaxed">
              <div>
                <p className="text-stone-300 font-medium flex items-center gap-1.5">
                  <MapPin size={11} className="text-[#C5A265]" /> Riyadh Headquarters
                </p>
                <p className="text-stone-400 pl-4">King Fahd Road, Al Olaya District</p>
              </div>
              <div>
                <p className="text-stone-300 font-medium flex items-center gap-1.5">
                  <MapPin size={11} className="text-[#C5A265]" /> Jeddah Advisory
                </p>
                <p className="text-stone-400 pl-4">Corniche Road, Al Shati District</p>
              </div>
              <div>
                <p className="text-stone-300 font-medium flex items-center gap-1.5">
                  <MapPin size={11} className="text-[#C5A265]" /> Al Khobar Gateway
                </p>
                <p className="text-stone-400 pl-4">Prince Turki Street, Al Corniche</p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <p className="font-serif font-semibold text-stone-200 tracking-wider text-sm uppercase">Navigation</p>
            <ul className="space-y-2 text-[12px]">
              <li>
                <Link to="/properties" className="hover:text-[#C5A265] transition-colors">Curated Portfolio</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#C5A265] transition-colors">Our Advisory Model</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-[#C5A265] transition-colors">Investor Services</Link>
              </li>
              <li>
                <Link to="/partnerships" className="hover:text-[#C5A265] transition-colors">Developer Channel</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#C5A265] transition-colors">Schedule Consultation</Link>
              </li>
              <li>
                <Link to="/inquiries" className="hover:text-[#C5A265] transition-colors flex items-center gap-1">
                  <span>Inquiries DB Panel</span>
                  <span className="text-[9px] bg-neutral-800 text-[#C5A265] px-1 rounded">Live</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Direct Concierge */}
          <div className="space-y-3">
            <p className="font-serif font-semibold text-stone-200 tracking-wider text-sm uppercase">Private Concierge</p>
            <p className="text-[11.5px] leading-relaxed text-stone-400">
              For confidential acquisitions, block allocations, or bespoke advisory briefs:
            </p>
            <div className="space-y-2 pt-1 text-[11.5px]">
              <a 
                href="mailto:advisory@miras-re.sa" 
                className="flex items-center gap-2 text-stone-300 hover:text-[#C5A265] transition-colors"
              >
                <Mail size={12} className="text-[#C5A265]" />
                <span>advisory@miras-re.sa</span>
              </a>
              <a 
                href="https://wa.me/966501234567" 
                target="_blank" 
                rel="noreferrer" 
                className="flex items-center gap-2 text-stone-300 hover:text-[#C5A265] transition-colors"
              >
                <Phone size={12} className="text-[#C5A265]" />
                <span>+966 50 123 4567 (WhatsApp)</span>
              </a>
            </div>
            <div className="pt-2">
              <Link 
                to="/contact" 
                className="inline-flex items-center gap-1.5 text-xs text-[#C5A265] hover:text-[#B28F52] font-medium"
              >
                <span>Submit Private Brief</span>
                <ArrowUpRight size={12} />
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom Legal & Sample Data Notice */}
        <div className="pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-[11px] text-stone-400">
          <p>
            &copy; {currentYear} MIRĀS Real Estate Advisory. All rights reserved.
          </p>
          <div className="bg-[#13171E] border border-neutral-800/80 px-3 py-1.5 rounded text-[10.5px] text-stone-400 max-w-2xl">
            <strong className="text-stone-300 font-medium">Design Preview Notice:</strong> Listings, metrics, and pricing are realistic sample assets for concept evaluation. Replace with verified title details prior to production release.
          </div>
        </div>

      </div>
    </footer>
  );
}
