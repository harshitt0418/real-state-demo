import React from 'react';
import { 
  Building, 
  Home, 
  Coins, 
  FileCheck2, 
  ArrowUpRight, 
  Check, 
  Compass
} from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';

export default function ServicesPage({ onOpenInquiry }) {
  const services = [
    {
      icon: Home,
      title: 'Private Residential Acquisitions',
      badge: 'Villas · Penthouses · Horizon Units',
      desc: 'Discreet acquisition representation for high-net-worth individuals and family offices seeking prime personal residences or trophy real estate in Riyadh, Jeddah, Mecca, Medina, and Dubai.',
      deliverables: [
        'Curated shortlist of unlisted and private developer releases',
        'Independent architectural snagging and finishes audit',
        'Negotiation of developer payment schedules and milestone escrows',
        'Coordination with Ministry of Justice electronic title deed registration'
      ]
    },
    {
      icon: Building,
      title: 'Commercial Office & Floorplate Advisory',
      badge: 'Grade-A Commercial · Regional HQs',
      desc: 'Advisory for owner-occupier corporations and yield allocators acquiring full-floor office floorplates and freestanding commercial towers along primary financial arteries.',
      deliverables: [
        'Technical due diligence: slab loads, core efficiencies, elevator ratios, LEED status',
        'Commercial lease covenant analysis and tenant profiling',
        'Corporate tax and Zakat capitalization advisory',
        'Direct conveyance to corporate title registration'
      ]
    },
    {
      icon: Coins,
      title: 'Bulk & Off-Plan Channel Allocation',
      badge: 'Pre-Launch · Yield Portfolios',
      desc: 'Institutional access to master-planned developments prior to public market launch, capturing developer early-bird terms and phased capital deployment structures.',
      deliverables: [
        'Wafi off-plan regulatory compliance verification',
        'Stress-tested rental cashflow and exit cap rate sensitivity models',
        'Direct relationship management with developer leadership',
        'Staged escrow draw audit and construction progress tracking'
      ]
    },
    {
      icon: FileCheck2,
      title: 'Handover & Asset Onboarding',
      badge: 'Snagging · Deeds · Tenancy',
      desc: 'Comprehensive post-contract governance ensuring that developer commitments are physically verified and legally documented prior to final fund disbursement.',
      deliverables: [
        'Comprehensive 180-point architectural and MEP defect inspection',
        'Developer warranty enforcement and rectification management',
        'Utility account transfers, district cooling, and smart metering setup',
        'Direct introduction to vetted institutional leasing operators'
      ]
    }
  ];

  const timeline = [
    { step: 'Stage 01', time: 'Days 1 – 3', title: 'Mandate Scoping', desc: 'Detailed interview establishing target corridor, asset type, liquidity timeline, and tax considerations.' },
    { step: 'Stage 02', time: 'Days 4 – 7', title: 'Channel Shortlist', desc: 'Direct sourcing of 3–5 matching assets from partner developer inventories with independent comp schedules.' },
    { step: 'Stage 03', time: 'Week 2', title: 'Diligence & Walkthrough', desc: 'Physical on-site inspection, MEP audit, and developer contract review conducted alongside legal counsel.' },
    { step: 'Stage 04', time: 'Week 3 – 4', title: 'Contract & Escrow', desc: 'Execution of developer agreement, escrow account funding under REGA rules, and milestone schedule lock-in.' },
    { step: 'Stage 05', time: 'Completion', title: 'Handover & Title', desc: 'Final snagging sign-off, Ministry of Justice title deed issuance, and asset onboarding.' }
  ];

  return (
    <div className="pt-28 pb-24 space-y-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Page Header */}
      <ScrollReveal animation="fade-down">
        <div className="space-y-4 max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-mono text-[#B8913A] uppercase tracking-widest">
            <Compass size={14} />
            <span>Investor Services & Advisory</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-[#0F0F0E] tracking-tight leading-tight">
            From acquisition brief to verified title deed.
          </h1>
          <p className="text-[#5A5A52] text-sm sm:text-base leading-relaxed">
            We guide clients through every critical juncture of the property acquisition lifecycle with rigorous due diligence, developer channel access, and complete fiduciary discipline.
          </p>
        </div>
      </ScrollReveal>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {services.map((srv, idx) => {
          const Icon = srv.icon;
          return (
            <ScrollReveal 
              key={idx} 
              animation="fade-up" 
              delay={idx * 130}
            >
              <div className="editorial-card rounded-xl p-8 flex flex-col justify-between space-y-6 bg-[#FAF7F2] h-full shadow-sm hover:shadow-md">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="h-10 w-10 rounded-lg bg-[#F0EBE1] border border-[rgba(184,145,58,0.3)] flex items-center justify-center text-[#B8913A]">
                      <Icon size={20} />
                    </div>
                    <span className="font-mono text-[10.5px] uppercase tracking-wider text-[#B8913A] px-2.5 py-0.5 rounded bg-[#F0EBE1] border border-[rgba(15,15,14,0.08)] font-semibold">
                      {srv.badge}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl font-bold text-[#0F0F0E]">{srv.title}</h3>
                  <p className="text-[#5A5A52] text-xs sm:text-sm leading-relaxed">{srv.desc}</p>

                  <div className="pt-3 border-t border-[rgba(15,15,14,0.08)] space-y-2">
                    <p className="text-[10px] font-mono uppercase text-[#6B6B5A] tracking-wider">Key Advisory Deliverables</p>
                    {srv.deliverables.map((item, dIdx) => (
                      <div key={dIdx} className="flex items-start gap-2.5 text-xs text-[#5A5A52]">
                        <div className="p-0.5 rounded bg-[#B8913A]/15 text-[#B8913A] mt-0.5 shrink-0">
                          <Check size={11} />
                        </div>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-[rgba(15,15,14,0.08)]">
                  <button
                    onClick={() => onOpenInquiry ? onOpenInquiry({ type: srv.title }) : null}
                    className="w-full py-3 px-4 rounded bg-[#F0EBE1] hover:bg-[#B8913A] text-[#0F0F0E] hover:text-[#FAF7F2] text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer border border-[rgba(15,15,14,0.08)]"
                  >
                    <span>Initiate {srv.title.split(' ')[0]} Mandate</span>
                    <ArrowUpRight size={13} />
                  </button>
                </div>
              </div>
            </ScrollReveal>
          );
        })}
      </div>

      {/* Structured Engagement Roadmap */}
      <ScrollReveal animation="fade-up" duration={700}>
        <div className="bg-[#0C0C0A] text-[#E8E3DC] border border-[rgba(255,255,255,0.08)] rounded-2xl p-8 sm:p-12 space-y-10">
          <div className="max-w-2xl space-y-2">
            <p className="text-xs font-mono uppercase tracking-widest text-[#B8913A]">The Advisory Arc</p>
            <h2 className="font-serif text-3xl font-bold text-[#E8E3DC]">
              How An Engagement Progresses
            </h2>
            <p className="text-[#8A8578] text-xs sm:text-sm leading-relaxed">
              Our disciplined five-stage process guarantees that no capital is committed until physical, legal, and financial parameters have been verified.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {timeline.map((item, idx) => (
              <div key={idx} className="relative space-y-3 p-5 rounded-xl bg-[#161614] border border-[rgba(255,255,255,0.06)]">
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="text-[#D4A853] font-bold">{item.step}</span>
                  <span className="text-[#8A8578]">{item.time}</span>
                </div>
                <h4 className="font-serif text-base font-semibold text-[#E8E3DC]">{item.title}</h4>
                <p className="text-[11.5px] text-[#8A8578] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>

    </div>
  );
}
