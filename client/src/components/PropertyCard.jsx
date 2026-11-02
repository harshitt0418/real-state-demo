import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ArrowUpRight, Maximize2, Bed, Bath } from 'lucide-react';

/**
 * Hook for 3D card perspective tilt on mousemove
 */
function useCardTilt(maxTilt = 6) {
  const cardRef = useRef(null);
  const [style, setStyle] = useState({});

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -maxTilt;
    const rotateY = ((x - centerX) / centerX) * maxTilt;

    setStyle({
      transform: `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-6px)`,
      transition: 'transform 0.1s ease-out'
    });
  };

  const handleMouseLeave = () => {
    setStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)',
      transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
    });
  };

  return { cardRef, style, handleMouseMove, handleMouseLeave };
}

/**
 * FeaturedPropertyCard — Large editorial card with 3D tilt, image zoom & yield badge
 */
export function FeaturedPropertyCard({ property, onInquire }) {
  if (!property) return null;
  const { id, title, city, district, type, priceLabel, price, beds, baths, area, image, blurb, financialMetrics } = property;
  const { cardRef, style, handleMouseMove, handleMouseLeave } = useCardTilt(5);

  return (
    <article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={style}
      className="featured-card rounded-xl overflow-hidden flex flex-col group h-full cursor-pointer"
    >
      {/* Image container */}
      <div className="card-image editorial-img-container aspect-[16/10] relative">
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover"
        />

        {/* Gradient Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0E]/75 via-transparent to-black/20 pointer-events-none" />

        {/* Top badge */}
        <div className="absolute top-3 left-3">
          <span className="brass-badge rounded shadow-sm">
            {type} · {city}
          </span>
        </div>

        {/* Yield badge with subtle glow */}
        {financialMetrics?.estimatedYield && (
          <div className="absolute top-3 right-3 bg-[#0F0F0E]/85 backdrop-blur-md px-2.5 py-1.5 rounded border border-[rgba(255,255,255,0.12)] shadow-md">
            <p className="text-[9px] font-mono uppercase text-[#8A8578] leading-none mb-0.5">Net Yield</p>
            <p className="text-xs font-mono font-bold text-[#D4A853] leading-none">{financialMetrics.estimatedYield}</p>
          </div>
        )}

        {/* Location chip */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-white text-xs font-medium bg-[#0F0F0E]/75 backdrop-blur-sm px-2.5 py-1 rounded">
          <MapPin size={11} className="text-[#D4A853]" />
          <span>{district}, {city}</span>
        </div>
      </div>

      {/* Body */}
      <div className="card-body p-5 flex-1 flex flex-col justify-between bg-[#FAF7F2] space-y-4">
        <div>
          {/* Price row */}
          <div className="flex items-baseline justify-between border-b border-[rgba(15,15,14,0.08)] pb-3 mb-3">
            <div>
              <p className="text-[10px] uppercase font-mono tracking-wider text-[#8A8A75] mb-0.5">Acquisition Guide</p>
              <p className="text-xl font-serif font-bold text-[#B8913A] tracking-tight">
                {priceLabel || `SAR ${price?.toLocaleString()}`}
              </p>
            </div>
            {area && (
              <div className="text-right">
                <p className="text-[9px] uppercase font-mono text-[#8A8A75]">Area</p>
                <p className="text-xs font-mono text-[#3A3A35] font-semibold">{area} m²</p>
              </div>
            )}
          </div>

          {/* Title */}
          <h3 className="font-serif text-base font-semibold text-[#0F0F0E] group-hover:text-[#B8913A] transition-colors leading-snug">
            <Link to={`/properties/${id}`} className="focus:outline-none">{title}</Link>
          </h3>
          <p className="text-[#6B6B5A] text-xs leading-relaxed mt-2 line-clamp-2">{blurb}</p>
        </div>

        {/* Specs & actions */}
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-2 py-2 px-3 bg-[#F0EBE1] rounded border border-[rgba(15,15,14,0.06)] text-[11px] text-[#3A3A35]">
            <div className="flex items-center gap-1.5">
              <Maximize2 size={12} className="text-[#8A8A75]" />
              <span>{area} m²</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Bed size={12} className="text-[#8A8A75]" />
              <span>{beds != null ? `${beds} Beds` : 'Comm.'}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Bath size={12} className="text-[#8A8A75]" />
              <span>{baths} Baths</span>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <Link
              to={`/properties/${id}`}
              className="flex-1 text-center py-2 px-3 rounded bg-[#F0EBE1] hover:bg-[#E8E1D5] text-[#3A3A35] text-xs font-medium tracking-wide border border-[rgba(15,15,14,0.10)] transition-colors"
            >
              View Details
            </Link>
            <button
              onClick={() => onInquire ? onInquire(property) : null}
              className="py-2 px-3 rounded bg-[#B8913A] hover:bg-[#D4A853] text-[#FAF7F2] text-xs font-semibold tracking-wider uppercase transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span>Inquire</span>
              <ArrowUpRight size={13} />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

/**
 * OffsetPropertyCard — Magazine-layout card
 */
export function OffsetPropertyCard({ property, onInquire, offset = false }) {
  if (!property) return null;
  const { id, title, city, type, priceLabel, price, area, image, financialMetrics } = property;
  const { cardRef, style, handleMouseMove, handleMouseLeave } = useCardTilt(4);

  return (
    <article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={style}
      className={`editorial-card rounded-xl overflow-hidden group ${offset ? 'mt-8' : '-mt-8'} h-full`}
    >
      <div className="editorial-img-container aspect-[4/3] relative">
        <img src={image} alt={title} loading="lazy" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0E]/60 via-transparent to-transparent" />
        <div className="absolute top-3 left-3">
          <span className="brass-badge rounded text-[8px]">{type}</span>
        </div>
        {financialMetrics?.estimatedYield && (
          <div className="absolute bottom-3 right-3 text-right bg-[#0F0F0E]/75 backdrop-blur-sm px-2.5 py-1.5 rounded">
            <p className="text-[9px] font-mono text-[#D4A853] font-bold">{financialMetrics.estimatedYield}</p>
          </div>
        )}
      </div>
      <div className="p-4 bg-[#FAF7F2]">
        <p className="text-[10px] uppercase font-mono tracking-wider text-[#8A8A75] mb-1">{city}</p>
        <h3 className="font-serif text-sm font-semibold text-[#0F0F0E] group-hover:text-[#B8913A] transition-colors leading-snug">
          <Link to={`/properties/${id}`}>{title}</Link>
        </h3>
        <p className="text-sm font-serif font-bold text-[#B8913A] mt-1.5">
          {priceLabel || `SAR ${price?.toLocaleString()}`}
        </p>
        {area && <p className="text-[11px] text-[#8A8A75] font-mono mt-1">{area} m²</p>}
      </div>
    </article>
  );
}

/**
 * CityCard — Image-led card for a city market
 */
export function CityCard({ city, tagline, image, stat, statLabel, href }) {
  const { cardRef, style, handleMouseMove, handleMouseLeave } = useCardTilt(5);

  return (
    <Link
      to={href || `/properties?city=${city}`}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={style}
      className="group block editorial-card rounded-xl overflow-hidden shadow-sm"
    >
      <div className="editorial-img-container aspect-[4/3] relative">
        <img src={image} alt={city} loading="lazy" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0E]/85 via-[#0F0F0E]/35 to-transparent" />

        {/* City name */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <h3 className="font-serif text-2xl font-bold text-white mb-0.5">{city}</h3>
          <p className="text-[11px] font-mono text-white/70 uppercase tracking-wider mb-3">{tagline}</p>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[9px] font-mono uppercase text-white/50 mb-0.5">{statLabel}</p>
              <p className="text-sm font-mono font-bold text-[#D4A853]">{stat}</p>
            </div>
            <div className="h-8 w-8 rounded-full border border-white/30 flex items-center justify-center text-white group-hover:bg-[#B8913A] group-hover:border-[#B8913A] transition-all">
              <ArrowUpRight size={15} />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

/**
 * MarketInsightCard — Premium data card with large numbers
 */
export function MarketInsightCard({ label, value, unit, sub, dark = false }) {
  return (
    <div className={`p-5 rounded-xl border transition-all duration-300 hover:scale-[1.02] ${
      dark
        ? 'bg-[#1C1C1A] border-[rgba(255,255,255,0.06)] hover:border-[#B8913A]/40'
        : 'bg-[#FAF7F2] border-[rgba(15,15,14,0.08)] hover:border-[#B8913A]/40 shadow-sm'
    }`}>
      <p className={`metric-label mb-3 ${dark ? 'text-[#5A5A52]' : ''}`}>{label}</p>
      <div className="flex items-baseline gap-1.5 mb-1">
        <span className={`metric-num text-3xl ${dark ? 'text-[#E8E3DC]' : ''}`}>{value}</span>
        {unit && (
          <span className={`text-sm font-sans font-medium ${dark ? 'text-[#8A8578]' : 'text-[#6B6B5A]'}`}>{unit}</span>
        )}
      </div>
      {sub && (
        <p className={`text-[11px] font-sans ${dark ? 'text-[#5A5A52]' : 'text-[#8A8A75]'}`}>{sub}</p>
      )}
    </div>
  );
}

export default function PropertyCard({ property, onInquire }) {
  return <FeaturedPropertyCard property={property} onInquire={onInquire} />;
}
