import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowUpRight, ArrowRight, ShieldCheck, Building2, TrendingUp,
  CheckCircle2, Users, Landmark, Compass, ChevronRight, MapPin,
  Sparkles, Activity, FileCheck, Layers
} from 'lucide-react';
import PropertyCard from '../components/PropertyCard';
import ScrollReveal from '../components/ScrollReveal';
import MovingTextBand from '../components/MovingTextBand';
import { fetchProperties, fetchStats } from '../services/api';

gsap.registerPlugin(ScrollTrigger);

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
    <div ref={ref} className="text-center group">
      <p className={`font-serif font-bold text-4xl sm:text-5xl count-num transition-transform duration-300 group-hover:scale-105 ${dark ? 'text-[#E8E3DC]' : 'text-[#0F0F0E]'}`}>
        {count}{suffix}
      </p>
      <p className={`text-[10px] font-sans uppercase tracking-[0.18em] mt-2 ${dark ? 'text-[#5A5A52]' : 'text-[#8A8A75]'}`}>
        {label}
      </p>
    </div>
  );
}

/* ─── CityStorySection (Interactive Kingdom Triangle Matrix) ───── */
function CityStorySection() {
  const [activeCity, setActiveCity] = useState(0);
  const timerRef = useRef(null);
  const sectionRef = useRef(null);

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
      satellite1: { label: 'Wafi Escrow Registry', val: 'Phase-4 Verified' },
      satellite2: { label: 'Institutional Tenancy', val: 'Diplomatic & C-Suite' },
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
      satellite1: { label: 'Coastal Regeneration', val: 'Corniche Marina Belt' },
      satellite2: { label: 'Yield Capitalization', val: '6.8% Net Unlevered' },
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
      satellite1: { label: 'Energy Tenancy Index', val: '94% Sustained Occ.' },
      satellite2: { label: 'Transit Connectivity', val: 'Causeway Corridor' },
      color: '#6B6B5A'
    }
  ];

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setActiveCity(prev => (prev + 1) % cities.length);
    }, 6500);
    return () => clearInterval(timerRef.current);
  }, [cities.length]);

  const handleCityClick = (i) => {
    setActiveCity(i);
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActiveCity(prev => (prev + 1) % cities.length);
    }, 6500);
  };

  const c = cities[activeCity];

  return (
    <section id="corridors-section" ref={sectionRef} className="bg-[#0C0C0A] py-28 overflow-hidden dark-section relative">
      
      {/* Background ambient radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#B8913A]/6 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section header */}
        <ScrollReveal animation="fade-up">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#D4A853] animate-ping" />
                <p className="section-label text-[#B8913A]">Geographic Specialization</p>
              </div>
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

        {/* ─── Interactive Kingdom Triangle Constellation Bar ─── */}
        <div className="mb-14 p-4 rounded-2xl bg-[#141412] border border-[rgba(255,255,255,0.08)] shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 relative z-10">
            {cities.map((city, i) => {
              const isSelected = activeCity === i;
              return (
                <button
                  key={city.city}
                  onClick={() => handleCityClick(i)}
                  className={`group relative flex items-center justify-between p-4 rounded-xl transition-all duration-300 text-left cursor-pointer ${
                    isSelected
                      ? 'bg-white/10 border border-[#B8913A] shadow-lg shadow-[#B8913A]/10 scale-102'
                      : 'bg-white/4 border border-[rgba(255,255,255,0.05)] hover:bg-white/8 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {/* Glowing Node Dot */}
                    <div className="relative">
                      <div className={`h-3 w-3 rounded-full transition-colors ${isSelected ? 'bg-[#D4A853]' : 'bg-white/30'}`} />
                      {isSelected && (
                        <div className="absolute inset-0 rounded-full bg-[#D4A853] animate-ping opacity-75" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`font-serif font-bold text-base transition-colors ${isSelected ? 'text-[#E8E3DC]' : 'text-white/70'}`}>
                          {city.city}
                        </span>
                        <span className="text-[10px] font-mono text-white/30">{city.coordinates.split(' ')[0]}</span>
                      </div>
                      <p className="text-[10px] font-mono text-[#8A8578] uppercase">{city.tagline.split(' ')[0]} · {city.statLabel}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className={`font-serif text-lg font-bold block ${isSelected ? 'text-[#D4A853]' : 'text-white/60'}`}>
                      {city.stat}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Animated Connecting Shimmer Line */}
          <div className="flex items-center gap-3 px-4 pt-3 mt-2 border-t border-[rgba(255,255,255,0.06)]">
            <div className="h-px flex-1 shimmer-line" />
            <span className="text-[9px] font-mono text-[#D4A853] uppercase tracking-[0.2em] font-semibold flex items-center gap-1.5">
              <Sparkles size={11} className="text-[#D4A853]" /> Interactive Regional Node Network
            </span>
            <div className="h-px flex-1 shimmer-line" />
          </div>
        </div>

        {/* ─── City Detail Grid with Floating Satellites ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center min-h-[480px]">
          
          {/* Left: Main City View with Floating Satellite Cards */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] lg:aspect-auto lg:h-[480px] border border-[rgba(255,255,255,0.10)] shadow-2xl group">
              <img
                key={c.city}
                src={c.image}
                alt={c.city}
                className="w-full h-full object-cover transition-all duration-1000 transform scale-102 group-hover:scale-108"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0A]/85 via-transparent to-transparent pointer-events-none" />

              {/* Coordinates chip */}
              <div className="absolute top-4 left-4 bg-[#0C0C0A]/85 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[rgba(255,255,255,0.12)]">
                <p className="text-[10px] font-mono text-[#D4A853] tracking-wider">{c.coordinates}</p>
              </div>

              {/* Stat chip */}
              <div className="absolute bottom-5 right-5 text-right bg-[#0C0C0A]/90 backdrop-blur-md px-5 py-3 rounded-xl border border-[rgba(255,255,255,0.12)] shadow-xl">
                <p className="text-[9px] font-mono uppercase text-[#8A8578] mb-0.5">{c.statLabel}</p>
                <p className="font-serif text-2xl font-bold text-[#D4A853]">{c.stat}</p>
              </div>
            </div>

            {/* Floating Satellite Card 1 (Top Right) */}
            <div className="absolute -top-6 -right-6 hidden sm:flex items-center gap-2.5 glass-card-dark p-3.5 rounded-xl float-slow-1 z-20 shadow-xl max-w-xs">
              <div className="h-2 w-2 rounded-full bg-[#D4A853] animate-ping shrink-0" />
              <div>
                <p className="text-[9px] font-mono text-white/50 uppercase tracking-wider">{c.satellite1.label}</p>
                <p className="text-xs font-semibold text-[#E8E3DC] font-sans">{c.satellite1.val}</p>
              </div>
            </div>

            {/* Floating Satellite Card 2 (Bottom Left) */}
            <div className="absolute -bottom-6 -left-6 hidden sm:flex items-center gap-2.5 glass-card-dark p-3.5 rounded-xl float-slow-2 z-20 shadow-xl max-w-xs">
              <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              <div>
                <p className="text-[9px] font-mono text-white/50 uppercase tracking-wider">{c.satellite2.label}</p>
                <p className="text-xs font-semibold text-[#E8E3DC] font-sans">{c.satellite2.val}</p>
              </div>
            </div>
          </div>

          {/* Right: Content & Sectors */}
          <div className="lg:col-span-6 space-y-8 animate-in fade-in duration-500" key={c.city + '-content'}>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h3 className="font-serif text-4xl sm:text-5xl font-bold text-[#E8E3DC]">{c.city}</h3>
                <span className="font-serif text-2xl text-[#B8913A]/60 font-light">{c.arabic}</span>
              </div>
              <p className="text-[11px] font-mono uppercase tracking-widest text-[#B8913A] mb-4">{c.tagline}</p>
              <p className="text-[#8A8578] text-sm sm:text-base leading-relaxed">{c.description}</p>
            </div>

            {/* Key sectors with animated pill tags */}
            <div>
              <p className="text-[10px] font-mono uppercase tracking-wider text-[#6B6B5A] mb-3">Active Prime Sectors</p>
              <div className="grid grid-cols-2 gap-2.5">
                {c.highlights.map((h, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-[#C8C3BA] p-3 rounded-lg bg-[#161614] border border-[rgba(255,255,255,0.06)] hover:border-[#B8913A]/40 transition-colors">
                    <span className="h-1.5 w-1.5 bg-[#B8913A] rounded-full shrink-0" />
                    <span className="truncate">{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Metrics row */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#141412] border border-[rgba(255,255,255,0.08)] rounded-xl p-5 hover:border-[#B8913A]/40 transition-colors">
                <p className="text-[9px] font-mono uppercase text-[#6B6B5A] mb-1">{c.statLabel}</p>
                <p className="font-serif text-2xl sm:text-3xl font-bold text-[#D4A853]">{c.stat}</p>
              </div>
              <div className="bg-[#141412] border border-[rgba(255,255,255,0.08)] rounded-xl p-5 hover:border-[#B8913A]/40 transition-colors">
                <p className="text-[9px] font-mono uppercase text-[#6B6B5A] mb-1">{c.metric2Label}</p>
                <p className="font-serif text-2xl sm:text-3xl font-bold text-[#E8E3DC]">{c.metric2}</p>
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

/* ─── InvestmentIntelligence Section (With Constellation Satellites) ── */
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
    <section id="intelligence-section" ref={insightsRef} className="bg-[#0C0C0A] py-28 dark-section relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <ScrollReveal animation="fade-up">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Activity size={14} className="text-[#B8913A]" />
                <p className="section-label text-[#B8913A]">Market Intelligence</p>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#E8E3DC] leading-tight">
                Investment Data,<br />Not Market Noise
              </h2>
              <p className="text-[#8A8578] text-sm leading-relaxed max-w-lg">
                Verified figures from municipal land registries and direct master developer channels provided to clients under fiduciary advisory mandate.
              </p>
            </div>
            <Link to="/services" className="inline-flex items-center gap-2 text-xs font-semibold text-[#B8913A] hover:text-[#D4A853] tracking-wider uppercase transition-colors">
              <span>Full Intelligence Service</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </ScrollReveal>

        {/* ─── Floating Constellation Matrix Above Intelligence ─── */}
        <div className="mb-12 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: 'Riyadh Alpha Corridor', stat: '+14.8%', sub: 'Corporate HQ Influx', floatClass: 'float-slow-1' },
            { label: 'Jeddah Waterfront Yield', stat: '6.8% Net', sub: 'Corniche Marina Asset', floatClass: 'float-slow-2' },
            { label: 'Al Khobar Tenancy', stat: '94% Occ.', sub: 'Executive Energy Lease', floatClass: 'float-slow-3' },
          ].map((item, idx) => (
            <div
              key={idx}
              className={`glass-card-dark p-4 rounded-xl flex items-center justify-between shadow-xl ${item.floatClass}`}
            >
              <div className="flex items-center gap-3">
                <div className="h-2.5 w-2.5 rounded-full bg-[#D4A853] animate-ping" />
                <div>
                  <p className="text-[10px] font-mono text-white/50 uppercase">{item.label}</p>
                  <p className="text-xs text-[#8A8578]">{item.sub}</p>
                </div>
              </div>
              <p className="font-serif text-lg font-bold text-[#D4A853]">{item.stat}</p>
            </div>
          ))}
        </div>

        {/* Animated Connecting Shimmer Line */}
        <div className="flex items-center gap-3 px-4 pb-12">
          <div className="h-px flex-1 shimmer-line" />
          <span className="text-[9px] font-mono text-[#D4A853] uppercase tracking-[0.2em] font-semibold">Verified Registry Telemetry</span>
          <div className="h-px flex-1 shimmer-line" />
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {metrics.map((m, i) => (
            <ScrollReveal key={i} animation="fade-up" delay={i * 100}>
              <div className="bg-[#141412] border border-[rgba(255,255,255,0.08)] rounded-xl p-6 hover:border-[#B8913A]/50 transition-all duration-300 hover:-translate-y-1 shadow-sm">
                <p className="text-[10px] font-mono uppercase tracking-wider text-[#6B6B5A] mb-4 leading-snug">{m.label}</p>
                <div className="flex items-baseline gap-1">
                  <span className="font-serif text-4xl font-bold text-[#E8E3DC] count-num">
                    {visible ? (m.displayVal || m.value) : '0'}
                  </span>
                  <span className="text-xl font-sans text-[#B8913A]">{m.suffix}</span>
                </div>
                <p className="text-[11px] text-[#8A8578] mt-2">{m.sub}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Trust band */}
        <ScrollReveal animation="fade-up">
          <div className="border border-[rgba(255,255,255,0.08)] rounded-2xl p-8 sm:p-10 bg-[#141412] shadow-xl">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
              {[
                { icon: ShieldCheck, label: 'REGA Channel Certified', sub: 'Regulated real estate authority' },
                { icon: Building2, label: 'Tier-1 Master Developers', sub: 'Direct allocation access' },
                { icon: TrendingUp, label: 'Verified Title Conveyance', sub: 'Ministry of Justice registered' },
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center gap-3 group">
                  <div className="h-11 w-11 rounded-full bg-[#B8913A]/10 border border-[#B8913A]/25 flex items-center justify-center text-[#B8913A] group-hover:scale-110 group-hover:border-[#B8913A] transition-all">
                    <item.icon size={19} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#E8E3DC] mb-0.5">{item.label}</p>
                    <p className="text-[11px] text-[#8A8578]">{item.sub}</p>
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

/* ─── Main HomePage Component ─────────────────────────────────────── */
export default function HomePage({ onOpenInquiry }) {
  const [featuredProperties, setFeaturedProperties] = useState([]);
  const [marketStats, setMarketStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [heroLoaded, setHeroLoaded] = useState(false);

  const heroSectionRef = useRef(null);
  const heroBgRef = useRef(null);
  const heroCardsRef = useRef(null);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  // Load properties & stats
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
    const t = setTimeout(() => setHeroLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);

  // GSAP Parallax ScrollTrigger for Hero Section
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !heroSectionRef.current) return;

    const ctx = gsap.context(() => {
      // Parallax scroll on hero background
      if (heroBgRef.current) {
        gsap.to(heroBgRef.current, {
          yPercent: 30,
          scale: 1.0,
          ease: 'none',
          scrollTrigger: {
            trigger: heroSectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          }
        });
      }

      // Parallax upward drift on the floating cards container
      if (heroCardsRef.current) {
        gsap.to(heroCardsRef.current, {
          y: -140,
          ease: 'none',
          scrollTrigger: {
            trigger: heroSectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          }
        });
      }
    }, heroSectionRef);

    return () => ctx.revert();
  }, [heroLoaded]);

  // Subtle interactive mouse parallax on hero
  const handleHeroMouseMove = (e) => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX - innerWidth / 2) / (innerWidth / 2);
    const y = (clientY - innerHeight / 2) / (innerHeight / 2);
    setMouseOffset({ x, y });
  };

  const advisorySteps = [
    { num: '01', title: 'Mandate & Capital Brief', desc: 'We define your precise criteria: yield targets, risk profile, holding period, and asset class preferences across commercial and residential inventory.', tag: 'Phase 01' },
    { num: '02', title: 'Direct Channel Origination', desc: 'We access off-market and pre-launch units directly through our formal Tier-1 developer channel partnerships, eliminating intermediaries and markups.', tag: 'Phase 02' },
    { num: '03', title: 'Technical & Yield Diligence', desc: 'Independent assessment of building specs, construction quality, title registration, and realistic rental comps based on municipal market data.', tag: 'Phase 03' },
    { num: '04', title: 'Conveyance to Handover', desc: 'Full fiduciary oversight through developer contract execution, escrow payment milestones, REGA compliance, and key handover.', tag: 'Phase 04' },
  ];

  return (
    <div>

      {/* ═══════════════════════════════════════════
          1. HERO — Interactive Parallax & Floating Cards (Growth Triangle)
         ═══════════════════════════════════════════ */}
      <section
        id="hero-section"
        ref={heroSectionRef}
        onMouseMove={handleHeroMouseMove}
        className="relative min-h-screen flex flex-col justify-between overflow-hidden"
      >

        {/* Parallax Background Image */}
        <div
          ref={heroBgRef}
          className="absolute inset-0 z-0 origin-center pointer-events-none"
          style={{
            transform: `translate3d(${mouseOffset.x * -12}px, ${mouseOffset.y * -12}px, 0) scale(1.08)`,
            transition: 'transform 0.25s ease-out'
          }}
        >
          <img
            src="/assets/hero.jpg"
            alt="Riyadh skyline at dusk showcasing contemporary architectural landmarks"
            className="w-full h-full object-cover object-center"
          />
          {/* Dual luxury scrim */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F0F0E]/85 via-[#0F0F0E]/60 to-[#0F0F0E]/25" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0E]/85 via-transparent to-[#0F0F0E]/40" />
        </div>

        {/* Main Content Area */}
        <div className="relative z-10 flex-1 flex items-center pt-32 pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

              {/* Left Column: Headlines & Actions */}
              <div className="lg:col-span-7 space-y-7">

                {/* Identity Kicker */}
                <div
                  style={{
                    opacity: heroLoaded ? 1 : 0,
                    transform: heroLoaded ? 'translateY(0)' : 'translateY(-18px)',
                    transition: 'opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s'
                  }}
                >
                  <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs text-white/90 shadow-lg">
                    <span className="h-2 w-2 rounded-full bg-[#D4A853] animate-ping" />
                    <span className="font-mono tracking-wider text-[11px] uppercase text-[#D4A853] font-semibold">Kingdom of Saudi Arabia</span>
                    <span className="text-white/40">·</span>
                    <span className="text-white/80 font-mono text-[10.5px]">Riyadh · Jeddah · Al Khobar</span>
                  </div>
                </div>

                {/* Headline with Stagger Reveal */}
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

                {/* Subtitle */}
                <div
                  style={{
                    opacity: heroLoaded ? 1 : 0,
                    transform: heroLoaded ? 'translateY(0)' : 'translateY(20px)',
                    transition: 'opacity 0.8s ease 0.4s, transform 0.8s ease 0.4s'
                  }}
                >
                  <p className="text-base sm:text-lg text-white/80 font-normal leading-relaxed max-w-xl">
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
                      className="inline-flex items-center justify-center gap-2 bg-[#B8913A] hover:bg-[#D4A853] text-[#FAF7F2] font-semibold px-7 py-4 rounded text-xs tracking-wider uppercase transition-all shadow-xl hover:shadow-[#B8913A]/40 cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
                    >
                      <span>Explore Curated Portfolio</span>
                      <ArrowRight size={15} />
                    </Link>

                    <button
                      onClick={() => onOpenInquiry ? onOpenInquiry() : window.location.href = '/contact'}
                      className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/25 hover:border-white/40 text-white font-medium px-7 py-4 rounded text-xs tracking-wider uppercase transition-all cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
                    >
                      <span>Consult an Advisor</span>
                      <ArrowUpRight size={15} className="text-[#D4A853]" />
                    </button>
                  </div>
                </div>

                {/* Trust Badges */}
                <div
                  style={{
                    opacity: heroLoaded ? 1 : 0,
                    transition: 'opacity 0.8s ease 0.7s'
                  }}
                >
                  <div className="pt-6 border-t border-white/15 grid grid-cols-3 gap-4 text-xs font-mono text-white/60">
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

              {/* Right Column: Dynamic Floating City Cards (Growth Triangle) */}
              <div
                ref={heroCardsRef}
                className="lg:col-span-5 hidden lg:flex flex-col gap-4 relative"
                style={{
                  transform: `translate3d(${mouseOffset.x * 24}px, ${mouseOffset.y * 24}px, 0)`,
                  transition: 'transform 0.3s ease-out'
                }}
              >
                {[
                  {
                    city: 'Riyadh',
                    stat: '+11.2%',
                    statLabel: 'Capital Growth',
                    image: '/assets/hero.jpg',
                    coords: '24°42′N',
                    floatClass: 'float-slow-1'
                  },
                  {
                    city: 'Jeddah',
                    stat: '6.8% Net',
                    statLabel: 'Waterfront Yield',
                    image: '/assets/prop-jeddah.jpg',
                    coords: '21°32′N',
                    floatClass: 'float-slow-2'
                  },
                  {
                    city: 'Al Khobar',
                    stat: '94%',
                    statLabel: 'Occupancy',
                    image: '/assets/prop-khobar.jpg',
                    coords: '26°17′N',
                    floatClass: 'float-slow-3'
                  },
                ].map((item, i) => (
                  <Link
                    key={item.city}
                    to={`/properties?city=${item.city}`}
                    className={`group flex items-center gap-4 bg-white/12 hover:bg-white/20 backdrop-blur-md border border-white/20 hover:border-[#B8913A] rounded-xl p-4 transition-all duration-300 shadow-xl ${item.floatClass}`}
                    style={{
                      opacity: heroLoaded ? 1 : 0,
                      transform: heroLoaded ? 'translateX(0)' : 'translateX(50px)',
                      transition: `opacity 0.7s ease ${0.35 + i * 0.15}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${0.35 + i * 0.15}s`
                    }}
                  >
                    <div className="h-14 w-14 rounded-lg overflow-hidden shrink-0 border border-white/20">
                      <img
                        src={item.image}
                        alt={item.city}
                        className="w-full h-full object-cover group-hover:scale-115 transition-transform duration-700"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-white font-semibold text-sm font-sans">{item.city}</span>
                        <span className="text-white/40 font-mono text-[10px]">{item.coords}</span>
                      </div>
                      <p className="text-[10px] font-mono text-white/50 uppercase tracking-wider">{item.statLabel}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="font-serif text-lg font-bold text-[#D4A853]">{item.stat}</p>
                      <ArrowUpRight size={14} className="text-white/40 group-hover:text-[#D4A853] transition-colors ml-auto mt-1" />
                    </div>
                  </Link>
                ))}

                {/* Animated Brass Connection Line with traveling shimmer */}
                <div className="flex items-center gap-3 px-4 pt-2">
                  <div className="h-px flex-1 shimmer-line" />
                  <span className="text-[10px] font-mono text-[#D4A853] uppercase tracking-widest font-semibold">KSA Growth Triangle</span>
                  <div className="h-px flex-1 shimmer-line" />
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Bottom Continuous Scrolling Ticker */}
        <div className="relative z-10 border-t border-white/10 bg-[#0F0F0E]/75 backdrop-blur-md overflow-hidden py-3.5">
          <div className="hero-ticker-track">
            {['RIYADH', 'JEDDAH', 'AL KHOBAR', 'CURATED CAPITAL', 'FIDUCIARY ADVISORY', 'VERIFIED TITLES', 'DIRECT DEVELOPER CHANNEL',
              'RIYADH', 'JEDDAH', 'AL KHOBAR', 'CURATED CAPITAL', 'FIDUCIARY ADVISORY', 'VERIFIED TITLES', 'DIRECT DEVELOPER CHANNEL'
            ].map((text, i) => (
              <React.Fragment key={i}>
                <span className="text-[11px] font-mono tracking-[0.24em] uppercase text-white/40 px-6 whitespace-nowrap hover:text-white transition-colors">{text}</span>
                <span className="text-[#D4A853]/60 px-2 font-bold" aria-hidden="true">·</span>
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* Moving text band 1 */}
      <MovingTextBand
        items={['FIDUCIARY ADVISORY', 'DIRECT DEVELOPER CHANNEL', 'VERIFIED TITLES', 'CURATED CAPITAL', 'RIYADH · JEDDAH · AL KHOBAR']}
        speed="slow"
      />

      {/* ═══════════════════════════════════════════
          2. FEATURED PROPERTIES — Editorial Grid with Floating Diligence Constellation
         ═══════════════════════════════════════════ */}
      <section id="curated-section" className="bg-[#FAF7F2] py-28 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <ScrollReveal animation="fade-up">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div className="space-y-3 max-w-xl">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#B8913A] animate-ping" />
                  <p className="section-label">Curated Opportunities</p>
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F0F0E] leading-tight">
                  Selected Prime Units
                </h2>
                <p className="text-[#6B6B5A] text-sm sm:text-base leading-relaxed">
                  A selection of vetted residential villas, high-floor penthouses, and commercial headquarters floors under advisory representation.
                </p>
              </div>
              <Link
                to="/properties"
                className="inline-flex items-center gap-2 bg-[#F0EBE1] hover:bg-[#E8E1D5] text-[#3A3A35] text-xs font-semibold px-6 py-3 rounded border border-[rgba(15,15,14,0.10)] transition-all hover:-translate-y-0.5 whitespace-nowrap shadow-sm"
              >
                <span>View All Properties</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </ScrollReveal>

          {/* ─── Floating Growth-Triangle Style Constellation Bar ─── */}
          <div className="mb-14 p-5 rounded-2xl bg-[#F0EBE1] border border-[rgba(15,15,14,0.08)] shadow-sm relative overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10">
              {[
                { title: 'Verified Ministry Titles', stat: '100% Escrow', sub: 'Wafi Regulated Channel', floatClass: 'float-slow-1' },
                { title: 'Tier-1 Master Builders', stat: '0 Broker Surcharge', sub: 'Direct Allocation Terms', floatClass: 'float-slow-2' },
                { title: 'Unlevered Yield Spread', stat: '6.8% – 11.2%', sub: 'Stress-Tested Comps', floatClass: 'float-slow-3' },
              ].map((matrix, idx) => (
                <div
                  key={idx}
                  className={`glass-card-light p-4 rounded-xl flex items-center justify-between shadow-sm ${matrix.floatClass}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="h-2.5 w-2.5 rounded-full bg-[#B8913A] animate-ping" />
                    <div>
                      <p className="text-xs font-bold text-[#0F0F0E]">{matrix.title}</p>
                      <p className="text-[10px] text-[#6B6B5A] font-mono">{matrix.sub}</p>
                    </div>
                  </div>
                  <span className="font-serif text-sm font-bold text-[#B8913A] px-2 py-1 bg-[#FAF7F2] rounded border border-[rgba(184,145,58,0.2)]">
                    {matrix.stat}
                  </span>
                </div>
              ))}
            </div>

            {/* Traveling Shimmer Connector */}
            <div className="flex items-center gap-3 px-4 pt-3 mt-3 border-t border-[rgba(15,15,14,0.06)]">
              <div className="h-px flex-1 shimmer-line" />
              <span className="text-[9px] font-mono text-[#B8913A] uppercase tracking-[0.2em] font-semibold">Institutional Portfolio Assurance Matrix</span>
              <div className="h-px flex-1 shimmer-line" />
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-96 rounded-xl bg-[#F0EBE1] animate-pulse border border-[rgba(15,15,14,0.06)]" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProperties.map((property, idx) => (
                <ScrollReveal key={property.id} animation="fade-up" delay={idx * 130}>
                  <PropertyCard
                    property={property}
                    onInquire={(p) => onOpenInquiry ? onOpenInquiry(p) : null}
                  />
                </ScrollReveal>
              ))}
            </div>
          )}

          {/* Transparency Disclaimer */}
          <ScrollReveal animation="fade-up" delay={200}>
            <div className="mt-12 p-5 rounded-xl bg-[#F0EBE1] border border-[rgba(15,15,14,0.08)] text-[#6B6B5A] text-xs flex flex-col sm:flex-row items-center justify-between gap-3 shadow-sm">
              <p>
                <strong className="text-[#0F0F0E]">Catalogue Transparency:</strong> Listings represent realistic sample properties for advisory demonstration and client briefing purposes.
              </p>
              <Link to="/properties" className="text-[#B8913A] hover:underline font-mono text-[11px] font-semibold whitespace-nowrap">
                Filtered Search →
              </Link>
            </div>
          </ScrollReveal>

        </div>
      </section>

      {/* ═══════════════════════════════════════════
          3. CITY STORY SECTION (Interactive Kingdom Triangle Matrix)
         ═══════════════════════════════════════════ */}
      <CityStorySection />

      {/* ═══════════════════════════════════════════
          4. ADVISORY MODEL — Circuit Flow Pipeline
         ═══════════════════════════════════════════ */}
      <section id="advisory-section" className="bg-[#F0EBE1] py-28 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

            {/* Left: explanation */}
            <div className="lg:col-span-5 space-y-6">
              <ScrollReveal animation="fade-right">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[#B8913A] animate-ping" />
                    <p className="section-label">Our Structural Advantage</p>
                  </div>
                  <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F0F0E] leading-tight">
                    Why Institutional Capital Chooses the Channel Partner Model
                  </h2>
                </div>
                <p className="text-[#6B6B5A] text-sm leading-relaxed mt-4">
                  Traditional real estate brokers rely on transactional churn and public listings. MIRĀS operates on a fiduciary advisory arc: we act as an originate-and-filter counterweight between master developers and qualified buyers.
                </p>

                {/* Floating Satellite Assurance Pill */}
                <div className="glass-card-light p-4 rounded-xl flex items-center gap-3 float-slow-1 shadow-sm">
                  <div className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                  <div>
                    <p className="text-[10px] font-mono uppercase tracking-wider text-[#B8913A] font-semibold">Strict Advisory Filtering</p>
                    <p className="text-xs text-[#0F0F0E] font-medium">Over 70% of potential market inventory is rejected prior to mandate presentation.</p>
                  </div>
                </div>

                <div className="space-y-4 text-xs text-[#5A5A52] pt-2">
                  {[
                    { title: 'Direct Developer Conveyance:', desc: 'Contracts executed directly with the master developer under regulated escrow accounts with zero intermediate brokerage surcharge.' },
                    { title: 'Rigorous Technical Filtering:', desc: 'We reject approximately 70% of potential inventory based on construction milestone track record, build quality, and realistic yield modeling.' },
                    { title: 'Complete Handover Advocacy:', desc: 'Our involvement continues beyond signature to snagging inspections, title deed registration with the Ministry of Justice, and tenant placement advisory.' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-[#FAF7F2] border border-[rgba(15,15,14,0.06)] hover:border-[#B8913A]/30 transition-colors">
                      <div className="p-1 rounded bg-[#B8913A]/15 text-[#B8913A] mt-0.5 shrink-0">
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

            {/* Right: advisory steps with connected circuit line */}
            <div className="lg:col-span-7">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative">
                {advisorySteps.map((step, idx) => (
                  <ScrollReveal key={step.num} animation="fade-up" delay={idx * 110}>
                    <div className="bg-[#FAF7F2] border border-[rgba(15,15,14,0.08)] rounded-xl p-7 group hover:border-[#B8913A]/45 transition-all duration-300 hover:-translate-y-1.5 h-full shadow-sm hover:shadow-md relative overflow-hidden">
                      {/* Step Tag */}
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-serif text-4xl font-bold text-[#E8E1D5] group-hover:text-[#D4A853] transition-colors">
                          {step.num}
                        </span>
                        <span className="text-[10px] font-mono uppercase tracking-wider text-[#B8913A] px-2 py-0.5 rounded bg-[#F0EBE1] border border-[rgba(184,145,58,0.2)]">
                          {step.tag}
                        </span>
                      </div>
                      <h3 className="font-serif text-base font-semibold text-[#0F0F0E] mb-2">{step.title}</h3>
                      <p className="text-xs text-[#6B6B5A] leading-relaxed">{step.desc}</p>

                      {/* Subtle golden bottom accent */}
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#B8913A]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </ScrollReveal>
                ))}
              </div>

              {/* Connecting circuit line at bottom */}
              <div className="flex items-center gap-3 px-4 pt-4 mt-3">
                <div className="h-px flex-1 shimmer-line" />
                <span className="text-[9px] font-mono text-[#B8913A] uppercase tracking-widest font-semibold">Regulated Acquisition Sequence</span>
                <div className="h-px flex-1 shimmer-line" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Moving text band 2 (Reversed) */}
      <MovingTextBand
        items={['MANDATE REVIEW', 'ORIGINATION', 'DILIGENCE', 'CONVEYANCE', 'HANDOVER ADVOCACY']}
        reverse={true}
        speed="slow"
      />

      {/* ═══════════════════════════════════════════
          5. INVESTMENT INTELLIGENCE (Dark Section)
         ═══════════════════════════════════════════ */}
      <InvestmentIntelligence marketStats={marketStats} />

      {/* ═══════════════════════════════════════════
          6. INVESTOR PATHWAYS — Ivory Section with Corridor Connectors
         ═══════════════════════════════════════════ */}
      <section id="pathways-section" className="bg-[#FAF7F2] py-28 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <ScrollReveal animation="fade-up">
            <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
              <div className="flex items-center justify-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#B8913A] animate-ping" />
                <p className="section-label">Tailored Engagement Paths</p>
              </div>
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
                variant: 'outline',
                floatClass: 'float-slow-1'
              },
              {
                icon: Landmark,
                title: 'Family Offices & Allocators',
                sub: 'Commercial Floorplates · Yield Blocks',
                desc: 'Structured acquisitions of Grade-A office floors along King Fahd Road, high-street retail parades, and multi-unit residential portfolios. Detailed financial pro formas, tenancy covenants, and yield stress testing provided.',
                cta: 'Request Commercial Portfolio',
                type: 'Family Office Commercial Allocation',
                variant: 'brass',
                floatClass: 'float-slow-2'
              },
              {
                icon: Building2,
                title: 'Master Developers',
                sub: 'Channel Representation · Off-Plan',
                desc: 'For premier real estate developers with licensed off-plan or completed developments. We provide qualified institutional origination, international investor roadshows, and structured sales channel representation.',
                cta: 'Developer Partnership Terms',
                href: '/partnerships',
                variant: 'outline',
                floatClass: 'float-slow-3'
              }
            ].map((pathway, idx) => (
              <ScrollReveal key={idx} animation="fade-up" delay={idx * 120}>
                <div className={`editorial-card rounded-xl p-8 flex flex-col justify-between space-y-6 h-full transition-all duration-300 hover:-translate-y-2 ${
                  pathway.variant === 'brass' ? 'border-[#B8913A]/50 shadow-xl' : ''
                }`}>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className={`h-12 w-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105 ${
                        pathway.variant === 'brass'
                          ? 'bg-[#B8913A] text-[#FAF7F2] shadow-md'
                          : 'bg-[#F0EBE1] border border-[rgba(184,145,58,0.25)] text-[#B8913A]'
                      }`}>
                        <pathway.icon size={22} />
                      </div>
                      <span className="h-2 w-2 rounded-full bg-[#B8913A] animate-pulse" />
                    </div>
                    <div>
                      <h3 className="font-serif text-xl font-bold text-[#0F0F0E]">{pathway.title}</h3>
                      <p className="text-[11px] font-mono text-[#B8913A] font-semibold mt-0.5">{pathway.sub}</p>
                    </div>
                    <p className="text-xs text-[#6B6B5A] leading-relaxed">{pathway.desc}</p>
                  </div>

                  {pathway.href ? (
                    <Link
                      to={pathway.href}
                      className="w-full py-3.5 px-4 rounded bg-[#F0EBE1] hover:bg-[#E8E1D5] text-[#3A3A35] text-xs font-semibold uppercase tracking-wider border border-[rgba(15,15,14,0.10)] transition-colors flex items-center justify-center gap-1.5"
                    >
                      <span>{pathway.cta}</span>
                      <ArrowRight size={13} />
                    </Link>
                  ) : (
                    <button
                      onClick={() => onOpenInquiry ? onOpenInquiry({ type: pathway.type }) : null}
                      className={`w-full py-3.5 px-4 rounded text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm ${
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

          {/* Animated Connecting Shimmer Line */}
          <div className="flex items-center gap-3 px-4 pt-10">
            <div className="h-px flex-1 shimmer-line" />
            <span className="text-[9px] font-mono text-[#B8913A] uppercase tracking-widest font-semibold">Structured Capital Gateway</span>
            <div className="h-px flex-1 shimmer-line" />
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════
          7. STATS ROW — Parchment Section
         ═══════════════════════════════════════════ */}
      <section className="bg-[#E8E1D5] py-20 border-y border-[rgba(15,15,14,0.08)]">
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
          8. PROMINENT CTA (Dark Section with Floating Concierge Status)
         ═══════════════════════════════════════════ */}
      <section className="bg-[#0C0C0A] py-28 dark-section relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal animation="scale-up" duration={700}>
            <div className="border border-[rgba(255,255,255,0.08)] rounded-2xl p-10 sm:p-14 lg:p-20 relative overflow-hidden bg-[#141412] shadow-2xl">

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
                
                {/* Left: Main Copy & CTA Buttons */}
                <div className="lg:col-span-8 space-y-7">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#B8913A]/15 border border-[#B8913A]/30 text-[10.5px] font-mono text-[#D4A853] uppercase font-semibold">
                    <span className="h-2 w-2 rounded-full bg-[#D4A853] animate-ping" />
                    <span>Direct Concierge Desk</span>
                  </div>

                  <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#E8E3DC] leading-tight">
                    Begin your acquisition conversation with confidence.
                  </h2>

                  <p className="text-[#8A8578] text-sm sm:text-base leading-relaxed max-w-xl">
                    Whether you are evaluating a specific Riyadh commercial floorplate, a Red Sea oceanfront residence, or a broad capital allocation strategy, our advisory team is prepared to review your mandate.
                  </p>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                    <button
                      onClick={() => onOpenInquiry ? onOpenInquiry() : window.location.href = '/contact'}
                      className="inline-flex items-center justify-center gap-2 bg-[#B8913A] hover:bg-[#D4A853] text-[#FAF7F2] font-semibold px-7 py-4 rounded text-xs tracking-wider uppercase transition-all cursor-pointer shadow-xl hover:shadow-[#B8913A]/30 hover:-translate-y-0.5"
                    >
                      <span>Submit Private Brief</span>
                      <ArrowUpRight size={15} />
                    </button>

                    <a
                      href="https://wa.me/966501234567"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center gap-2 bg-transparent hover:bg-white/5 text-[#E8E3DC] border border-[rgba(255,255,255,0.14)] hover:border-[rgba(255,255,255,0.28)] px-7 py-4 rounded text-xs tracking-wider uppercase transition-all"
                    >
                      <span>WhatsApp Private Concierge</span>
                    </a>
                  </div>

                  <p className="text-[#5A5A52] text-xs font-mono">
                    Confidentiality assured under non-disclosure governance. No marketing unsolicited calls.
                  </p>
                </div>

                {/* Right: Floating VIP Concierge Telemetry Card (Growth Triangle Style) */}
                <div className="lg:col-span-4 hidden lg:flex flex-col gap-3">
                  <div className="glass-card-dark p-5 rounded-2xl float-slow-1 border border-[rgba(255,255,255,0.15)] shadow-2xl space-y-4">
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <div className="flex items-center gap-2">
                        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-ping" />
                        <span className="font-mono text-xs font-semibold text-white uppercase">Advisory Desk Online</span>
                      </div>
                      <span className="text-[10px] font-mono text-[#D4A853] uppercase">Riyadh HQ</span>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between text-white/70">
                        <span>Mandate Partner:</span>
                        <span className="text-white font-medium font-mono">Senior Principal</span>
                      </div>
                      <div className="flex justify-between text-white/70">
                        <span>Average Response:</span>
                        <span className="text-[#D4A853] font-mono font-bold">&lt; 15 mins</span>
                      </div>
                      <div className="flex justify-between text-white/70">
                        <span>Conveyance Protocol:</span>
                        <span className="text-white font-mono">REGA Licensed</span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-white/10">
                      <div className="h-px w-full shimmer-line mb-2" />
                      <p className="text-[10px] text-white/50 text-center font-mono">Direct Developer Channel Clearance</p>
                    </div>
                  </div>
                </div>

              </div>

              {/* Watermark Logo */}
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
