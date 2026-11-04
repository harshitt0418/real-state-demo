import React, { useState } from 'react';
import { Radio, Sparkles } from 'lucide-react';

/**
 * InteractiveRadarMap — Stylized SVG Architectural Constellation Radar
 * Exclusive Sadu Corridors: Riyadh, Jeddah, Mecca, Medina, Dubai
 */
export default function InteractiveRadarMap({ activeCity = 0, onSelectCity }) {
  const [hoveredNode, setHoveredNode] = useState(null);

  const nodes = [
    {
      id: 0,
      name: 'Riyadh',
      arabic: 'الرياض',
      tag: 'Capital Financial Core & Sovereign HQ',
      coords: '24°42′N 46°40′E',
      x: 330,
      y: 200,
      stat: '+11.2% YoY',
      statLabel: 'Capital Growth',
      elevation: '612m ASL'
    },
    {
      id: 1,
      name: 'Jeddah',
      arabic: 'جدة',
      tag: 'Red Sea Gateway & Waterfront Living',
      coords: '21°32′N 39°10′E',
      x: 130,
      y: 290,
      stat: '6.8% Net',
      statLabel: 'Waterfront Yield',
      elevation: '12m ASL'
    },
    {
      id: 2,
      name: 'Mecca',
      arabic: 'مكة المكرمة',
      tag: 'Holy Sanctuary & Perpetual Heritage',
      coords: '21°25′N 39°49′E',
      x: 175,
      y: 250,
      stat: '8.5% Net',
      statLabel: 'Sanctuary Yield',
      elevation: '277m ASL'
    },
    {
      id: 3,
      name: 'Medina',
      arabic: 'المدينة المنورة',
      tag: 'Sacred Heritage & Central Precinct',
      coords: '24°28′N 39°36′E',
      x: 190,
      y: 140,
      stat: '7.9% Net',
      statLabel: 'Sacred Core Yield',
      elevation: '608m ASL'
    },
    {
      id: 4,
      name: 'Dubai',
      arabic: 'دبي',
      tag: 'Global Waterfront & Luxury Towers',
      coords: '25°12′N 55°17′E',
      x: 500,
      y: 130,
      stat: '7.8% Net',
      statLabel: 'Marina Prime Yield',
      elevation: '16m ASL'
    }
  ];

  const current = nodes[activeCity] || nodes[0];

  return (
    <div className="bg-[#121210] border border-[rgba(255,255,255,0.08)] rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
      
      {/* Background Grid Pattern & Ambience */}
      <div 
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(rgba(184, 145, 58, 0.4) 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#B8913A]/5 blur-[90px] rounded-full pointer-events-none" />

      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[rgba(255,255,255,0.08)] pb-4 mb-6 relative z-10">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-[#B8913A]/15 border border-[#B8913A]/30 flex items-center justify-center text-[#D4A853]">
            <Radio size={16} className="animate-pulse" />
          </div>
          <div>
            <h3 className="font-serif font-bold text-sm sm:text-base text-[#E8E3DC]">
              SADU Strategic Territory Radar
            </h3>
            <p className="text-[10px] font-mono text-[#8A8578] uppercase tracking-wider">
              Exclusive Corridors: Riyadh · Jeddah · Mecca · Medina · Dubai
            </p>
          </div>
        </div>

        {/* Live Status indicator */}
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#1A1A18] border border-[rgba(255,255,255,0.08)] text-[10px] font-mono text-[#D4A853]">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
          <span>Active Beacon: {current.name}</span>
          <span className="text-white/30">·</span>
          <span>{current.coords}</span>
        </div>
      </div>

      {/* SVG Interactive Radar Canvas */}
      <div className="relative aspect-[16/9] w-full max-h-[380px] select-none">
        <svg 
          viewBox="0 0 600 360" 
          className="w-full h-full overflow-visible"
        >
          {/* Radar range circles centered at Riyadh */}
          <circle cx="330" cy="200" r="70" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" strokeDasharray="3 3" />
          <circle cx="330" cy="200" r="140" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" strokeDasharray="4 4" />
          <circle cx="330" cy="200" r="220" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" strokeDasharray="6 6" />

          {/* Interconnecting Circuit Lines */}
          {/* Riyadh to Medina */}
          <line x1="330" y1="200" x2="190" y2="140" stroke="rgba(184, 145, 58, 0.35)" strokeWidth="1.2" strokeDasharray="4 4" />
          {/* Medina to Mecca */}
          <line x1="190" y1="140" x2="175" y2="250" stroke="rgba(184, 145, 58, 0.40)" strokeWidth="1.2" strokeDasharray="4 4" />
          {/* Mecca to Jeddah */}
          <line x1="175" y1="250" x2="130" y2="290" stroke="rgba(184, 145, 58, 0.45)" strokeWidth="1.5" strokeDasharray="4 4" />
          {/* Jeddah to Riyadh */}
          <line x1="130" y1="290" x2="330" y2="200" stroke="rgba(184, 145, 58, 0.35)" strokeWidth="1.2" strokeDasharray="4 4" />
          {/* Riyadh to Dubai */}
          <line x1="330" y1="200" x2="500" y2="130" stroke="rgba(184, 145, 58, 0.40)" strokeWidth="1.2" strokeDasharray="4 4" />

          {/* Interactive Nodes */}
          {nodes.map((node) => {
            const isSelected = activeCity === node.id;

            return (
              <g 
                key={node.id} 
                className="cursor-pointer group"
                onClick={() => onSelectCity && onSelectCity(node.id)}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
              >
                {/* Sonar Pulse */}
                {isSelected && (
                  <circle 
                    cx={node.x} 
                    cy={node.y} 
                    r="22" 
                    fill="none" 
                    stroke="#D4A853" 
                    strokeWidth="1" 
                    className="animate-ping opacity-60" 
                  />
                )}

                {/* Outer Glow Halo */}
                <circle 
                  cx={node.x} 
                  cy={node.y} 
                  r={isSelected ? "15" : "11"} 
                  fill={isSelected ? "rgba(184, 145, 58, 0.25)" : "rgba(255,255,255,0.06)"} 
                  stroke={isSelected ? "#B8913A" : "rgba(255,255,255,0.2)"} 
                  strokeWidth="1.5"
                  className="transition-all duration-300"
                />

                {/* Core Dot */}
                <circle 
                  cx={node.x} 
                  cy={node.y} 
                  r={isSelected ? "5" : "3.5"} 
                  fill={isSelected ? "#D4A853" : "rgba(255,255,255,0.7)"} 
                  className="transition-all duration-300"
                />

                {/* City Label */}
                <text 
                  x={node.x} 
                  y={node.y - 18} 
                  fill={isSelected ? "#D4A853" : "#C8C3BA"} 
                  fontSize="12" 
                  fontWeight="bold" 
                  fontFamily="'Plus Jakarta Sans', sans-serif" 
                  textAnchor="middle"
                  className="transition-colors duration-300 select-none"
                >
                  {node.name}
                </text>

                {/* Stat Pill */}
                <text 
                  x={node.x} 
                  y={node.y + 24} 
                  fill={isSelected ? "#E8E3DC" : "#8A8578"} 
                  fontSize="9.5" 
                  fontFamily="monospace" 
                  textAnchor="middle"
                  className="transition-colors duration-300 select-none"
                >
                  {node.stat}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Floating live inspection telemetry panel */}
        <div className="absolute bottom-2 left-2 right-2 sm:right-auto sm:w-80 glass-card-dark p-3.5 rounded-xl border border-[rgba(255,255,255,0.12)] space-y-1 shadow-xl animate-in fade-in">
          <div className="flex items-center justify-between">
            <span className="font-serif font-bold text-sm text-[#E8E3DC]">{current.name}</span>
            <span className="text-[10px] font-mono text-[#D4A853] font-semibold">{current.stat}</span>
          </div>
          <p className="text-[11px] text-[#8A8578] leading-tight">{current.tag}</p>
          <div className="flex items-center justify-between pt-1 border-t border-[rgba(255,255,255,0.06)] text-[9.5px] font-mono text-white/50">
            <span>{current.coords}</span>
            <span>Click node to switch</span>
          </div>
        </div>

      </div>

    </div>
  );
}
