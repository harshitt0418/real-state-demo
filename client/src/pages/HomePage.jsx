import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowUpRight, ArrowRight, ShieldCheck, Building2, TrendingUp,
  CheckCircle2, Users, Landmark, Compass, ChevronRight, MapPin
} from 'lucide-react';
import PropertyCard from '../components/PropertyCard';
import ScrollReveal from '../components/ScrollReveal';
import MovingTextBand from '../components/MovingTextBand';
import { fetchProperties, fetchStats } from '../services/api';

/* ─── CountUp hook ─────────────────────────────────────────────── */
function useCountUp(target, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) { setCount(target); return; }

    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

/* ─── StatCounter component ─────────────────────────────────────── */
function StatCounter({ value, suffix = '', label, dark = false }) {
  const ref = useRef(null);
  const [started, setStarted] = useState(false);
  const count = useCountUp(value, 1800, started);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setStarted(true); observer.disconnect(); } },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="text-center">
      <p className={`font-serif font-bold text-4xl sm:text-5xl count-num ${dark ? 'text-[#E8E3DC]' : 'text-[#0F0F0E]'}`}>
        {count}{suffix}
      </p>
      <p className={`text-[10px] font-sans uppercase tracking-[0.18em] mt-2 ${dark ? 'text-[#5A5A52]' : 'text-[#8A8A75]'}`}>
        {label}
      </p>
    </div>
  );
}

/* ─── CityStorySection ───────────────────────────────────────────── */
function CityStorySection() {
  const [activeCity, setActiveCity] = useState(0);
  const sectionRef = useRef(null);
  const timerRef = useRef(null);

  const cities = [
    {
      city: 'Riyadh',
      arabic: 'الرياض',
      tagline: 'The Capital Growth Engine',
      coordinates: '24°42′N 46°40′E',
      description: 'The administrative and institutional capital under Vision 2030, capturing national corporate headquarters, diplomatic estates, and prime residential developments across the northern corridor.',
      highlights: ['King Abdullah Financial District', 'Al Olaya Tower Belt', 'Hittin & Al Malqa Villas', 'New Murabba District'],
      image: '/assets/hero.jpg',
      stat: '+11.2%',
      statLabel: 'YoY Capital Growth',
      metric2: 'SAR 18,400',
      metric2Label: 'Avg. Prime PSM',
      color: '#B8913A'
    },
    {
      city: 'Jeddah',
      arabic: 'جدة',
      tagline: 'Red Sea Gateway & Waterfront Living',
      coordinates: '21°32′N 39°10′E',
      description: "Saudi Arabia's cosmopolitan coastal metropolis undergoing historic waterfront regeneration — luxury marina communities, high-street boutique commerce, and record yield generation at the Corniche.",
      highlights: ['Al Shati Corniche', 'Obhur Waterfront', 'Al Salamah Commercial', 'Jeddah Economic City'],
      image: '/assets/prop-jeddah.jpg',
      stat: '6.8%',
      statLabel: 'Waterfront Net Yield',
      metric2: 'SAR 14,200',
      metric2Label: 'Avg. Coastal PSM',
      color: '#8A6C2A'
    },
    {
      city: 'Al Khobar',
      arabic: 'الخبر',
      tagline: 'Eastern Province Energy Corridor',
      coordinates: '26°17′N 50°12′E',
      description: 'A stable, high-income coastal corridor serving senior executive tenancy from the global energy sector with immediate transit connectivity to Bahrain and a rapidly maturing commercial spine.',
      highlights: ['Corniche Promenade', 'Dhahran Energy Hub', 'King Fahd Causeway', 'Al Aqrabiyah Business'],
      image: '/assets/prop-khobar.jpg',
      stat: '94%',
      statLabel: 'Executive Occupancy',
      metric2: 'SAR 11,800',
      metric2Label: 'Avg. Prime PSM',
      color: '#6B6B5A'
    }
  ];

  // Auto-advance
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setActiveCity(prev => (prev + 1) % cities.length);
    }, 5000);
    return () => clearInterval(timerRef.current);
  }, []);

  const handleCityClick = (i) => {
    setActiveCity(i);
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActiveCity(prev => (prev + 1) % cities.length);
    }, 5000);
  };

  const c = cities[activeCity];

  return (
    <section className="bg-[#0C0C0A] py-24 overflow-hidden dark-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <ScrollReveal animation="fade-up">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div className="space-y-3">
              <p className="section-label text-[#B8913A]">Geographic Specialization</p>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#E8E3DC] leading-tight">
                Three Capital Markets,<br />One Advisory Lens
              </h2>
            </div>
            <Link to="/properties" className="inline-flex items-center gap-2 text-xs font-semibold text-[#B8913A] hover:text-[#D4A853] tracking-wider uppercase transition-colors">
              <span>Explore All Listings</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </ScrollReveal>

        {/* City tabs */}
        <div className="flex gap-0 mb-12 border-b border-[rgba(255,255,255,0.06)]">
          {cities.map((city, i) => (
            <button
              key={city.city}
              onClick={() => handleCityClick(i)}
              className={`px-6 py-3 text-sm font-medium font-sans tracking-wide cursor-pointer border-b-2 transition-all duration-300 ${
                activeCity === i
                  ? 'text-[#D4A853] border-[#B8913A]'
                  : 'text-[#5A5A52] border-transparent hover:text-[#8A8578]'
              }`}
            >
              {city.city}
            </button>
          ))}
        </div>

        {/* City panel */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[420px]">
          {/* Left: image */}
          <div className="relative rounded-2xl overflow-hidden aspect-[4/3] lg:aspect-auto lg:h-[480px]">
            <img
              src={c.image}
              alt={c.city}
              className="w-full h-full object-cover transition-all duration-700"
              style={{ opacity: 1 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0A]/70 via-transparent to-transparent" />

            {/* Coordinates chip */}
            <div className="absolute top-4 left-4 bg-[#0C0C0A]/85 backdrop-blur-sm px-3 py-1.5 rounded border border-[rgba(255,255,255,0.08)]">
              <p className="text-[10px] font-mono text-[#B8913A] tracking-wider">{c.coordinates}</p>
            </div>

            {/* Stat chip */}
            <div className="absolute bottom-4 right-4 text-right bg-[#0C0C0A]/90 backdrop-blur-sm px-4 py-3 rounded border border-[rgba(255,255,255,0.08)]">
              <p className="text-[9px] font-mono uppercase text-[#5A5A52] mb-0.5">{c.statLabel}</p>
              <p className="font-serif text-xl font-bold text-[#D4A853]">{c.stat}</p>
            </div>
          </div>

          {/* Right: content */}
          <div className="space-y-8">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <h3 className="font-serif text-4xl sm:text-5xl font-bold text-[#E8E3DC]">{c.city}</h3>
                <span className="font-serif text-2xl text-[#B8913A]/60">{c.arabic}</span>
              </div>
              <p className="text-[11px] font-mono uppercase tracking-widest text-[#5A5A52] mb-4">{c.tagline}</p>
              <p className="text-[#8A8578] text-sm sm:text-base leading-relaxed">{c.description}</p>
            </div>

            {/* Key sectors */}
            <div>
              <p className="text-[10px] font-mono uppercase tracking-wider text-[#5A5A52] mb-3">Active Prime Sectors</p>
              <div className="grid grid-cols-2 gap-2">
                {c.highlights.map((h, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-[#8A8578]">
                    <span className="h-1 w-4 bg-[#B8913A]/50 rounded-full shrink-0" />
                    {h}
                  </div>
                ))}
              </div>
            </div>

            {/* Metrics row */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#141412] border border-[rgba(255,255,255,0.06)] rounded-xl p-4">
                <p className="text-[9px] font-mono uppercase text-[#5A5A52] mb-1">{c.statLabel}</p>
                <p className="font-serif text-2xl font-bold text-[#D4A853]">{c.stat}</p>
              </div>
              <div className="bg-[#141412] border border-[rgba(255,255,255,0.06)] rounded-xl p-4">
                <p className="text-[9px] font-mono uppercase text-[#5A5A52] mb-1">{c.metric2Label}</p>
                <p className="font-serif text-2xl font-bold text-[#E8E3DC]">{c.metric2}</p>
              </div>
            </div>

            <Link
              to={`/properties?city=${c.city}`}
              className="inline-flex items-center gap-2 text-xs font-semibold text-[#B8913A] hover:text-[#D4A853] tracking-wider uppercase transition-colors"
            >
              <span>Browse {c.city} Portfolio</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}

/* ─── InvestmentIntelligence section ────────────────────────────── */
function InvestmentIntelligence({ marketStats }) {
  const insightsRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.2 }
    );
    if (insightsRef.current) observer.observe(insightsRef.current);
    return () => observer.disconnect();
  }, []);

  const metrics = [
    { label: 'Avg. Capital Growth — Riyadh Prime', value: 11, suffix: '%', sub: 'Year-on-year residential' },
    { label: 'Waterfront Net Yield — Jeddah', value: 68, suffix: '%', sub: 'Corniche corridor assets', displayVal: '6.8' },
    { label: 'Executive Occupancy — Al Khobar', value: 94, suffix: '%', sub: 'Senior energy tenancy' },
    { label: 'Developer Channel Inventory', value: 7, suffix: '+', sub: 'Curated advisory units' },
  ];

  return (
    <section ref={insightsRef} className="bg-[#0C0C0A] py-24 dark-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <ScrollReveal animation="fade-up">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div className="space-y-3">
              <p className="section-label text-[#B8913A]">Market Intelligence</p>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#E8E3DC] leading-tight">
                Investment Data,<br />Not Market Noise
              </h2>
              <p className="text-[#5A5A52] text-sm leading-relaxed max-w-lg">
                Placeholder metrics for demonstration. Verified figures from municipal market data and direct developer reporting channels provided to clients under advisory mandate.
              </p>
            </div>
            <Link to="/services" className="inline-flex items-center gap-2 text-xs font-semibold text-[#B8913A] hover:text-[#D4A853] tracking-wider uppercase transition-colors">
              <span>Full Intelligence Service</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </ScrollReveal>

        {/* Metrics grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {metrics.map((m, i) => (
            <ScrollReveal key={i} animation="fade-up" delay={i * 100}>
              <div className="bg-[#141412] border border-[rgba(255,255,255,0.06)] rounded-xl p-6">
                <p className="text-[10px] font-mono uppercase tracking-wider text-[#5A5A52] mb-4 leading-snug">{m.label}</p>
                <div className="flex items-baseline gap-1">
                  <span className="font-serif text-4xl font-bold text-[#E8E3DC] count-num">
                    {visible ? (m.displayVal || m.value) : '0'}
                  </span>
                  <span className="text-lg font-sans text-[#B8913A]">{m.suffix}</span>
                </div>
                <p className="text-[11px] text-[#3A3A35] mt-2">{m.sub}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Trust band */}
        <ScrollReveal animation="fade-up">
          <div className="border border-[rgba(255,255,255,0.06)] rounded-2xl p-8 sm:p-10 bg-[#141412]">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
              {[
                { icon: ShieldCheck, label: 'REGA Channel Certified', sub: 'Regulated real estate authority' },
                { icon: Building2, label: 'Tier-1 Master Developers', sub: 'Direct allocation access' },
                { icon: TrendingUp, label: 'Verified Title Conveyance', sub: 'Ministry of Justice registered' },
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-[#B8913A]/10 border border-[#B8913A]/25 flex items-center justify-center text-[#B8913A]">
                    <item.icon size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#E8E3DC] mb-0.5">{item.label}</p>
                    <p className="text-[11px] text-[#5A5A52]">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}

/* ─── Main HomePage ──────────────────────────────────────────────── */
export default function HomePage({ onOpenInquiry }) {
  const [featuredProperties, setFeaturedProperties] = useState([]);
  const [marketStats, setMarketStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const heroRef = useRef(null);
  const [heroLoaded, setHeroLoaded] = useState(false);

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
    // Trigger hero animation after mount
    const t = setTimeout(() => setHeroLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  const advisorySteps = [
    { num: '01', title: 'Mandate & Capital Brief', desc: 'We define your precise criteria: yield targets, risk profile, holding period, and asset class preferences across commercial and residential inventory.' },
    { num: '02', title: 'Direct Channel Origination', desc: 'We access off-market and pre-launch units directly through our formal Tier-1 developer channel partnerships, eliminating intermediaries and markups.' },
    { num: '03', title: 'Technical & Yield Diligence', desc: 'Independent assessment of building specs, construction quality, title registration, and realistic rental comps based on municipal market data.' },
    { num: '04', title: 'Conveyance to Handover', desc: 'Full fiduciary oversight through developer contract execution, escrow payment milestones, REGA compliance, and key handover.' },
  ];

  return (
    <div>

      {/* ═══════════════════════════════════════════
          1. HERO — Bright, editorial, image-led
         ═══════════════════════════════════════════ */}
      <section ref={heroRef} className="relative min-h-screen flex flex-col overflow-hidden">

        {/* Background architectural image */}
        <div className="absolute inset-0 z-0 parallax-layer-slow">
          <img
            src="/assets/hero.jpg"
            alt="Riyadh skyline at dusk showcasing contemporary architectural landmarks"
            className="w-full h-full object-cover object-center"
            style={{ transform: 'scale(1.06)' }}
          />
          {/* Warm ivory overlay — brighter approach */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F0F0E]/85 via-[#0F0F0E]/55 to-[#0F0F0E]/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0E]/80 via-transparent to-[#0F0F0E]/30" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex-1 flex items-center pt-28 pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

              {/* Left: headline + CTA */}
              <div className="lg:col-span-7 space-y-7">

                {/* Kicker chip */}
                <div
                  style={{
                    opacity: heroLoaded ? 1 : 0,
                    transform: heroLoaded ? 'translateY(0)' : 'translateY(-16px)',
                    transition: 'opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s'
                  }}
                >
                  <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 text-xs text-white/80">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#D4A853] animate-pulse" />
                    <span className="font-mono tracking-wider text-[11px] uppercase text-[#D4A853]">Kingdom of Saudi Arabia</span>
                    <span className="text-white/30">·</span>
                    <span className="text-white/60 font-mono text-[10.5px]">Riyadh · Jeddah · Al Khobar</span>
                  </div>
                </div>

                {/* Headline */}
                <div
                  style={{
                    opacity: heroLoaded ? 1 : 0,
                    transform: heroLoaded ? 'translateY(0)' : 'translateY(24px)',
                    transition: 'opacity 0.9s cubic-bezier(0.16,1,0.3,1) 0.2s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.2s'
                  }}
                >
                  <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-white leading-[1.08]">
                    Fiduciary property<br />
                    <span className="text-[#D4A853]">advisory</span> for<br />
                    serious capital.
                  </h1>
                </div>

                {/* Body */}
                <div
                  style={{
                    opacity: heroLoaded ? 1 : 0,
                    transform: heroLoaded ? 'translateY(0)' : 'translateY(20px)',
                    transition: 'opacity 0.8s ease 0.4s, transform 0.8s ease 0.4s'
                  }}
                >
                  <p className="text-base sm:text-lg text-white/75 font-normal leading-relaxed max-w-xl">
                    MIRĀS connects family offices, institutional allocators, and discerning individuals directly with the Kingdom's most accomplished master developers. Disciplined acquisitions, verified titles, and zero broker markups.
                  </p>
                </div>

                {/* CTAs */}
                <div
                  style={{
                    opacity: heroLoaded ? 1 : 0,
                    transform: heroLoaded ? 'translateY(0)' : 'translateY(20px)',
                    transition: 'opacity 0.8s ease 0.55s, transform 0.8s ease 0.55s'
                  }}
                >
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                    <Link
                      to="/properties"
                      className="inline-flex items-center justify-center gap-2 bg-[#B8913A] hover:bg-[#D4A853] text-[#FAF7F2] font-semibold px-7 py-4 rounded text-xs tracking-wider uppercase transition-all shadow-xl hover:shadow-[#B8913A]/30 cursor-pointer"
                    >
                      <span>Explore Curated Portfolio</span>
                      <ArrowRight size={15} />
                    </Link>

                    <button
                      onClick={() => onOpenInquiry ? onOpenInquiry() : window.location.href = '/contact'}
                      className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 hover:border-white/35 text-white font-medium px-7 py-4 rounded text-xs tracking-wider uppercase transition-all cursor-pointer"
                    >
                      <span>Consult an Advisor</span>
                      <ArrowUpRight size={15} className="text-[#D4A853]" />
                    </button>
                  </div>
                </div>

                {/* Trust badges */}
                <div
                  style={{
                    opacity: heroLoaded ? 1 : 0,
                    transition: 'opacity 0.8s ease 0.7s'
                  }}
                >
                  <div className="pt-6 border-t border-white/10 grid grid-cols-3 gap-4 text-xs font-mono text-white/50">
                    <div className="flex items-center gap-2">
                      <ShieldCheck size={15} className="text-[#D4A853] shrink-0" />
                      <span>REGA Certified</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Building2 size={15} className="text-[#D4A853] shrink-0" />
                      <span>Tier-1 Developers</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp size={15} className="text-[#D4A853] shrink-0" />
                      <span>Direct Pricing</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Right: Floating city cards */}
              <div className="lg:col-span-5 hidden lg:flex flex-col gap-4 parallax-layer-mid">
                {[
                  { city: 'Riyadh', stat: '+11.2%', statLabel: 'Capital Growth', image: '/assets/hero.jpg', coords: '24°42′N' },
                  { city: 'Jeddah', stat: '6.8% Net', statLabel: 'Waterfront Yield', image: '/assets/prop-jeddah.jpg', coords: '21°32′N' },
                  { city: 'Al Khobar', stat: '94%', statLabel: 'Occupancy', image: '/assets/prop-khobar.jpg', coords: '26°17′N' },
                ].map((item, i) => (
                  <Link
                    key={item.city}
                    to={`/properties?city=${item.city}`}
                    className="group flex items-center gap-4 bg-white/10 hover:bg-white/18 backdrop-blur-md border border-white/15 hover:border-[#B8913A]/50 rounded-xl p-4 transition-all duration-300"
                    style={{
                      opacity: heroLoaded ? 1 : 0,
                      transform: heroLoaded ? 'translateX(0)' : 'translateX(40px)',
                      transition: `opacity 0.7s ease ${0.4 + i * 0.15}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${0.4 + i * 0.15}s, background-color 0.3s, border-color 0.3s`
                    }}
                  >
                    <div className="h-14 w-14 rounded-lg overflow-hidden shrink-0">
                      <img src={item.image} alt={item.city} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-white font-semibold text-sm font-sans">{item.city}</span>
                        <span className="text-white/30 font-mono text-[10px]">{item.coords}</span>
                      </div>
                      <p className="text-[10px] font-mono text-white/40 uppercase tracking-wider">{item.statLabel}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="font-serif text-lg font-bold text-[#D4A853]">{item.stat}</p>
                      <ArrowUpRight size={14} className="text-white/30 group-hover:text-[#D4A853] transition-colors ml-auto mt-1" />
                    </div>
                  </Link>
                ))}

                {/* Brass connection line (decorative) */}
                <div className="flex items-center gap-3 px-4 pt-2">
                  <div className="h-px flex-1 bg-gradient-to-r from-[#B8913A]/40 to-transparent" />
                  <span className="text-[10px] font-mono text-[#B8913A]/60 uppercase tracking-widest">KSA Prime Portfolio</span>
                  <div className="h-px flex-1 bg-gradient-to-l from-[#B8913A]/40 to-transparent" />
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Bottom ticker */}
        <div className="relative z-10 border-t border-white/08 bg-[#0F0F0E]/60 backdrop-blur-sm overflow-hidden py-3">
          <div className="hero-ticker-track">
            {['RIYADH', 'JEDDAH', 'AL KHOBAR', 'CURATED CAPITAL', 'FIDUCIARY ADVISORY', 'VERIFIED TITLES', 'DIRECT DEVELOPER CHANNEL',
              'RIYADH', 'JEDDAH', 'AL KHOBAR', 'CURATED CAPITAL', 'FIDUCIARY ADVISORY', 'VERIFIED TITLES', 'DIRECT DEVELOPER CHANNEL'
            ].map((text, i) => (
              <React.Fragment key={i}>
                <span className="text-[11px] font-mono tracking-[0.24em] uppercase text-white/30 px-6 whitespace-nowrap">{text}</span>
                <span className="text-[#B8913A]/40 px-2" aria-hidden="true">·</span>
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* Moving text band */}
      <MovingTextBand
        items={['FIDUCIARY ADVISORY', 'DIRECT DEVELOPER CHANNEL', 'VERIFIED TITLES', 'CURATED CAPITAL', 'RIYADH · JEDDAH · AL KHOBAR']}
        speed="slow"
      />

      {/* ═══════════════════════════════════════════
          2. FEATURED PROPERTIES — Editorial grid
         ═══════════════════════════════════════════ */}
      <section className="bg-[#FAF7F2] py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <ScrollReveal animation="fade-up">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
              <div className="space-y-3 max-w-xl">
                <p className="section-label">Curated Opportunities</p>
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F0F0E] leading-tight">
                  Selected Prime Units
                </h2>
                <p className="text-[#6B6B5A] text-sm leading-relaxed">
                  A selection of vetted residential villas, high-floor apartments, and commercial headquarters floors under advisory representation.
                </p>
              </div>
              <Link
                to="/properties"
                className="inline-flex items-center gap-2 bg-[#F0EBE1] hover:bg-[#E8E1D5] text-[#3A3A35] text-xs font-semibold px-5 py-2.5 rounded border border-[rgba(15,15,14,0.10)] transition-colors whitespace-nowrap"
              >
                <span>View All Properties</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </ScrollReveal>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-96 rounded-xl bg-[#F0EBE1] animate-pulse border border-[rgba(15,15,14,0.06)]" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProperties.map((property, idx) => (
                <ScrollReveal key={property.id} animation="fade-up" delay={idx * 120}>
                  <PropertyCard
                    property={property}
                    onInquire={(p) => onOpenInquiry ? onOpenInquiry(p) : null}
                  />
                </ScrollReveal>
              ))}
            </div>
          )}

          {/* Disclaimer */}
          <ScrollReveal animation="fade-up" delay={200}>
            <div className="mt-10 p-4 rounded-xl bg-[#F0EBE1] border border-[rgba(15,15,14,0.08)] text-[#8A8A75] text-xs flex flex-col sm:flex-row items-center justify-between gap-3">
              <p>
                <strong className="text-[#6B6B5A]">Catalogue Transparency:</strong> Listings represent realistic sample properties for advisory demonstration and client briefing purposes.
              </p>
              <Link to="/properties" className="text-[#B8913A] hover:underline font-mono text-[11px] whitespace-nowrap">
                Filtered Search →
              </Link>
            </div>
          </ScrollReveal>

        </div>
      </section>

      {/* ═══════════════════════════════════════════
          3. CITY STORY SECTION (Dark, interactive)
         ═══════════════════════════════════════════ */}
      <CityStorySection />

      {/* ═══════════════════════════════════════════
          4. ADVISORY MODEL — Light sandstone bg
         ═══════════════════════════════════════════ */}
      <section className="bg-[#F0EBE1] py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

            {/* Left: explanation */}
            <div className="lg:col-span-5 space-y-6">
              <ScrollReveal animation="fade-right">
                <div className="space-y-3">
                  <p className="section-label">Our Structural Advantage</p>
                  <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F0F0E] leading-tight">
                    Why Institutional Capital Chooses the Channel Partner Model
                  </h2>
                </div>
                <p className="text-[#6B6B5A] text-sm leading-relaxed mt-4">
                  Traditional real estate brokers rely on transactional churn and public listings. MIRĀS operates on a fiduciary advisory arc: we act as an originate-and-filter counterweight between master developers and qualified buyers.
                </p>
                <div className="space-y-4 text-xs text-[#5A5A52] pt-4">
                  {[
                    { title: 'Direct Developer Conveyance:', desc: 'Contracts executed directly with the master developer under regulated escrow accounts with zero intermediate brokerage surcharge.' },
                    { title: 'Rigorous Technical Filtering:', desc: 'We reject approximately 70% of potential inventory based on construction milestone track record, build quality, and realistic yield modeling.' },
                    { title: 'Complete Handover Advocacy:', desc: 'Our involvement continues beyond signature to snagging inspections, title deed registration with the Ministry of Justice, and tenant placement advisory.' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="p-1 rounded bg-[#B8913A]/10 text-[#B8913A] mt-0.5 shrink-0">
                        <CheckCircle2 size={14} />
                      </div>
                      <div>
                        <strong className="text-[#0F0F0E] font-semibold block mb-0.5">{item.title}</strong>
                        {item.desc}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="pt-4">
                  <Link to="/about" className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#B8913A] hover:text-[#8A6C2A] transition-colors">
                    <span>Read Full Corporate Philosophy</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </ScrollReveal>
            </div>

            {/* Right: advisory steps */}
            <div className="lg:col-span-7">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {advisorySteps.map((step, idx) => (
                  <ScrollReveal key={step.num} animation="fade-up" delay={idx * 110}>
                    <div className="bg-[#FAF7F2] border border-[rgba(15,15,14,0.08)] rounded-xl p-7 group hover:border-[#B8913A]/35 transition-colors h-full shadow-sm hover:shadow-md transition-shadow">
                      <span className="font-serif text-4xl font-bold text-[#E8E1D5] group-hover:text-[#D4A853] transition-colors block mb-3">{step.num}</span>
                      <h3 className="font-serif text-base font-semibold text-[#0F0F0E] mb-2">{step.title}</h3>
                      <p className="text-xs text-[#6B6B5A] leading-relaxed">{step.desc}</p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Moving text band (reversed) */}
      <MovingTextBand
        items={['MANDATE REVIEW', 'ORIGINATION', 'DILIGENCE', 'CONVEYANCE', 'HANDOVER ADVOCACY']}
        reverse={true}
        speed="slow"
      />

      {/* ═══════════════════════════════════════════
          5. INVESTMENT INTELLIGENCE (Dark section)
         ═══════════════════════════════════════════ */}
      <InvestmentIntelligence marketStats={marketStats} />

      {/* ═══════════════════════════════════════════
          6. INVESTOR PATHWAYS — Ivory bg
         ═══════════════════════════════════════════ */}
      <section className="bg-[#FAF7F2] py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <ScrollReveal animation="fade-up">
            <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
              <p className="section-label">Tailored Engagement Paths</p>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0F0F0E] leading-tight">
                How We Structure Your Acquisition
              </h2>
              <p className="text-[#6B6B5A] text-sm leading-relaxed">
                Every client arrives with distinct capital constraints, tax residency parameters, and timeline needs.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {[
              {
                icon: Users,
                title: 'Private Residential Buyers',
                sub: 'Villas · Penthouses · Family Estates',
                desc: "For discerning families and private professionals seeking iconic living in Riyadh's northern quarters (Hittin, Al Malqa) or coastal Jeddah. We handle architectural inspection, title deed verification, and bespoke interior fit-out introductions.",
                cta: 'Submit Residential Brief',
                type: 'Private Residential Acquisition',
                variant: 'outline'
              },
              {
                icon: Landmark,
                title: 'Family Offices & Allocators',
                sub: 'Commercial Floorplates · Yield Blocks',
                desc: 'Structured acquisitions of Grade-A office floors along King Fahd Road, high-street retail parades, and multi-unit residential portfolios. Detailed financial pro formas, tenancy covenants, and yield stress testing provided.',
                cta: 'Request Commercial Portfolio',
                type: 'Family Office Commercial Allocation',
                variant: 'brass'
              },
              {
                icon: Building2,
                title: 'Master Developers',
                sub: 'Channel Representation · Off-Plan',
                desc: 'For premier real estate developers with licensed off-plan or completed developments. We provide qualified institutional origination, international investor roadshows, and structured sales channel representation.',
                cta: 'Developer Partnership Terms',
                href: '/partnerships',
                variant: 'outline'
              }
            ].map((pathway, idx) => (
              <ScrollReveal key={idx} animation="fade-up" delay={idx * 120}>
                <div className={`editorial-card rounded-xl p-7 flex flex-col justify-between space-y-6 h-full ${
                  pathway.variant === 'brass' ? 'border-[#B8913A]/30 shadow-lg' : ''
                }`}>
                  <div className="space-y-4">
                    <div className={`h-11 w-11 rounded-xl flex items-center justify-center ${
                      pathway.variant === 'brass'
                        ? 'bg-[#B8913A] text-[#FAF7F2]'
                        : 'bg-[#F0EBE1] border border-[rgba(184,145,58,0.25)] text-[#B8913A]'
                    }`}>
                      <pathway.icon size={20} />
                    </div>
                    <div>
                      <h3 className="font-serif text-xl font-bold text-[#0F0F0E]">{pathway.title}</h3>
                      <p className="text-[11px] font-mono text-[#B8913A] mt-0.5">{pathway.sub}</p>
                    </div>
                    <p className="text-xs text-[#6B6B5A] leading-relaxed">{pathway.desc}</p>
                  </div>

                  {pathway.href ? (
                    <Link
                      to={pathway.href}
                      className="w-full py-2.5 px-4 rounded bg-[#F0EBE1] hover:bg-[#E8E1D5] text-[#3A3A35] text-xs font-medium border border-[rgba(15,15,14,0.10)] transition-colors flex items-center justify-center gap-1.5"
                    >
                      <span>{pathway.cta}</span>
                      <ArrowRight size={13} />
                    </Link>
                  ) : (
                    <button
                      onClick={() => onOpenInquiry ? onOpenInquiry({ type: pathway.type }) : null}
                      className={`w-full py-2.5 px-4 rounded text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
                        pathway.variant === 'brass'
                          ? 'bg-[#B8913A] hover:bg-[#D4A853] text-[#FAF7F2]'
                          : 'bg-[#F0EBE1] hover:bg-[#E8E1D5] text-[#3A3A35] border border-[rgba(15,15,14,0.10)]'
                      }`}
                    >
                      <span>{pathway.cta}</span>
                      <ArrowUpRight size={13} />
                    </button>
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════
          7. STATS ROW — Parchment bg
         ═══════════════════════════════════════════ */}
      <section className="bg-[#E8E1D5] py-16 border-y border-[rgba(15,15,14,0.08)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            <StatCounter value={7} suffix="+" label="Advisory Units" />
            <StatCounter value={3} suffix="" label="KSA Prime Markets" />
            <StatCounter value={100} suffix="%" label="Verified Titles" />
            <StatCounter value={0} suffix="" label="Broker Markups" />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          8. PROMINENT CTA (Dark section)
         ═══════════════════════════════════════════ */}
      <section className="bg-[#0C0C0A] py-24 dark-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal animation="scale-up" duration={700}>
            <div className="border border-[rgba(255,255,255,0.06)] rounded-2xl p-10 sm:p-14 lg:p-20 relative overflow-hidden bg-[#141412]">

              <div className="relative z-10 max-w-2xl space-y-7">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#B8913A]/10 border border-[#B8913A]/25 text-[10.5px] font-mono text-[#B8913A] uppercase">
                  <span>Direct Concierge Desk</span>
                </div>

                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#E8E3DC] leading-tight">
                  Begin your acquisition conversation with confidence.
                </h2>

                <p className="text-[#8A8578] text-sm sm:text-base leading-relaxed">
                  Whether you are evaluating a specific Riyadh commercial floorplate, a Red Sea oceanfront residence, or a broad capital allocation strategy, our advisory team is prepared to review your mandate.
                </p>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                  <button
                    onClick={() => onOpenInquiry ? onOpenInquiry() : window.location.href = '/contact'}
                    className="inline-flex items-center justify-center gap-2 bg-[#B8913A] hover:bg-[#D4A853] text-[#FAF7F2] font-semibold px-7 py-4 rounded text-xs tracking-wider uppercase transition-colors cursor-pointer shadow-lg shadow-[#B8913A]/20"
                  >
                    <span>Submit Private Brief</span>
                    <ArrowUpRight size={15} />
                  </button>

                  <a
                    href="https://wa.me/966501234567"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-transparent hover:bg-white/5 text-[#8A8578] border border-[rgba(255,255,255,0.10)] hover:border-[rgba(255,255,255,0.20)] px-7 py-4 rounded text-xs tracking-wider uppercase transition-all"
                  >
                    <span>WhatsApp Private Concierge</span>
                  </a>
                </div>

                <p className="text-[#3A3A35] text-xs font-mono">
                  Confidentiality assured under non-disclosure governance. No marketing unsolicited calls.
                </p>
              </div>

              {/* Decorative watermark */}
              <div className="absolute -right-8 -bottom-8 opacity-[0.03] pointer-events-none select-none font-serif text-[280px] leading-none text-white">
                M
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

    </div>
  );
}
