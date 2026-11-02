import React, { useState } from 'react';
import { MapPin, Radio, Compass, ArrowUpRight, Sparkles } from 'lucide-react';

/**
 * InteractiveRadarMap — Stylized SVG Architectural Constellation Radar
 * Displays the geographical growth triangle of Saudi Arabia: Riyadh, Jeddah, Al Khobar
 */
export default function InteractiveRadarMap({ activeCity, onSelectCity }) {
  const [hoveredNode, setHoveredNode] = useState(null);

  const nodes = [
    {
      id: 0,
      name: 'Riyadh',
      arabic: 'الرياض',
      tag: 'Capital Financial Hub',
      coords: '24°42′N 46°40′E',
      x: 340,
      y: 190,
      stat: '+11.2% YoY',
      statLabel: 'Capital Growth',
      elevation: '612m ASL',
      distanceToJeddah: '850 km',
      distanceToKhobar: '410 km'
    },
    {
      id: 1,
      name: 'Jeddah',
      arabic: 'جدة',
      tag: 'Red Sea Coastal Gateway',
      coords: '21°32′N 39°10′E',
      x: 170,
      y: 280,
      stat: '6.8% Net',
      statLabel: 'Waterfront Yield',
      elevation: '12m ASL',
      distanceToRiyadh: '850 km',
      distanceToKhobar: '1,240 km'
    },
    {
      id: 2,
      name: 'Al Khobar',
      arabic: 'الخبر',
      tag: 'Eastern Energy Corridor',
      coords: '26°17′N 50°12′E',
      x: 480,
      y: 155,
      stat: '94% Occ.',
      statLabel: 'Executive Tenancy',
      elevation: '8m ASL',
      distanceToRiyadh: '410 km',
      distanceToJeddah: '1,240 km'
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
              Geographic Constellation Radar
            </h3>
            <p className="text-[10px] font-mono text-[#8A8578] uppercase tracking-wider">
              Autonomous Growth Triangle Telemetry
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
          <defs>
            {/* Linear gradient for triangle lines */}
            <linearGradient id="triangleBeam" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#B8913A" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#D4A853" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#B8913A" stopOpacity="0.8" />
            </linearGradient>

            {/* Radar scanner sweep gradient */}
            <radialGradient id="radarGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#D4A853" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#D4A853" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Concentric radar range rings centered around Riyadh */}
          <circle cx="340" cy="190" r="70" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" strokeDasharray="3 3" />
          <circle cx="340" cy="190" r="140" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" strokeDasharray="4 4" />
          <circle cx="340" cy="190" r="220" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" strokeDasharray="6 6" />

          {/* Connecting Triangle Geometry */}
          {/* Riyadh to Jeddah */}
          <line 
            x1="340" y1="190" 
            x2="170" y2="280" 
            stroke="rgba(184, 145, 58, 0.35)" 
            strokeWidth="1.5" 
            strokeDasharray="5 5"
            className="circuit-line"
          />
          {/* Riyadh to Al Khobar */}
          <line 
            x1="340" y1="190" 
            x2="480" y2="155" 
            stroke="rgba(184, 145, 58, 0.35)" 
            strokeWidth="1.5" 
            strokeDasharray="5 5"
            className="circuit-line"
          />
          {/* Jeddah to Al Khobar (base) */}
          <line 
            x1="170" y1="280" 
            x2="480" y2="155" 
            stroke="rgba(184, 145, 58, 0.20)" 
            strokeWidth="1" 
            strokeDasharray="6 6"
          />

          {/* Distance Labels */}
          <text x="240" y="245" fill="#8A8578" fontSize="9" fontFamily="monospace" textAnchor="middle">850 KM</text>
          <text x="415" y="165" fill="#8A8578" fontSize="9" fontFamily="monospace" textAnchor="middle">410 KM</text>

          {/* Interactive Nodes */}
          {nodes.map((node) => {
            const isSelected = activeCity === node.id;
            const isHovered = hoveredNode === node.id;

            return (
              <g 
                key={node.id} 
                className="cursor-pointer group"
                onClick={() => onSelectCity(node.id)}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
              >
                {/* Sonar Pulse Ring */}
                {isSelected && (
                  <circle 
                    cx={node.x} 
                    cy={node.y} 
                    r="24" 
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
                  r={isSelected ? "16" : "12"} 
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
                  y={node.y - 20} 
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
                  y={node.y + 26} 
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
        <div className="absolute bottom-2 left-2 right-2 sm:right-auto sm:w-80 glass-card-dark p-3.5 rounded-xl border border-[rgba(255,255,255,0.12)] space-y-1.5 shadow-xl animate-in fade-in">
          <div className="flex items-center justify-between">
            <span className="font-serif font-bold text-sm text-[#E8E3DC]">{current.name} Corridor</span>
            <span className="text-[10px] font-mono text-[#D4A853]">{current.stat}</span>
          </div>
          <p className="text-[11px] text-[#8A8578] leading-tight">{current.tag}</p>
          <div className="flex items-center justify-between pt-1 border-t border-[rgba(255,255,255,0.06)] text-[9.5px] font-mono text-white/50">
            <span>Elevation: {current.elevation}</span>
            <span>Click node to inspect</span>
          </div>
        </div>

      </div>

    </div>
  );
}
