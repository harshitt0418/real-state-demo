import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Compass, Building2, Scale, ArrowUpRight } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import MovingTextBand from '../components/MovingTextBand';

export default function AboutPage({ onOpenInquiry }) {
  const pillars = [
    {
      icon: Scale,
      title: 'Direct Fiduciary Focus',
      desc: 'Transparent engagement structured directly with premier developers. Direct pricing and zero retail buyer markups.'
    },
    {
      icon: ShieldCheck,
      title: 'Rigorous Due Diligence',
      desc: 'Every development undergoes multi-level vetting: Wafi licensing, Ministry of Justice escrow registration, and realistic yield modeling.'
    },
    {
      icon: Compass,
      title: 'Five Strategic Corridors',
      desc: 'Comprehensive market presence across Riyadh, coastal Jeddah, holy sanctuaries in Mecca and Medina, and luxury waterfront towers in Dubai.'
    },
    {
      icon: Building2,
      title: 'Prime Developer Network',
      desc: 'Exclusive channel partnerships with the region’s premier master builders provide priority allocations and off-market opportunities.'
    }
  ];

  return (
    <div className="pt-28 pb-24 space-y-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header Banner */}
      <ScrollReveal animation="fade-down">
        <div className="space-y-4 max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-mono text-[#B8913A] uppercase tracking-widest">
            <Compass size={14} />
            <span>About Sadu</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-[#0F0F0E] tracking-tight leading-tight">
            Curated development for serious capital.
          </h1>
          <p className="text-[#5A5A52] text-sm sm:text-base leading-relaxed">
            Sadu Real Estate Development was founded to provide discerning investors with direct access to prime real estate opportunities across Saudi Arabia and the UAE.
          </p>
        </div>
      </ScrollReveal>

      {/* Split Section: The Story & Editorial Imagery */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        <div className="lg:col-span-6 space-y-4 text-[#5A5A52] text-sm sm:text-base leading-relaxed">
          <ScrollReveal animation="fade-right">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0F0F0E] mb-2">
              Transforming Regional Property
            </h2>
            <p className="mb-3">
              Under Vision 2030, the regional property market is experiencing unprecedented institutional growth. Prime commercial floorplates, branded residences, and sacred sanctuary developments are redefining the urban landscape of Riyadh, Jeddah, Mecca, Medina, and Dubai.
            </p>
            <p>
              Sadu Real Estate Development acts as an originate-and-filter counterweight, bridging high-caliber developers with qualified private and institutional capital under full regulatory transparency.
            </p>
          </ScrollReveal>
        </div>

        <div className="lg:col-span-6">
          <ScrollReveal animation="fade-left" delay={150}>
            <div className="editorial-img-container aspect-[4/3] rounded-2xl border border-[rgba(15,15,14,0.10)] shadow-lg overflow-hidden relative">
              <img
                src="/assets/advisory.jpg"
                alt="Sadu Real Estate Development consultation"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0E]/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 bg-[#FAF7F2]/95 backdrop-blur-md p-4 rounded-xl border border-[rgba(15,15,14,0.10)] text-xs text-[#0F0F0E]">
                <p className="font-serif font-bold text-sm text-[#0F0F0E]">Direct Representation</p>
                <p className="text-[#6B6B5A] text-[11px] mt-0.5">Fiduciary counsel from allocation brief to key handover and title deed registration.</p>
              </div>
            </div>
          </ScrollReveal>
        </div>

      </div>

      {/* Four Core Pillars */}
      <div className="space-y-8">
        <ScrollReveal animation="fade-up">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <p className="text-xs font-mono uppercase tracking-widest text-[#B8913A]">Our Operating Ethos</p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0F0F0E]">The Foundations of SADU</h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <ScrollReveal 
                key={idx}
                animation="fade-up"
                delay={idx * 110}
              >
                <div className="bg-[#FAF7F2] border border-[rgba(15,15,14,0.10)] rounded-xl p-6 space-y-4 hover:border-[#B8913A]/40 transition-colors h-full shadow-sm hover:shadow-md">
                  <div className="h-10 w-10 rounded-lg bg-[#F0EBE1] border border-[rgba(184,145,58,0.3)] flex items-center justify-center text-[#B8913A]">
                    <Icon size={20} />
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-[#0F0F0E]">{pillar.title}</h3>
                  <p className="text-xs text-[#6B6B5A] leading-relaxed">{pillar.desc}</p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>

      {/* Moving text band */}
      <MovingTextBand
        items={['SADU REAL ESTATE DEVELOPMENT', 'RIYADH', 'JEDDAH', 'MECCA', 'MEDINA', 'DUBAI']}
        speed="slow"
      />

      {/* Bottom CTA */}
      <ScrollReveal animation="fade-up">
        <div className="bg-[#F0EBE1] border border-[rgba(15,15,14,0.10)] rounded-2xl p-8 sm:p-12 text-center max-w-3xl mx-auto space-y-6">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0F0F0E]">
            Initiate a Confidential Dialogue
          </h2>
          <p className="text-xs sm:text-sm text-[#5A5A52] leading-relaxed max-w-xl mx-auto">
            Discuss your acquisition parameters with a senior principal from Sadu Real Estate Development.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => onOpenInquiry ? onOpenInquiry() : window.location.href = '/contact'}
              className="bg-[#B8913A] hover:bg-[#D4A853] text-[#FAF7F2] font-semibold px-6 py-3 rounded text-xs tracking-wider uppercase transition-colors shadow-sm cursor-pointer"
            >
              Consult an Advisor
            </button>
            <Link
              to="/properties"
              className="bg-[#FAF7F2] hover:bg-[#E8E1D5] text-[#0F0F0E] font-medium px-6 py-3 rounded text-xs tracking-wider uppercase border border-[rgba(15,15,14,0.10)] transition-colors"
            >
              Browse Portfolio
            </Link>
          </div>
        </div>
      </ScrollReveal>

    </div>
  );
}
