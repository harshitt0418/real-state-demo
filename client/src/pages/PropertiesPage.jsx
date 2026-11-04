import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import PropertyCard from '../components/PropertyCard';
import PropertyFilter from '../components/PropertyFilter';
import ScrollReveal from '../components/ScrollReveal';
import MovingTextBand from '../components/MovingTextBand';
import { fetchProperties } from '../services/api';
import { Building, Compass, AlertCircle } from 'lucide-react';

export default function PropertiesPage({ onOpenInquiry }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const [filters, setFilters] = useState({
    city: searchParams.get('city') || 'all',
    type: searchParams.get('type') || 'all',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    beds: searchParams.get('beds') || 'all',
    search: searchParams.get('search') || '',
    sort: searchParams.get('sort') || 'default'
  });

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dataSourceNotice, setDataSourceNotice] = useState('');

  // Sync state when URL params change
  useEffect(() => {
    const cityParam = searchParams.get('city') || 'all';
    const typeParam = searchParams.get('type') || 'all';
    setFilters(prev => ({ ...prev, city: cityParam, type: typeParam }));
  }, [searchParams]);

  useEffect(() => {
    let isCurrent = true;
    async function loadProperties() {
      setLoading(true);
      try {
        const res = await fetchProperties(filters);
        if (isCurrent) {
          setProperties(res.data || []);
          if (res.notice) setDataSourceNotice(res.notice);
          setLoading(false);
        }
      } catch (err) {
        if (isCurrent) {
          console.error('Error loading properties:', err);
          setLoading(false);
        }
      }
    }
    loadProperties();
    return () => { isCurrent = false; };
  }, [filters]);

  const handleFilterChange = (newFilters) => {
    setFilters(prev => {
      const updated = { ...prev, ...newFilters };
      const params = new URLSearchParams();
      if (updated.city && updated.city !== 'all') params.set('city', updated.city);
      if (updated.type && updated.type !== 'all') params.set('type', updated.type);
      setSearchParams(params);
      return updated;
    });
  };

  const handleReset = () => {
    setFilters({
      city: 'all',
      type: 'all',
      minPrice: '',
      maxPrice: '',
      beds: 'all',
      search: '',
      sort: 'default'
    });
    setSearchParams({});
  };

  return (
    <div className="pt-28 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      
      {/* Page Header */}
      <ScrollReveal animation="fade-down" duration={500}>
        <div className="space-y-4 max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-mono text-[#B8913A] uppercase tracking-widest">
            <Compass size={14} />
            <span>Curated Portfolio Catalogue</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-[#0F0F0E] tracking-tight leading-tight">
            Vetted Real Estate Assets
          </h1>
          <p className="text-[#5A5A52] text-sm sm:text-base leading-relaxed">
            Explore prime residences, waterfront penthouses, and holy sanctuary suites across Riyadh, Jeddah, Mecca, Medina, and Dubai. Sourced directly through regulated master developer channels with verified titles.
          </p>
        </div>
      </ScrollReveal>

      {/* Filter Component */}
      <ScrollReveal animation="fade-up" duration={600} delay={100}>
        <PropertyFilter
          filters={filters}
          onChange={handleFilterChange}
          onReset={handleReset}
          totalResults={properties.length}
        />
      </ScrollReveal>

      {/* Main Grid / Content */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-4">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="h-96 rounded-xl bg-[#F0EBE1] animate-pulse border border-[rgba(15,15,14,0.06)]" />
          ))}
        </div>
      ) : properties.length === 0 ? (
        <div className="text-center py-20 bg-[#FAF7F2] border border-[rgba(15,15,14,0.10)] rounded-xl space-y-4">
          <div className="p-3 bg-[#F0EBE1] rounded-full w-12 h-12 flex items-center justify-center mx-auto text-[#B8913A]">
            <Building size={24} />
          </div>
          <h3 className="font-serif text-xl font-bold text-[#0F0F0E]">No properties match these parameters</h3>
          <p className="text-xs text-[#6B6B5A] max-w-md mx-auto">
            Try adjusting your price bracket, bedrooms, or region filter to view available opportunities.
          </p>
          <button
            onClick={handleReset}
            className="px-5 py-2.5 bg-[#B8913A] hover:bg-[#D4A853] text-[#FAF7F2] font-semibold text-xs rounded uppercase tracking-wider cursor-pointer transition-colors"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property, idx) => (
            <ScrollReveal 
              key={property.id} 
              animation="fade-up" 
              delay={(idx % 6) * 90}
            >
              <PropertyCard
                property={property}
                onInquire={(p) => onOpenInquiry ? onOpenInquiry(p) : null}
              />
            </ScrollReveal>
          ))}
        </div>
      )}

      {/* Disclaimer / Replacement Note */}
      <ScrollReveal animation="fade-up" delay={200}>
        <div className="p-5 rounded-xl bg-[#F0EBE1] border border-[rgba(15,15,14,0.08)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6B6B5A]">
          <p className="flex items-center gap-2">
            <AlertCircle size={14} className="text-[#B8913A] shrink-0" />
            <span>Listing data, prices, and specs shown are realistic placeholders for advisory mockup review.</span>
          </p>
          <button
            onClick={() => onOpenInquiry ? onOpenInquiry() : window.location.href = '/contact'}
            className="text-[#B8913A] hover:underline font-mono text-[11px] whitespace-nowrap cursor-pointer"
          >
            Request Off-Market Brief &rarr;
          </button>
        </div>
      </ScrollReveal>

    </div>
  );
}
