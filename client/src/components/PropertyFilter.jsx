import React from 'react';
import { Search, SlidersHorizontal, RotateCcw, MapPin, Building2 } from 'lucide-react';

export default function PropertyFilter({
  filters,
  onChange,
  onReset,
  totalResults
}) {
  const cities = ['all', 'Riyadh', 'Jeddah', 'Al Khobar'];
  const types = ['all', 'Apartment', 'Villa', 'Commercial', 'Penthouse', 'Retail'];
  const bedOptions = [
    { label: 'Any Beds', value: 'all' },
    { label: '2+ Beds', value: '2' },
    { label: '3+ Beds', value: '3' },
    { label: '4+ Beds', value: '4' }
  ];
  const priceBrackets = [
    { label: 'Any Price', min: '', max: '' },
    { label: 'Under SAR 2M', min: '', max: '2000000' },
    { label: 'SAR 2M – 3.5M', min: '2000000', max: '3500000' },
    { label: 'Above SAR 3.5M', min: '3500000', max: '' }
  ];

  const handlePriceBracket = (min, max) => {
    onChange({ minPrice: min, maxPrice: max });
  };

  return (
    <div className="bg-[#151A21] border border-neutral-800 rounded-xl p-5 shadow-lg space-y-5">
      
      {/* Top Row: Search & City Pills */}
      <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
        
        {/* City Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#0F1216] rounded-lg border border-neutral-800/80">
          <span className="text-[11px] font-mono uppercase text-stone-400 px-2 py-1 flex items-center gap-1 hidden sm:flex">
            <MapPin size={12} className="text-[#C5A265]" />
            Region:
          </span>
          {cities.map((city) => {
            const isActive = (filters.city || 'all') === city;
            return (
              <button
                key={city}
                onClick={() => onChange({ city })}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-[#C5A265] text-[#0F1216] font-semibold shadow-sm'
                    : 'text-stone-300 hover:text-white hover:bg-neutral-800/60'
                }`}
              >
                {city === 'all' ? 'All Corridors' : city}
              </button>
            );
          })}
        </div>

        {/* Keyword Search */}
        <div className="relative flex-1 max-w-md">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            value={filters.search || ''}
            onChange={(e) => onChange({ search: e.target.value })}
            placeholder="Search by district, title, or keywords..."
            className="w-full pl-9 pr-4 py-2 bg-[#0F1216] border border-neutral-800 rounded-lg text-xs text-stone-200 placeholder-stone-400 focus:border-[#C5A265] focus:outline-none transition-colors"
          />
        </div>

      </div>

      {/* Second Row: Detailed Dropdowns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-1 border-t border-neutral-800/60">
        
        {/* Property Type */}
        <div>
          <label className="block text-[10.5px] uppercase font-mono tracking-wider text-stone-400 mb-1.5">
            Asset Class
          </label>
          <select
            value={filters.type || 'all'}
            onChange={(e) => onChange({ type: e.target.value })}
            className="w-full bg-[#0F1216] border border-neutral-800 rounded-md py-2 px-3 text-xs text-stone-200 focus:border-[#C5A265] focus:outline-none"
          >
            {types.map((t) => (
              <option key={t} value={t}>
                {t === 'all' ? 'All Asset Types' : t}
              </option>
            ))}
          </select>
        </div>

        {/* Price Bracket */}
        <div>
          <label className="block text-[10.5px] uppercase font-mono tracking-wider text-stone-400 mb-1.5">
            Capital Range
          </label>
          <select
            value={
              filters.minPrice === '2000000' && filters.maxPrice === '3500000'
                ? 'bracket-2'
                : filters.maxPrice === '2000000'
                ? 'bracket-1'
                : filters.minPrice === '3500000'
                ? 'bracket-3'
                : 'all'
            }
            onChange={(e) => {
              const val = e.target.value;
              if (val === 'bracket-1') handlePriceBracket('', '2000000');
              else if (val === 'bracket-2') handlePriceBracket('2000000', '3500000');
              else if (val === 'bracket-3') handlePriceBracket('3500000', '');
              else handlePriceBracket('', '');
            }}
            className="w-full bg-[#0F1216] border border-neutral-800 rounded-md py-2 px-3 text-xs text-stone-200 focus:border-[#C5A265] focus:outline-none"
          >
            <option value="all">Any Price</option>
            <option value="bracket-1">Under SAR 2,000,000</option>
            <option value="bracket-2">SAR 2,000,000 – 3,500,000</option>
            <option value="bracket-3">Above SAR 3,500,000</option>
          </select>
        </div>

        {/* Bedrooms */}
        <div>
          <label className="block text-[10.5px] uppercase font-mono tracking-wider text-stone-400 mb-1.5">
            Bedrooms
          </label>
          <select
            value={filters.beds || 'all'}
            onChange={(e) => onChange({ beds: e.target.value })}
            className="w-full bg-[#0F1216] border border-neutral-800 rounded-md py-2 px-3 text-xs text-stone-200 focus:border-[#C5A265] focus:outline-none"
          >
            {bedOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Sort */}
        <div>
          <label className="block text-[10.5px] uppercase font-mono tracking-wider text-stone-400 mb-1.5">
            Order By
          </label>
          <select
            value={filters.sort || 'default'}
            onChange={(e) => onChange({ sort: e.target.value })}
            className="w-full bg-[#0F1216] border border-neutral-800 rounded-md py-2 px-3 text-xs text-stone-200 focus:border-[#C5A265] focus:outline-none"
          >
            <option value="default">Featured & Curated</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="area-desc">Area: Largest First</option>
          </select>
        </div>

      </div>

      {/* Status Bar: Count & Reset */}
      <div className="flex items-center justify-between pt-2 text-xs text-stone-400 border-t border-neutral-800/60">
        <p className="font-mono">
          Showing <span className="text-[#C5A265] font-semibold">{totalResults}</span> {totalResults === 1 ? 'unit' : 'units'} matching criteria
        </p>

        <button
          onClick={onReset}
          className="flex items-center gap-1.5 text-stone-400 hover:text-stone-200 hover:underline transition-colors cursor-pointer text-xs"
        >
          <RotateCcw size={12} />
          <span>Reset Filters</span>
        </button>
      </div>

    </div>
  );
}
