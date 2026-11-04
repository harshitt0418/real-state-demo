import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  fetchPropertyById, 
  fetchProperties 
} from '../services/api';
import MortgageCalculator from '../components/MortgageCalculator';
import PropertyCard from '../components/PropertyCard';
import ScrollReveal from '../components/ScrollReveal';
import { 
  MapPin, 
  ArrowLeft, 
  ArrowUpRight, 
  Check, 
  Share2, 
  TrendingUp,
  ShieldCheck,
  Phone
} from 'lucide-react';

export default function PropertyDetailPage({ onOpenInquiry }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [property, setProperty] = useState(null);
  const [activeImage, setActiveImage] = useState('');
  const [similarProperties, setSimilarProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let isCurrent = true;
    async function loadData() {
      setLoading(true);
      try {
        const res = await fetchPropertyById(id);
        if (isCurrent && res.success && res.data) {
          setProperty(res.data);
          setActiveImage(res.data.image);

          // Fetch similar units in same city or type
          const simRes = await fetchProperties({ city: res.data.city });
          if (simRes.data) {
            setSimilarProperties(simRes.data.filter(p => p.id !== res.data.id).slice(0, 2));
          }
          setLoading(false);
        } else if (isCurrent) {
          setLoading(false);
        }
      } catch (err) {
        if (isCurrent) setLoading(false);
      }
    }
    loadData();
    window.scrollTo(0, 0);
    return () => { isCurrent = false; };
  }, [id]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-96 bg-[#F0EBE1] rounded-2xl animate-pulse" />
      </div>
    );
  }

  if (!property) {
    return (
      <div className="pt-36 pb-24 max-w-3xl mx-auto px-4 text-center space-y-4">
        <h2 className="font-serif text-2xl font-bold text-[#0F0F0E]">Property Not Found</h2>
        <p className="text-[#6B6B5A] text-xs">The requested property unit could not be located in our active advisory catalogue.</p>
        <Link to="/properties" className="inline-block px-5 py-2.5 bg-[#B8913A] text-[#FAF7F2] font-semibold text-xs rounded uppercase tracking-wider">
          Back to Portfolio
        </Link>
      </div>
    );
  }

  const {
    title,
    subtitle,
    city,
    district,
    type,
    price,
    priceLabel,
    pricePerSqm,
    beds,
    baths,
    area,
    parkingSpaces,
    status,
    gallery = [],
    blurb,
    overview,
    architecturalHighlights = [],
    financialMetrics = {},
    location = {},
    handoverStatus,
    zoning
  } = property;

  const allImages = gallery.length > 0 ? gallery : [property.image];

  return (
    <div className="pt-28 pb-24 space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Top Breadcrumb & Share */}
      <div className="flex items-center justify-between text-xs text-[#6B6B5A] border-b border-[rgba(15,15,14,0.08)] pb-3">
        <Link to="/properties" className="inline-flex items-center gap-1.5 hover:text-[#B8913A] transition-colors">
          <ArrowLeft size={13} />
          <span>Back to Portfolio</span>
        </Link>

        <div className="flex items-center gap-3">
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 text-[#6B6B5A] hover:text-[#0F0F0E] transition-colors cursor-pointer"
          >
            <Share2 size={13} />
            <span>{copied ? 'Link Copied!' : 'Share Unit'}</span>
          </button>
        </div>
      </div>

      {/* Hero Header */}
      <ScrollReveal animation="fade-down" duration={600}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Title & Specs Header */}
          <div className="lg:col-span-8 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded bg-[#F0EBE1] border border-[rgba(184,145,58,0.3)] text-[#B8913A] font-mono text-[10.5px] uppercase font-semibold">
                {type} · {city}
              </span>
              <span className="px-2 py-0.5 rounded bg-[#F0EBE1] text-[#6B6B5A] font-mono text-[10px]">
                District Code: {location.districtCode || 'SA-RUH-01'}
              </span>
              <span className="px-2 py-0.5 rounded bg-emerald-100 border border-emerald-300 text-emerald-800 font-mono text-[10px] font-medium">
                {status || 'Available'}
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F0F0E] tracking-tight leading-tight">
              {title}
            </h1>

            <p className="text-[#5A5A52] text-sm sm:text-base font-normal">
              {subtitle || blurb}
            </p>

            <div className="flex items-center gap-2 text-[#6B6B5A] text-xs font-mono pt-1">
              <MapPin size={13} className="text-[#B8913A]" />
              <span>{location.address || `${district}, ${city}, Kingdom of Saudi Arabia`}</span>
            </div>
          </div>

          {/* Pricing & Acquisition Box */}
          <div className="lg:col-span-4 bg-[#FAF7F2] border border-[rgba(15,15,14,0.12)] rounded-xl p-6 space-y-4 shadow-sm">
            <div>
              <p className="text-[10px] uppercase font-mono tracking-wider text-[#6B6B5A]">Direct Acquisition Price</p>
              <p className="text-3xl font-serif font-bold text-[#B8913A]">
                {priceLabel || `SAR ${price?.toLocaleString()}`}
              </p>
              {pricePerSqm && (
                <p className="text-xs font-mono text-[#6B6B5A] mt-1">
                  SAR {pricePerSqm?.toLocaleString()} / m² Gross
                </p>
              )}
            </div>

            <div className="pt-2 border-t border-[rgba(15,15,14,0.08)] space-y-2">
              <button
                onClick={() => onOpenInquiry ? onOpenInquiry(property) : null}
                className="w-full py-3.5 px-4 rounded bg-[#B8913A] hover:bg-[#D4A853] text-[#FAF7F2] font-semibold text-xs tracking-wider uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <span>Inquire on This Unit</span>
                <ArrowUpRight size={14} />
              </button>

              <a
                href={`https://wa.me/966501234567?text=${encodeURIComponent(`Hello MIRĀS Advisory, I am inquiring regarding ${title} (${city}).`)}`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 px-4 rounded bg-[#F0EBE1] hover:bg-[#E8E1D5] text-[#3A3A35] text-xs font-medium border border-[rgba(15,15,14,0.10)] transition-colors flex items-center justify-center gap-2"
              >
                <Phone size={13} className="text-emerald-600" />
                <span>WhatsApp Direct Concierge</span>
              </a>
            </div>

            <p className="text-[10px] text-[#8A8A75] text-center font-mono pt-1">
              Zero Broker Markup · Direct Master Developer Escrow
            </p>
          </div>

        </div>
      </ScrollReveal>

      {/* Main Gallery */}
      <ScrollReveal animation="fade-up" duration={700}>
        <div className="space-y-4">
          <div className="editorial-img-container aspect-[16/9] w-full rounded-2xl border border-[rgba(15,15,14,0.10)] overflow-hidden relative shadow-md">
            <img
              src={activeImage}
              alt={title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 bg-[#FAF7F2]/90 backdrop-blur-md px-3 py-1 rounded text-xs font-mono text-[#B8913A] border border-[rgba(15,15,14,0.10)] font-semibold">
              Architectural Photography · Verified
            </div>
          </div>

          {/* Thumbnail Strip */}
          {allImages.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {allImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`relative rounded-lg overflow-hidden h-20 w-32 shrink-0 border-2 transition-all cursor-pointer ${
                    activeImage === img ? 'border-[#B8913A] scale-102' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`Gallery view ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      </ScrollReveal>

      {/* Key Facts Bar */}
      <ScrollReveal animation="fade-up" delay={100}>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 p-6 bg-[#F0EBE1] border border-[rgba(15,15,14,0.08)] rounded-xl text-center">
          <div>
            <span className="text-[10px] font-mono text-[#6B6B5A] uppercase block mb-1">Gross Area</span>
            <p className="font-serif text-lg font-bold text-[#0F0F0E]">{area} m²</p>
          </div>
          <div>
            <span className="text-[10px] font-mono text-[#6B6B5A] uppercase block mb-1">Bedrooms</span>
            <p className="font-serif text-lg font-bold text-[#0F0F0E]">{beds !== null ? beds : 'Full Floor'}</p>
          </div>
          <div>
            <span className="text-[10px] font-mono text-[#6B6B5A] uppercase block mb-1">Bathrooms</span>
            <p className="font-serif text-lg font-bold text-[#0F0F0E]">{baths}</p>
          </div>
          <div>
            <span className="text-[10px] font-mono text-[#6B6B5A] uppercase block mb-1">Parking</span>
            <p className="font-serif text-lg font-bold text-[#0F0F0E]">{parkingSpaces || 1} Bays</p>
          </div>
          <div>
            <span className="text-[10px] font-mono text-[#6B6B5A] uppercase block mb-1">Handover</span>
            <p className="font-serif text-lg font-bold text-[#B8913A]">{handoverStatus || 'Immediate'}</p>
          </div>
          <div>
            <span className="text-[10px] font-mono text-[#6B6B5A] uppercase block mb-1">Zoning</span>
            <p className="font-serif text-sm font-semibold text-[#0F0F0E] truncate">{zoning || 'Residential'}</p>
          </div>
        </div>
      </ScrollReveal>

      {/* Editorial Narrative & Specs Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: Architectural Overview */}
        <div className="lg:col-span-8 space-y-8">
          
          <ScrollReveal animation="fade-up">
            <div className="space-y-4">
              <h2 className="font-serif text-2xl font-bold text-[#0F0F0E]">Architectural & Urban Context</h2>
              <div className="prose max-w-none text-[#5A5A52] text-sm sm:text-base leading-relaxed space-y-4">
                <p>{overview || blurb}</p>
                <p>
                  Engineered to strict institutional standards, the property balances contemporary Saudi climatic considerations—such as solar thermal mitigation, acoustic buffer layering, and privacy zoning—with sweeping sightlines and expansive living proportions.
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Architectural Highlights Checklist */}
          {architecturalHighlights.length > 0 && (
            <ScrollReveal animation="fade-up" delay={100}>
              <div className="space-y-4 bg-[#FAF7F2] border border-[rgba(15,15,14,0.10)] rounded-xl p-6">
                <h3 className="font-serif text-lg font-semibold text-[#0F0F0E]">
                  Key Architectural Specifications
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  {architecturalHighlights.map((highlight, index) => (
                    <div key={index} className="flex items-start gap-3 text-xs text-[#5A5A52]">
                      <div className="p-1 rounded bg-[#B8913A]/15 text-[#B8913A] mt-0.5 shrink-0">
                        <Check size={13} />
                      </div>
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          )}

          {/* Location & Transit Times */}
          {location.nearby && location.nearby.length > 0 && (
            <ScrollReveal animation="fade-up" delay={150}>
              <div className="space-y-4">
                <h3 className="font-serif text-xl font-bold text-[#0F0F0E]">
                  Regional Proximity & Access
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {location.nearby.map((item, idx) => (
                    <div key={idx} className="p-3.5 rounded-lg bg-[#F0EBE1] border border-[rgba(15,15,14,0.08)] flex items-center justify-between text-xs">
                      <span className="text-[#0F0F0E] font-medium">{item.label}</span>
                      <span className="font-mono text-[#B8913A] font-semibold">{item.distance}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          )}

          {/* Mortgage & Investment Yield Calculator */}
          <ScrollReveal animation="fade-up" delay={200}>
            <div className="pt-4">
              <MortgageCalculator basePrice={price} />
            </div>
          </ScrollReveal>

        </div>

        {/* Right Column: Financial & Due Diligence Dossier */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Financial Profile Card */}
          <ScrollReveal animation="fade-left" delay={100}>
            <div className="bg-[#FAF7F2] border border-[rgba(15,15,14,0.10)] rounded-xl p-6 space-y-4">
              <h3 className="font-serif text-base font-semibold text-[#0F0F0E] flex items-center gap-2">
                <TrendingUp size={16} className="text-[#B8913A]" />
                <span>Investment & Yield Profile</span>
              </h3>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between border-b border-[rgba(15,15,14,0.08)] pb-2">
                  <span className="text-[#6B6B5A]">Target Gross Yield:</span>
                  <span className="font-mono text-[#B8913A] font-semibold">{financialMetrics.estimatedYield || '7.2% Net'}</span>
                </div>
                <div className="flex justify-between border-b border-[rgba(15,15,14,0.08)] pb-2">
                  <span className="text-[#6B6B5A]">District Appreciation:</span>
                  <span className="font-mono text-[#0F0F0E] font-medium">{financialMetrics.capitalAppreciation || '+9.4% YoY'}</span>
                </div>
                <div className="flex justify-between border-b border-[rgba(15,15,14,0.08)] pb-2">
                  <span className="text-[#6B6B5A]">Service Charge:</span>
                  <span className="font-mono text-[#5A5A52]">{financialMetrics.serviceCharge || 'SAR 45 / m²'}</span>
                </div>
                <div>
                  <span className="text-[#6B6B5A] block mb-1">Target Tenancy Profile:</span>
                  <p className="text-[#0F0F0E] font-medium">{financialMetrics.occupancyProfile || 'Corporate & Diplomatic'}</p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Fiduciary Governance Card */}
          <ScrollReveal animation="fade-left" delay={200}>
            <div className="bg-[#0C0C0A] text-[#E8E3DC] border border-[rgba(255,255,255,0.08)] rounded-xl p-6 space-y-3 text-xs">
              <div className="flex items-center gap-2 text-[#D4A853] font-serif font-semibold text-sm">
                <ShieldCheck size={16} />
                <span>Due Diligence Governance</span>
              </div>
              <p className="text-[#8A8578] leading-relaxed">
                Every unit offered under the Sadu Real Estate Development mandate has been independently verified through official registries for developer solvency, completion milestones, and unencumbered title deeds.
              </p>
            </div>
          </ScrollReveal>

        </div>

      </div>

      {/* Similar Opportunities */}
      {similarProperties.length > 0 && (
        <ScrollReveal animation="fade-up">
          <div className="pt-12 border-t border-[rgba(15,15,14,0.08)] space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-mono uppercase text-[#B8913A]">Regional Cross-Portfolio</p>
                <h2 className="font-serif text-2xl font-bold text-[#0F0F0E]">Similar Opportunities in {city}</h2>
              </div>
              <Link to={`/properties?city=${city}`} className="text-xs text-[#B8913A] hover:underline font-mono">
                View all in {city} &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {similarProperties.map(sim => (
                <PropertyCard
                  key={sim.id}
                  property={sim}
                  onInquire={(p) => onOpenInquiry ? onOpenInquiry(p) : null}
                />
              ))}
            </div>
          </div>
        </ScrollReveal>
      )}

    </div>
  );
}
