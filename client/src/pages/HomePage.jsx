import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowUpRight, 
  MapPin, 
  Building2, 
  ShieldCheck, 
  TrendingUp, 
  CheckCircle2, 
  Users, 
  Landmark, 
  ChevronRight,
  Compass,
  ArrowRight
} from 'lucide-react';
import PropertyCard from '../components/PropertyCard';
import ScrollReveal from '../components/ScrollReveal';
import { fetchProperties, fetchStats } from '../services/api';

export default function HomePage({ onOpenInquiry }) {
  const [featuredProperties, setFeaturedProperties] = useState([]);
  const [marketStats, setMarketStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [propsRes, statsRes] = await Promise.all([
          fetchProperties({ featured: 'true' }),
          fetchStats()
        ]);
        setFeaturedProperties(propsRes.data ? propsRes.data.slice(0, 3) : []);
        setMarketStats(statsRes);
      } catch (err) {
        console.error('Home page load error:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const corridors = [
    {
      city: 'Riyadh',
      tagline: 'The Capital Growth Engine',
      coordinates: '24°42′N 46°40′E',
      highlights: 'King Abdullah Financial District (KAFD) · Al Olaya · Hittin · Al Malqa',
      description: 'The administrative and institutional capital under Vision 2030, capturing national corporate headquarters, diplomatic estates, and prime residential developments.',
      image: '/assets/hero.jpg',
      statLabel: 'YoY Capital Growth',
      statVal: '+11.2%'
    },
    {
      city: 'Jeddah',
      tagline: 'Red Sea Gateway & Waterfront Living',
      coordinates: '21°32′N 39°10′E',
      highlights: 'Al Shati Corniche · Obhur Waterfront · Al Salamah Commercial',
      description: 'Saudi Arabia’s cosmopolitan coastal metropolis undergoing historic waterfront regeneration, luxury marina communities, and high-street boutique commerce.',
      image: '/assets/prop-jeddah.jpg',
      statLabel: 'Waterfront Yield',
      statVal: '6.8% Net'
    },
    {
      city: 'Al Khobar',
      tagline: 'Eastern Province Energy Corridor',
      coordinates: '26°17′N 50°12′E',
      highlights: 'Corniche Promenade · Dhahran Energy Hub · King Fahd Causeway',
      description: 'A stable, high-income coastal corridor serving senior executive tenancy from the global energy sector with immediate transit connectivity to Bahrain.',
      image: '/assets/prop-khobar.jpg',
      statLabel: 'Executive Tenancy',
      statVal: '94% Occupancy'
    }
  ];

  const advisorySteps = [
    {
      num: '01',
      title: 'Mandate & Capital Brief',
      desc: 'We define your precise criteria: yield targets, risk profile, holding period, and asset class preferences across commercial and residential inventory.'
    },
    {
      num: '02',
      title: 'Direct Channel Origination',
      desc: 'We access off-market and pre-launch units directly through our formal Tier-1 developer channel partnerships, eliminating intermediaries and markups.'
    },
    {
      num: '03',
      title: 'Technical & Yield Diligence',
      desc: 'Independent assessment of building specs, construction quality, title registration, and realistic rental comps based on municipal market data.'
    },
    {
      num: '04',
      title: 'Conveyance to Handover',
      desc: 'Full fiduciary oversight through developer contract execution, escrow payment milestones, REGA compliance, and key handover.'
    }
  ];

  return (
    <div className="space-y-24 md:space-y-32">
      
      {/* 1. HERO SECTION: Confident, Editorial, Grounded in Place */}
      <section className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 overflow-hidden">
        
        {/* Full Architectural Background Media */}
        <div className="absolute inset-0 z-0">
          <img
            src="/assets/hero.jpg"
            alt="Riyadh skyline at dusk showcasing contemporary architectural landmarks"
            className="w-full h-full object-cover object-center scale-100 filter brightness-[0.72] contrast-[1.08]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F1216] via-[#0F1216]/60 to-[#0F1216]/40" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-transparent via-[#0F1216]/50 to-[#0F1216]" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl space-y-6">
            
            {/* Identity & Coordinates Kicker */}
            <ScrollReveal animation="fade-down" duration={500} delay={100}>
              <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-[#151A21]/90 backdrop-blur-md border border-neutral-700/60 text-xs text-stone-300">
                <span className="h-1.5 w-1.5 rounded-full bg-[#C5A265]" />
                <span className="font-mono tracking-wider text-[11px] uppercase text-[#C5A265]">Kingdom of Saudi Arabia</span>
                <span className="text-stone-500">·</span>
                <span className="text-stone-400 font-mono text-[10.5px]">Riyadh · Jeddah · Al Khobar</span>
              </div>
            </ScrollReveal>

            {/* Headline */}
            <ScrollReveal animation="fade-up" duration={700} delay={200}>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#F3EFEA] leading-[1.12]">
                Fiduciary property advisory for serious capital.
              </h1>
            </ScrollReveal>

            {/* Subtitle / Positioning */}
            <ScrollReveal animation="fade-up" duration={700} delay={300}>
              <p className="text-base sm:text-lg text-stone-300 font-normal leading-relaxed max-w-2xl">
                MIRĀS connects family offices, institutional allocators, and discerning individuals directly with the Kingdom’s most accomplished master developers. Disciplined acquisitions, verified titles, and zero broker markups.
              </p>
            </ScrollReveal>

            {/* Primary Actions */}
            <ScrollReveal animation="fade-up" duration={700} delay={400}>
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                <Link
                  to="/properties"
                  className="inline-flex items-center justify-center gap-2 bg-[#C5A265] hover:bg-[#B28F52] text-[#0F1216] font-semibold px-6 py-3.5 rounded-md text-xs tracking-wider uppercase transition-all shadow-lg hover:shadow-[#C5A265]/20 cursor-pointer"
                >
                  <span>Explore Curated Portfolio</span>
                  <ArrowRight size={15} />
                </Link>
                
                <button
                  onClick={() => onOpenInquiry ? onOpenInquiry() : window.location.href = '/contact'}
                  className="inline-flex items-center justify-center gap-2 bg-[#171D25]/90 hover:bg-[#202732] border border-neutral-700 hover:border-neutral-500 text-stone-200 font-medium px-6 py-3.5 rounded-md text-xs tracking-wider uppercase transition-all cursor-pointer backdrop-blur-sm"
                >
                  <span>Consult an Advisor</span>
                  <ArrowUpRight size={15} className="text-[#C5A265]" />
                </button>
              </div>
            </ScrollReveal>

            {/* Trust Badges */}
            <ScrollReveal animation="fade-up" duration={600} delay={500}>
              <div className="pt-6 border-t border-neutral-800/80 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs font-mono text-stone-400">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={16} className="text-[#C5A265] shrink-0" />
                  <span>REGA Channel Certified</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building2 size={16} className="text-[#C5A265] shrink-0" />
                  <span>Tier-1 Master Developers</span>
                </div>
                <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                  <TrendingUp size={16} className="text-[#C5A265] shrink-0" />
                  <span>Direct Handover Pricing</span>
                </div>
              </div>
            </ScrollReveal>

          </div>
        </div>

      </section>

      {/* 2. THE THREE CORRIDORS: Regional Focus with Strong Sense of Place */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <ScrollReveal animation="fade-up">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="space-y-2 max-w-xl">
              <div className="flex items-center gap-2 text-xs font-mono text-[#C5A265] uppercase tracking-widest">
                <Compass size={14} />
                <span>Geographic Specialization</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#F3EFEA]">
                The Kingdom’s Three Growth Corridors
              </h2>
              <p className="text-stone-400 text-sm leading-relaxed">
                We focus capital where fundamental economic catalysts—infrastructure, demographic inflow, and state investment—drive sustained capital preservation.
              </p>
            </div>

            <Link
              to="/properties"
              className="inline-flex items-center gap-1.5 text-xs text-[#C5A265] hover:text-[#B28F52] font-semibold tracking-wider uppercase"
            >
              <span>View All Regional Listings</span>
              <ChevronRight size={14} />
            </Link>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {corridors.map((c, idx) => (
            <ScrollReveal 
              key={c.city}
              animation="fade-up"
              delay={idx * 140}
            >
              <div className="editorial-card rounded-xl overflow-hidden flex flex-col group h-full">
                <div className="editorial-img-container aspect-[16/10] relative">
                  <img
                    src={c.image}
                    alt={`${c.city} architecture and landscape`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#151A21] via-transparent to-black/30" />
                  <div className="absolute top-3 left-3 bg-[#0F1216]/80 backdrop-blur-sm px-2.5 py-1 rounded border border-neutral-700/60 font-mono text-[10.5px] text-[#C5A265]">
                    {c.coordinates}
                  </div>
                  <div className="absolute bottom-3 right-3 bg-[#0F1216]/90 backdrop-blur-md px-2.5 py-1 rounded border border-neutral-700 text-right">
                    <p className="text-[9px] uppercase font-mono text-stone-400">{c.statLabel}</p>
                    <p className="text-xs font-mono font-bold text-[#C5A265]">{c.statVal}</p>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-baseline justify-between mb-1">
                      <h3 className="font-serif text-2xl font-bold text-[#F3EFEA]">{c.city}</h3>
                      <span className="text-[11px] font-mono text-stone-400 uppercase">{c.tagline}</span>
                    </div>
                    <p className="text-stone-400 text-xs leading-relaxed mt-2">
                      {c.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-neutral-800 space-y-3">
                    <div>
                      <span className="text-[10px] font-mono text-stone-400 uppercase tracking-wider block mb-1">Active Prime Sectors</span>
                      <p className="text-xs text-stone-300 font-medium">{c.highlights}</p>
                    </div>

                    <Link
                      to={`/properties?city=${c.city}`}
                      className="inline-flex items-center gap-1.5 text-xs text-[#C5A265] hover:underline font-medium pt-1"
                    >
                      <span>Browse {c.city} Assets</span>
                      <ArrowRight size={12} />
                    </Link>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

      </section>

      {/* 3. FEATURED OPPORTUNITIES: Curated Properties Section */}
      <section className="bg-[#12161D] py-20 border-y border-neutral-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <ScrollReveal animation="fade-up">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div className="space-y-2 max-w-xl">
                <p className="text-xs font-mono uppercase tracking-widest text-[#C5A265]">
                  Curated Opportunities
                </p>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#F3EFEA]">
                  Selected Prime Units
                </h2>
                <p className="text-stone-400 text-sm leading-relaxed">
                  A selection of vetted residential villas, high-floor apartments, and commercial headquarters floors currently under advisory representation.
                </p>
              </div>

              <Link
                to="/properties"
                className="inline-flex items-center gap-2 bg-neutral-800 hover:bg-neutral-700 text-stone-200 text-xs font-semibold px-4 py-2.5 rounded border border-neutral-700 transition-colors"
              >
                <span>Explore All 7 Units</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </ScrollReveal>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-96 rounded-xl bg-neutral-800/40 animate-pulse border border-neutral-800" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProperties.map((property, idx) => (
                <ScrollReveal 
                  key={property.id}
                  animation="fade-up"
                  delay={idx * 130}
                >
                  <PropertyCard
                    property={property}
                    onInquire={(p) => onOpenInquiry ? onOpenInquiry(p) : null}
                  />
                </ScrollReveal>
              ))}
            </div>
          )}

          <ScrollReveal animation="fade-up" delay={200}>
            <div className="mt-10 p-4 rounded-lg bg-[#0F1216] border border-neutral-800/80 text-stone-400 text-xs flex flex-col sm:flex-row items-center justify-between gap-3">
              <p>
                <strong className="text-stone-300">Catalogue Transparency:</strong> Listings displayed represent realistic sample properties for client presentation and advisory testing.
              </p>
              <Link to="/properties" className="text-[#C5A265] hover:underline font-mono text-[11px] whitespace-nowrap">
                Filtered Search &rarr;
              </Link>
            </div>
          </ScrollReveal>

        </div>
      </section>

      {/* 4. THE MIRĀS ADVISORY MODEL: Distinctive, Credible Process */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 space-y-6">
            <ScrollReveal animation="fade-right">
              <div className="space-y-2">
                <p className="text-xs font-mono uppercase tracking-widest text-[#C5A265]">
                  Our Structural Advantage
                </p>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#F3EFEA] leading-tight">
                  Why Institutional Capital Chooses the Channel Partner Model
                </h2>
              </div>

              <p className="text-stone-300 text-sm leading-relaxed mt-4">
                Traditional real estate brokers rely on transactional churn and public listings. MIRĀS operates on a fiduciary advisory arc: we act as an originate-and-filter counterweight between master developers and qualified buyers.
              </p>

              <div className="space-y-3.5 text-xs text-stone-300 pt-3">
                <div className="flex items-start gap-3">
                  <div className="p-1 rounded bg-[#C5A265]/10 text-[#C5A265] mt-0.5">
                    <CheckCircle2 size={14} />
                  </div>
                  <div>
                    <strong className="text-[#F3EFEA] font-semibold block mb-0.5">Direct Developer Conveyance:</strong>
                    Contracts are executed directly with the master developer under regulated escrow accounts with zero intermediate brokerage surcharge.
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-1 rounded bg-[#C5A265]/10 text-[#C5A265] mt-0.5">
                    <CheckCircle2 size={14} />
                  </div>
                  <div>
                    <strong className="text-[#F3EFEA] font-semibold block mb-0.5">Rigorous Technical Filtering:</strong>
                    We reject approximately 70% of potential inventory based on construction milestone track record, build quality, and realistic yield modeling.
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-1 rounded bg-[#C5A265]/10 text-[#C5A265] mt-0.5">
                    <CheckCircle2 size={14} />
                  </div>
                  <div>
                    <strong className="text-[#F3EFEA] font-semibold block mb-0.5">Complete Handover Advocacy:</strong>
                    Our involvement continues beyond signature to snagging inspections, title deed registration with the Ministry of Justice, and tenant placement advisory.
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#C5A265] hover:text-[#B28F52]"
                >
                  <span>Read Full Corporate Philosophy</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </ScrollReveal>
          </div>

          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {advisorySteps.map((step, idx) => (
                <ScrollReveal 
                  key={step.num}
                  animation="fade-up"
                  delay={idx * 120}
                >
                  <div className="bg-[#151A21] border border-neutral-800 rounded-xl p-6 relative group hover:border-[#C5A265]/50 transition-colors h-full">
                    <span className="font-serif text-3xl font-bold text-neutral-700 group-hover:text-[#C5A265] transition-colors block mb-2">
                      {step.num}
                    </span>
                    <h3 className="font-serif text-base font-semibold text-[#F3EFEA] mb-2">
                      {step.title}
                    </h3>
                    <p className="text-xs text-stone-400 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>

        </div>

      </section>

      {/* 5. INVESTOR PATHWAYS: Tailored for Real Counterparties */}
      <section className="bg-[#10141A] py-20 border-y border-neutral-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <ScrollReveal animation="fade-up">
            <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
              <p className="text-xs font-mono uppercase tracking-widest text-[#C5A265]">
                Tailored Engagement Paths
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#F3EFEA]">
                How We Structure Your Acquisition
              </h2>
              <p className="text-stone-400 text-sm leading-relaxed">
                Every client arrives with distinct capital constraints, tax residency parameters, and timeline needs. Select your profile below.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Pathway 1 */}
            <ScrollReveal animation="fade-up" delay={0}>
              <div className="editorial-card rounded-xl p-7 flex flex-col justify-between space-y-6 h-full">
                <div className="space-y-4">
                  <div className="h-10 w-10 rounded-lg bg-[#C5A265]/10 border border-[#C5A265]/30 flex items-center justify-center text-[#C5A265]">
                    <Users size={20} />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-bold text-[#F3EFEA]">Private Residential Buyers</h3>
                    <p className="text-[11px] font-mono text-[#C5A265] mt-0.5">Villas · Penthouses · Family Estates</p>
                  </div>
                  <p className="text-xs text-stone-400 leading-relaxed">
                    For discerning families and private professionals seeking iconic living in Riyadh’s northern quarters (Hittin, Al Malqa) or coastal Jeddah. We handle architectural inspection, title deed verification, and bespoke interior fit-out introductions.
                  </p>
                </div>

                <button
                  onClick={() => onOpenInquiry ? onOpenInquiry({ type: 'Private Residential Acquisition' }) : null}
                  className="w-full py-2.5 px-4 rounded bg-neutral-800 hover:bg-neutral-700 text-stone-200 text-xs font-medium border border-neutral-700 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Submit Residential Brief</span>
                  <ArrowUpRight size={13} />
                </button>
              </div>
            </ScrollReveal>

            {/* Pathway 2 */}
            <ScrollReveal animation="fade-up" delay={150}>
              <div className="editorial-card rounded-xl p-7 flex flex-col justify-between space-y-6 border-[#C5A265]/40 shadow-xl bg-[#151B24] h-full">
                <div className="space-y-4">
                  <div className="h-10 w-10 rounded-lg bg-[#C5A265] flex items-center justify-center text-[#0F1216] font-bold">
                    <Landmark size={20} />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-bold text-[#F3EFEA]">Family Offices & Allocators</h3>
                    <p className="text-[11px] font-mono text-[#C5A265] mt-0.5">Commercial Floorplates · Yield Blocks</p>
                  </div>
                  <p className="text-xs text-stone-300 leading-relaxed">
                    Structured acquisitions of Grade-A office floors along King Fahd Road, high-street retail parades, and multi-unit residential portfolios. Detailed financial pro formas, tenancy covenants, and yield stress testing provided.
                  </p>
                </div>

                <button
                  onClick={() => onOpenInquiry ? onOpenInquiry({ type: 'Family Office Commercial Allocation' }) : null}
                  className="w-full py-2.5 px-4 rounded bg-[#C5A265] hover:bg-[#B28F52] text-[#0F1216] text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Request Commercial Portfolio</span>
                  <ArrowUpRight size={13} />
                </button>
              </div>
            </ScrollReveal>

            {/* Pathway 3 */}
            <ScrollReveal animation="fade-up" delay={300}>
              <div className="editorial-card rounded-xl p-7 flex flex-col justify-between space-y-6 h-full">
                <div className="space-y-4">
                  <div className="h-10 w-10 rounded-lg bg-[#C5A265]/10 border border-[#C5A265]/30 flex items-center justify-center text-[#C5A265]">
                    <Building2 size={20} />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-bold text-[#F3EFEA]">Master Developers</h3>
                    <p className="text-[11px] font-mono text-[#C5A265] mt-0.5">Channel Representation · Off-Plan</p>
                  </div>
                  <p className="text-xs text-stone-400 leading-relaxed">
                    For premier real estate developers with licensed off-plan or completed developments. We provide qualified institutional origination, international investor roadshows, and structured sales channel representation.
                  </p>
                </div>

                <Link
                  to="/partnerships"
                  className="w-full py-2.5 px-4 rounded bg-neutral-800 hover:bg-neutral-700 text-stone-200 text-xs font-medium border border-neutral-700 transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Developer Partnership Terms</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </ScrollReveal>

          </div>

        </div>
      </section>

      {/* 6. PROMINENT CONSULTATION & CALL-TO-ACTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <ScrollReveal animation="scale-up" duration={700}>
          <div className="bg-gradient-to-br from-[#161B23] via-[#12161E] to-[#0A0D10] border border-neutral-700/80 rounded-2xl p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-2xl">
            
            <div className="relative z-10 max-w-2xl space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#0F1216] border border-neutral-700 text-[10.5px] font-mono text-[#C5A265] uppercase">
                <span>Direct Concierge Desk</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F3EFEA] leading-tight">
                Begin your acquisition conversation with confidence.
              </h2>

              <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
                Whether you are evaluating a specific Riyadh commercial floorplate, a Red Sea oceanfront residence, or a broad capital allocation strategy, our advisory team is prepared to review your mandate.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <button
                  onClick={() => onOpenInquiry ? onOpenInquiry() : window.location.href = '/contact'}
                  className="inline-flex items-center justify-center gap-2 bg-[#C5A265] hover:bg-[#B28F52] text-[#0F1216] font-semibold px-6 py-3.5 rounded text-xs tracking-wider uppercase transition-colors cursor-pointer shadow-lg"
                >
                  <span>Submit Private Brief</span>
                  <ArrowUpRight size={15} />
                </button>

                <a
                  href="https://wa.me/966501234567"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-neutral-800/80 hover:bg-neutral-700 text-stone-200 border border-neutral-700 px-6 py-3.5 rounded text-xs tracking-wider uppercase transition-colors"
                >
                  <span>WhatsApp Private Concierge</span>
                </a>
              </div>

              <p className="text-stone-400 text-xs font-mono pt-2">
                Confidentiality assured under non-disclosure governance. No marketing unsolicited calls.
              </p>
            </div>

            {/* Decorative subtle architectural watermarked emblem */}
            <div className="absolute -right-10 -bottom-10 opacity-5 pointer-events-none select-none font-serif text-[240px] text-white">
              M
            </div>

          </div>
        </ScrollReveal>
      </section>

    </div>
  );
}
