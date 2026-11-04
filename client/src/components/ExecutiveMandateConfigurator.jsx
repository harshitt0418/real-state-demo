import React, { useState } from 'react';
import { Sliders, ArrowUpRight, ShieldCheck, Sparkles } from 'lucide-react';

export default function ExecutiveMandateConfigurator({ onOpenInquiry }) {
  const [capitalAmount, setCapitalAmount] = useState(4500000);
  const [selectedCity, setSelectedCity] = useState('Riyadh');
  const [selectedAssetType, setSelectedAssetType] = useState('Penthouse');

  // Multiplier estimates
  const yieldMultiplier = 
    selectedCity === 'Mecca' ? 0.085 :
    selectedCity === 'Dubai' ? 0.078 :
    selectedCity === 'Medina' ? 0.079 :
    selectedCity === 'Riyadh' ? 0.076 : 0.068;

  const growthMultiplier = 
    selectedCity === 'Riyadh' ? 0.48 :
    selectedCity === 'Dubai' ? 0.42 :
    selectedCity === 'Mecca' ? 0.45 :
    selectedCity === 'Jeddah' ? 0.36 : 0.34;

  const projectedAnnualYieldSAR = Math.round(capitalAmount * yieldMultiplier);
  const projected5YrValueSAR = Math.round(capitalAmount * (1 + growthMultiplier));
  const estimatedMatchingUnits = capitalAmount >= 8000000 ? 2 : capitalAmount >= 4000000 ? 4 : 5;

  const handleLaunchBrief = () => {
    if (onOpenInquiry) {
      onOpenInquiry({
        title: `Mandate: ${selectedAssetType} (${selectedCity})`,
        city: selectedCity,
        type: selectedAssetType,
        priceLabel: `SAR ${(capitalAmount / 1000000).toFixed(1)}M Allocation`,
        lookingFor: `${selectedAssetType} in ${selectedCity} with target allocation of SAR ${(capitalAmount / 1000000).toFixed(1)}M`
      });
    }
  };

  return (
    <div className="bg-[#FAF7F2] border border-[rgba(15,15,14,0.12)] rounded-2xl p-6 sm:p-10 shadow-lg relative overflow-hidden">
      
      {/* Decorative Golden Accent */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#B8913A]/5 rounded-full blur-[80px] pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[rgba(15,15,14,0.08)] pb-6 mb-8">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#B8913A] animate-ping" />
            <p className="text-[10.5px] font-mono uppercase tracking-widest text-[#B8913A] font-semibold">
              Capital Mandate Simulator
            </p>
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#0F0F0E]">
            Model Your Acquisition
          </h3>
          <p className="text-xs sm:text-sm text-[#6B6B5A] max-w-xl leading-relaxed">
            Simulate allocation, yield trajectory, and private development inventory across our exclusive markets.
          </p>
        </div>

        {/* Brand Tag */}
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F0EBE1] border border-[rgba(184,145,58,0.3)] text-xs text-[#0F0F0E]">
          <ShieldCheck size={14} className="text-[#B8913A]" />
          <span className="font-mono text-[11px] font-semibold">SADU Prime Standard</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        
        {/* Left Column: Interactive Controls */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* 1. Capital Amount Slider */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-mono uppercase text-[#6B6B5A] font-semibold text-[11px]">Allocation Budget</span>
              <span className="font-serif font-bold text-lg text-[#B8913A]">
                SAR {(capitalAmount).toLocaleString()}
                <span className="text-xs text-[#6B6B5A] font-sans font-normal ml-1">
                  ({(capitalAmount / 1000000).toFixed(1)}M)
                </span>
              </span>
            </div>
            <input
              type="range"
              min={1500000}
              max={20000000}
              step={250000}
              value={capitalAmount}
              onChange={(e) => setCapitalAmount(Number(e.target.value))}
              className="w-full accent-[#B8913A] bg-[#E8E1D5] h-2 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-mono text-[#8A8A75]">
              <span>SAR 1.5M Single Asset</span>
              <span>SAR 10M Prime Unit</span>
              <span>SAR 20M+ Portfolio</span>
            </div>
          </div>

          {/* 2. City Selector — Riyadh, Jeddah, Mecca, Medina, Dubai */}
          <div className="space-y-2">
            <label className="block text-[11px] uppercase font-mono tracking-wider text-[#6B6B5A] font-semibold">
              Exclusive Corridors
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {[
                { city: 'Riyadh', tag: '+11.2%' },
                { city: 'Jeddah', tag: '6.8% Net' },
                { city: 'Mecca', tag: '8.5% Net' },
                { city: 'Medina', tag: '7.9% Net' },
                { city: 'Dubai', tag: '7.8% Net' },
              ].map(item => (
                <button
                  key={item.city}
                  type="button"
                  onClick={() => setSelectedCity(item.city)}
                  className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                    selectedCity === item.city
                      ? 'bg-[#F0EBE1] border-[#B8913A] shadow-sm'
                      : 'bg-[#FAF7F2] border-[rgba(15,15,14,0.08)] hover:bg-[#F0EBE1]'
                  }`}
                >
                  <p className="font-serif font-bold text-xs text-[#0F0F0E]">{item.city}</p>
                  <p className="text-[9.5px] font-mono text-[#B8913A] mt-0.5">{item.tag}</p>
                </button>
              ))}
            </div>
          </div>

          {/* 3. Asset Typology Selector */}
          <div className="space-y-2">
            <label className="block text-[11px] uppercase font-mono tracking-wider text-[#6B6B5A] font-semibold">
              Typology
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              {['Penthouse', 'Sanctuary Villa', 'Commercial Floor'].map(type => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setSelectedAssetType(type)}
                  className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                    selectedAssetType === type
                      ? 'bg-[#B8913A] text-[#FAF7F2] border-[#B8913A] font-semibold shadow-sm'
                      : 'bg-[#FAF7F2] text-[#3A3A35] border-[rgba(15,15,14,0.08)] hover:bg-[#F0EBE1]'
                  }`}
                >
                  <span className="text-xs font-sans tracking-wide block">{type}</span>
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Live Projected Outcome Card */}
        <div className="lg:col-span-5">
          <div className="bg-[#141412] text-[#E8E3DC] rounded-2xl p-6 sm:p-7 border border-[rgba(255,255,255,0.12)] shadow-2xl space-y-6 relative overflow-hidden float-slow-1">
            
            {/* Top Telemetry Heading */}
            <div className="flex items-center justify-between border-b border-[rgba(255,255,255,0.08)] pb-3">
              <div>
                <p className="text-[10px] font-mono uppercase text-[#8A8578]">Projected Metrics</p>
                <h4 className="font-serif font-bold text-base text-[#E8E3DC]">SADU Pro Forma</h4>
              </div>
              <span className="text-[9.5px] font-mono px-2 py-0.5 rounded bg-[#B8913A]/20 border border-[#B8913A]/40 text-[#D4A853]">
                {selectedCity}
              </span>
            </div>

            {/* Projected Outputs Grid */}
            <div className="space-y-4 text-xs">
              <div className="flex items-baseline justify-between">
                <span className="text-[#8A8578]">Annual Net Yield:</span>
                <span className="font-serif text-lg font-bold text-[#D4A853]">
                  ~SAR {projectedAnnualYieldSAR.toLocaleString()}
                  <span className="text-[10px] font-mono text-white/50 ml-1">/ yr</span>
                </span>
              </div>

              <div className="flex items-baseline justify-between border-t border-[rgba(255,255,255,0.06)] pt-3">
                <span className="text-[#8A8578]">5-Yr Valuation:</span>
                <span className="font-serif text-lg font-bold text-[#E8E3DC]">
                  SAR {projected5YrValueSAR.toLocaleString()}
                </span>
              </div>

              <div className="flex items-center justify-between border-t border-[rgba(255,255,255,0.06)] pt-3">
                <span className="text-[#8A8578]">Available Prime Units:</span>
                <span className="font-mono text-xs text-emerald-400 font-semibold flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                  {estimatedMatchingUnits} Exclusive Opportunities
                </span>
              </div>
            </div>

            {/* Action CTA */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleLaunchBrief}
                className="w-full py-3.5 px-4 rounded-xl bg-[#B8913A] hover:bg-[#D4A853] text-[#FAF7F2] font-semibold text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xl hover:shadow-[#B8913A]/30 transform hover:-translate-y-0.5"
              >
                <span>Initiate Mandate Inquiry</span>
                <ArrowUpRight size={14} />
              </button>
              <p className="text-[9.5px] text-white/40 text-center font-mono mt-2">
                Pre-fills your inquiry with this configuration
              </p>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
