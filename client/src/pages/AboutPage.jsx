import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Compass, Building2, Scale, ArrowUpRight } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';

export default function AboutPage({ onOpenInquiry }) {
  const pillars = [
    {
      icon: Scale,
      title: 'Fiduciary Independence',
      desc: 'We are structured to advise the capital, not to liquidate broker inventory. Our fee model is clear, transparent, and direct from developers with no hidden buyer commissions.'
    },
    {
      icon: ShieldCheck,
      title: 'Institutional Due Diligence',
      desc: 'Every development undergoes multi-tiered vetting: Wafi off-plan regulatory status, contractor solvency, building engineering audits, and realistic rental comp stress tests.'
    },
    {
      icon: Compass,
      title: 'Local Urban Mastery',
      desc: 'Deep territorial knowledge across Riyadh’s northern expansion (Hittin, Al Malqa, New Murabba), Jeddah’s redefined Corniche, and the Eastern Province industrial corridor.'
    },
    {
      icon: Building2,
      title: 'Tier-1 Master Developer Network',
      desc: 'Formal channel agreements with the Kingdom’s most accomplished builders provide our clients priority allocation, off-market opportunities, and favorable payment milestones.'
    }
  ];

  return (
    <div className="pt-28 pb-24 space-y-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header Banner */}
      <ScrollReveal animation="fade-down">
        <div className="space-y-4 max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-mono text-[#C5A265] uppercase tracking-widest">
            <Compass size={14} />
            <span>About MIRĀS Advisory</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#F3EFEA] tracking-tight leading-tight">
            A real estate consultancy built around capital protection.
          </h1>
          <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
            MIRĀS Real Estate Advisory was founded on a simple principle: serious property investors need an analytical, fiduciary counterweight in Saudi Arabia’s accelerating property market.
          </p>
        </div>
      </ScrollReveal>

      {/* Split Section: The Story & Editorial Imagery */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        <div className="lg:col-span-6 space-y-5 text-stone-300 text-sm sm:text-base leading-relaxed">
          <ScrollReveal animation="fade-right">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#F3EFEA] mb-3">
              The Evolution of Saudi Real Estate
            </h2>
            <p className="mb-3">
              Under the transformative economic architecture of Vision 2030, the Saudi property market is undergoing historic institutionalization. Prime commercial floorplates, branded residences, and mixed-use districts are redefining the urban landscape of Riyadh, Jeddah, and Al Khobar.
            </p>
            <p className="mb-3">
              Yet for private wealth, family offices, and cross-border allocators, navigating off-plan announcements, municipal zoning codes, and developer delivery histories requires more than high-pressure sales brokers. It demands rigorous architectural scrutiny, yield analysis, and transparent conveyance management.
            </p>
            <p>
              MIRĀS acts as a dedicated channel partner: we bridge the gap between premier developers who build exceptional architecture and informed investors seeking genuine capital preservation.
            </p>
          </ScrollReveal>
        </div>

        <div className="lg:col-span-6">
          <ScrollReveal animation="fade-left" delay={150}>
            <div className="editorial-img-container aspect-[4/3] rounded-2xl border border-neutral-800 shadow-2xl overflow-hidden relative">
              <img
                src="/assets/advisory.jpg"
                alt="MIRĀS strategic real estate advisory consultation"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F1216]/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 bg-[#0F1216]/90 backdrop-blur-md p-3.5 rounded-lg border border-neutral-800 text-xs text-stone-300">
                <p className="font-serif font-bold text-sm text-[#F3EFEA]">Fiduciary Counsel</p>
                <p className="text-stone-400 text-[11px]">Direct representation from initial acquisition brief to title deed handover.</p>
              </div>
            </div>
          </ScrollReveal>
        </div>

      </div>

      {/* Four Core Pillars */}
      <div className="space-y-8">
        <ScrollReveal animation="fade-up">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <p className="text-xs font-mono uppercase tracking-widest text-[#C5A265]">Our Operating Ethos</p>
            <h2 className="font-serif text-3xl font-bold text-[#F3EFEA]">The Four Foundations of MIRĀS</h2>
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
                <div className="bg-[#151A21] border border-neutral-800 rounded-xl p-6 space-y-4 hover:border-[#C5A265]/50 transition-colors h-full">
                  <div className="h-10 w-10 rounded-lg bg-[#C5A265]/10 border border-[#C5A265]/30 flex items-center justify-center text-[#C5A265]">
                    <Icon size={20} />
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-[#F3EFEA]">{pillar.title}</h3>
                  <p className="text-xs text-stone-400 leading-relaxed">{pillar.desc}</p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>

      {/* Split Section 2: Channel Partner Model Explained */}
      <ScrollReveal animation="fade-up" duration={700}>
        <div className="bg-[#12161D] border border-neutral-800 rounded-2xl p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-5">
            <div className="editorial-img-container aspect-square rounded-xl overflow-hidden border border-neutral-800 relative">
              <img
                src="/assets/district.jpg"
                alt="Contemporary master-planned district boulevard in Riyadh"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 text-xs font-mono text-[#C5A265]">
                Master District Planning · Riyadh
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-5">
            <p className="text-xs font-mono uppercase tracking-widest text-[#C5A265]">The Mechanism</p>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#F3EFEA]">
              Why the Channel Partner Model Works Better
            </h2>
            <div className="space-y-3 text-xs sm:text-sm text-stone-300 leading-relaxed">
              <p>
                Developers excel at construction, architecture, and municipal delivery. Investors excel at capital allocation. Yet direct interactions often break down over misaligned timeline expectations, lack of comparative market context, or bureaucratic friction.
              </p>
              <p>
                As authorized channel partners, we bring developers pre-qualified, informed capital. For investors, we bring unfiltered access, institutional due diligence, and contract advocacy.
              </p>
              <p>
                Because our remuneration is structured directly with the master developer, our clients enjoy institutional-grade advisory at zero retail broker surcharge.
              </p>
            </div>

            <div className="pt-2 flex items-center gap-4">
              <button
                onClick={() => onOpenInquiry ? onOpenInquiry() : window.location.href = '/contact'}
                className="inline-flex items-center gap-2 bg-[#C5A265] text-[#0F1216] font-semibold px-5 py-2.5 rounded text-xs tracking-wider uppercase cursor-pointer"
              >
                <span>Schedule Strategic Consultation</span>
                <ArrowUpRight size={14} />
              </button>
            </div>
          </div>

        </div>
      </ScrollReveal>

    </div>
  );
}
