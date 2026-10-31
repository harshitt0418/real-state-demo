import React from 'react';
import { Link } from 'react-router-dom';
import { Bed, Bath, Maximize2, MapPin, ArrowUpRight, TrendingUp } from 'lucide-react';

export default function PropertyCard({ property, onInquire }) {
  if (!property) return null;

  const {
    id,
    title,
    city,
    district,
    type,
    price,
    priceLabel,
    pricePerSqm,
    beds,
    baths,
    area,
    image,
    blurb,
    featured,
    financialMetrics
  } = property;

  return (
    <article className="editorial-card rounded-lg overflow-hidden flex flex-col group h-full">
      
      {/* Media Container */}
      <div className="editorial-img-container aspect-[16/10] w-full relative">
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover"
        />

        {/* Gradient Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F1216]/80 via-transparent to-black/30 pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-2">
            <span className="bg-[#0F1216]/85 backdrop-blur-md border border-neutral-700/60 text-[#C5A265] text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded">
              {type} · {city}
            </span>
            {featured && (
              <span className="bg-[#C5A265] text-[#0F1216] text-[10px] font-bold font-mono uppercase tracking-wider px-1.5 py-0.5 rounded">
                Featured
              </span>
            )}
          </div>
          <span className="bg-neutral-900/80 backdrop-blur-md text-stone-400 text-[9px] font-mono px-2 py-0.5 rounded border border-neutral-700/50">
            Sample Asset
          </span>
        </div>

        {/* Bottom overlay: Location pill */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-stone-200 text-xs font-medium bg-[#0F1216]/75 backdrop-blur-sm px-2.5 py-1 rounded">
          <MapPin size={12} className="text-[#C5A265]" />
          <span>{district}, {city}</span>
        </div>
      </div>

      {/* Body Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        
        <div>
          {/* Price Header */}
          <div className="flex items-baseline justify-between gap-2 border-b border-neutral-800/80 pb-3">
            <div>
              <p className="text-[10px] uppercase font-mono tracking-wider text-stone-400">Acquisition Guide</p>
              <p className="text-xl font-serif font-bold text-[#F3EFEA] tracking-tight text-[#C5A265]">
                {priceLabel || `SAR ${price?.toLocaleString()}`}
              </p>
            </div>
            {pricePerSqm && (
              <div className="text-right">
                <p className="text-[9px] uppercase font-mono text-stone-400">Unit Rate</p>
                <p className="text-xs font-mono text-stone-300">
                  SAR {pricePerSqm?.toLocaleString()} / m²
                </p>
              </div>
            )}
          </div>

          {/* Title & Short Blurb */}
          <div className="pt-3">
            <h3 className="font-serif text-base font-semibold text-[#F3EFEA] group-hover:text-[#C5A265] transition-colors leading-snug">
              <Link to={`/properties/${id}`} className="focus:outline-none">
                {title}
              </Link>
            </h3>
            <p className="text-stone-400 text-xs leading-relaxed mt-2 line-clamp-2">
              {blurb}
            </p>
          </div>
        </div>

        {/* Specifications Bar */}
        <div className="space-y-3 pt-2">
          <div className="grid grid-cols-3 gap-2 py-2 px-3 bg-[#0F1216]/60 rounded border border-neutral-800/60 text-[11px] text-stone-300">
            <div className="flex items-center gap-1.5">
              <Maximize2 size={13} className="text-stone-400" />
              <span>{area} m²</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Bed size={13} className="text-stone-400" />
              <span>{beds !== null && beds !== undefined ? `${beds} Beds` : 'Commercial'}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Bath size={13} className="text-stone-400" />
              <span>{baths} Baths</span>
            </div>
          </div>

          {/* Financial Indicator */}
          {financialMetrics?.estimatedYield && (
            <div className="flex items-center gap-1.5 text-[10.5px] text-[#C5A265] font-mono">
              <TrendingUp size={12} />
              <span>{financialMetrics.estimatedYield}</span>
            </div>
          )}

          {/* Action CTAs */}
          <div className="flex items-center gap-2 pt-1">
            <Link
              to={`/properties/${id}`}
              className="flex-1 text-center py-2 px-3 rounded bg-neutral-800/80 hover:bg-neutral-700/80 text-stone-200 text-xs font-medium tracking-wide border border-neutral-700/70 transition-colors"
            >
              View Details
            </Link>
            <button
              onClick={() => onInquire ? onInquire(property) : null}
              className="py-2 px-3 rounded bg-[#C5A265] hover:bg-[#B28F52] text-[#0F1216] text-xs font-semibold tracking-wider uppercase transition-colors flex items-center justify-center gap-1 cursor-pointer"
              title="Submit Inquiry for this property"
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
