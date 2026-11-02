import React from 'react';
import { Search, RotateCcw, MapPin } from 'lucide-react';

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

  const handlePriceBracket = (min, max) => {
    onChange({ minPrice: min, maxPrice: max });
  };

  return (
    <div className="bg-[#FAF7F2] border border-[rgba(15,15,14,0.10)] rounded-xl p-6 shadow-sm space-y-6">
      
      {/* Top Row: Search & City Pills */}
      <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
        
        {/* City Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#F0EBE1] rounded-lg border border-[rgba(15,15,14,0.08)]">
          <span className="text-[11px] font-mono uppercase text-[#6B6B5A] px-2 py-1 flex items-center gap-1 hidden sm:flex">
            <MapPin size={12} className="text-[#B8913A]" />
            Region:
          </span>
          {cities.map((city) => {
            const isActive = (filters.city || 'all') === city;
            return (
              <button
                key={city}
                onClick={() => onChange({ city })}
                className={`px-3.5 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#B8913A] text-[#FAF7F2] font-semibold shadow-sm'
                    : 'text-[#5A5A52] hover:text-[#0F0F0E] hover:bg-[#E8E1D5]'
                }`}
              >
                {city === 'all' ? 'All Corridors' : city}
              </button>
            );
          })}
        </div>

        {/* Keyword Search */}
        <div className="relative flex-1 max-w-md">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8A8A75]" />
          <input
            type="text"
            value={filters.search || ''}
            onChange={(e) => onChange({ search: e.target.value })}
            placeholder="Search by district, title, or keywords..."
            className="w-full pl-9 pr-4 py-2 bg-[#F0EBE1] border border-[rgba(15,15,14,0.08)] rounded-lg text-xs text-[#0F0F0E] placeholder-[#8A8A75] focus:border-[#B8913A] focus:outline-none focus:bg-[#FAF7F2] transition-colors"
          />
        </div>

      </div>

      {/* Second Row: Detailed Dropdowns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-2 border-t border-[rgba(15,15,14,0.08)]">
        
        {/* Property Type */}
        <div>
          <label className="block text-[10.5px] uppercase font-mono tracking-wider text-[#6B6B5A] mb-1.5">
            Asset Class
          </label>
          <select
            value={filters.type || 'all'}
            onChange={(e) => onChange({ type: e.target.value })}
            className="w-full bg-[#F0EBE1] border border-[rgba(15,15,14,0.08)] rounded-md py-2 px-3 text-xs text-[#0F0F0E] focus:border-[#B8913A] focus:outline-none"
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
          <label className="block text-[10.5px] uppercase font-mono tracking-wider text-[#6B6B5A] mb-1.5">
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
            className="w-full bg-[#F0EBE1] border border-[rgba(15,15,14,0.08)] rounded-md py-2 px-3 text-xs text-[#0F0F0E] focus:border-[#B8913A] focus:outline-none"
          >
            <option value="all">Any Price</option>
            <option value="bracket-1">Under SAR 2,000,000</option>
            <option value="bracket-2">SAR 2,000,000 – 3,500,000</option>
            <option value="bracket-3">Above SAR 3,500,000</option>
          </select>
        </div>

        {/* Bedrooms */}
        <div>
          <label className="block text-[10.5px] uppercase font-mono tracking-wider text-[#6B6B5A] mb-1.5">
            Bedrooms
          </label>
          <select
            value={filters.beds || 'all'}
            onChange={(e) => onChange({ beds: e.target.value })}
            className="w-full bg-[#F0EBE1] border border-[rgba(15,15,14,0.08)] rounded-md py-2 px-3 text-xs text-[#0F0F0E] focus:border-[#B8913A] focus:outline-none"
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
          <label className="block text-[10.5px] uppercase font-mono tracking-wider text-[#6B6B5A] mb-1.5">
            Order By
          </label>
          <select
            value={filters.sort || 'default'}
            onChange={(e) => onChange({ sort: e.target.value })}
            className="w-full bg-[#F0EBE1] border border-[rgba(15,15,14,0.08)] rounded-md py-2 px-3 text-xs text-[#0F0F0E] focus:border-[#B8913A] focus:outline-none"
          >
            <option value="default">Featured & Curated</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="area-desc">Area: Largest First</option>
          </select>
        </div>

      </div>

      {/* Status Bar: Count & Reset */}
      <div className="flex items-center justify-between pt-2 text-xs text-[#6B6B5A] border-t border-[rgba(15,15,14,0.08)]">
        <p className="font-mono">
          Showing <span className="text-[#B8913A] font-semibold">{totalResults}</span> {totalResults === 1 ? 'unit' : 'units'} matching criteria
        </p>

        <button
          onClick={onReset}
          className="flex items-center gap-1.5 text-[#6B6B5A] hover:text-[#0F0F0E] hover:underline transition-colors cursor-pointer text-xs"
        >
          <RotateCcw size={12} />
          <span>Reset Filters</span>
        </button>
      </div>

    </div>
  );
}
