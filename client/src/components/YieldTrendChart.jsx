import React, { useState } from 'react';
import { TrendingUp, BarChart3, Calendar, Layers, ShieldCheck } from 'lucide-react';

export default function YieldTrendChart() {
  const [activeMetric, setActiveMetric] = useState('appreciation');
  const [hoveredPoint, setHoveredPoint] = useState(null);

  const metrics = {
    appreciation: {
      title: 'Capital Appreciation Trajectory',
      unit: '% Cumulative',
      data: [
        { year: '2021', riyadh: 100, jeddah: 100, dubai: 100, label: 'Base Year 100' },
        { year: '2022', riyadh: 112, jeddah: 107, dubai: 110, label: '+12% Riyadh' },
        { year: '2023', riyadh: 126, jeddah: 115, dubai: 122, label: '+26% Riyadh' },
        { year: '2024', riyadh: 142, jeddah: 124, dubai: 135, label: '+42% Riyadh' },
        { year: '2025', riyadh: 158, jeddah: 132, dubai: 148, label: '+58% Riyadh' },
        { year: '2026', riyadh: 172, jeddah: 141, dubai: 162, label: '+72% Riyadh Peak' }
      ]
    },
    yield: {
      title: 'Net Unlevered Yield Spread',
      unit: '% Net',
      data: [
        { year: '2021', riyadh: 6.2, jeddah: 5.9, dubai: 6.8, label: '6.2% Avg' },
        { year: '2022', riyadh: 6.5, jeddah: 6.1, dubai: 7.1, label: '6.5% Avg' },
        { year: '2023', riyadh: 6.8, jeddah: 6.4, dubai: 7.4, label: '6.8% Avg' },
        { year: '2024', riyadh: 7.1, jeddah: 6.6, dubai: 7.7, label: '7.1% Avg' },
        { year: '2025', riyadh: 7.3, jeddah: 6.7, dubai: 7.9, label: '7.3% Avg' },
        { year: '2026', riyadh: 7.6, jeddah: 6.8, dubai: 8.2, label: '7.6% Avg Target' }
      ]
    }
  };

  const currentMetric = metrics[activeMetric];
  const points = currentMetric.data;

  // Compute SVG coordinates
  const width = 640;
  const height = 260;
  const paddingX = 50;
  const paddingY = 40;

  const minVal = Math.min(...points.map(p => Math.min(p.riyadh, p.jeddah, p.dubai))) * 0.95;
  const maxVal = Math.max(...points.map(p => Math.max(p.riyadh, p.jeddah, p.dubai))) * 1.05;

  const getX = (index) => paddingX + (index / (points.length - 1)) * (width - paddingX * 2);
  const getY = (val) => height - paddingY - ((val - minVal) / (maxVal - minVal)) * (height - paddingY * 2);

  // Generate smooth SVG path
  const generatePath = (key) => {
    return points.reduce((acc, point, i) => {
      const x = getX(i);
      const y = getY(point[key]);
      if (i === 0) return `M ${x} ${y}`;
      const prevX = getX(i - 1);
      const prevY = getY(points[i - 1][key]);
      const cpX1 = prevX + (x - prevX) / 2;
      const cpX2 = prevX + (x - prevX) / 2;
      return `${acc} C ${cpX1} ${prevY}, ${cpX2} ${y}, ${x} ${y}`;
    }, '');
  };

  const riyadhPath = generatePath('riyadh');
  const jeddahPath = generatePath('jeddah');
  const dubaiPath = generatePath('dubai');

  return (
    <div className="bg-[#121210] border border-[rgba(255,255,255,0.08)] rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#B8913A]/5 blur-[90px] rounded-full pointer-events-none" />

      {/* Header and Toggle Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[rgba(255,255,255,0.08)] pb-5 mb-6 relative z-10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="h-2 w-2 rounded-full bg-[#D4A853] animate-ping" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#D4A853]">
              Market Yield Intelligence
            </span>
          </div>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#E8E3DC]">
            {currentMetric.title}
          </h3>
        </div>

        {/* Metric Switcher */}
        <div className="flex items-center gap-1 p-1 bg-[#1A1A18] rounded-xl border border-[rgba(255,255,255,0.08)] self-start sm:self-auto">
          <button
            onClick={() => setActiveMetric('appreciation')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeMetric === 'appreciation'
                ? 'bg-[#B8913A] text-[#FAF7F2] shadow-sm'
                : 'text-[#8A8578] hover:text-white'
            }`}
          >
            Capital Growth
          </button>
          <button
            onClick={() => setActiveMetric('yield')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeMetric === 'yield'
                ? 'bg-[#B8913A] text-[#FAF7F2] shadow-sm'
                : 'text-[#8A8578] hover:text-white'
            }`}
          >
            Net Yield %
          </button>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-6 mb-4 text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#D4A853]" />
          <span className="text-[#E8E3DC] font-semibold">Riyadh Prime (+72%)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
          <span className="text-white/70">Dubai Luxury (+62%)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#8A6C2A]" />
          <span className="text-white/60">Jeddah Coastal (+41%)</span>
        </div>
      </div>

      {/* SVG Bezier Spline Chart */}
      <div className="relative w-full aspect-[16/7] max-h-[300px]">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-full overflow-visible"
        >
          <defs>
            <linearGradient id="riyadhGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#D4A853" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#D4A853" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Horizontal Gridlines */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => {
            const y = paddingY + ratio * (height - paddingY * 2);
            return (
              <line
                key={i}
                x1={paddingX}
                y1={y}
                x2={width - paddingX}
                y2={y}
                stroke="rgba(255,255,255,0.05)"
                strokeDasharray="4 4"
              />
            );
          })}

          {/* Area Fill for Riyadh Top Curve */}
          <path
            d={`${riyadhPath} L ${getX(points.length - 1)} ${height - paddingY} L ${getX(0)} ${height - paddingY} Z`}
            fill="url(#riyadhGradient)"
          />

          {/* Curves */}
          <path d={dubaiPath} fill="none" stroke="#34D399" strokeWidth="2" strokeDasharray="3 3" />
          <path d={jeddahPath} fill="none" stroke="#8A6C2A" strokeWidth="2.5" />
          <path d={riyadhPath} fill="none" stroke="#D4A853" strokeWidth="3" className="transition-all duration-700" />

          {/* Data Nodes for Riyadh with Hover Hit Areas */}
          {points.map((p, idx) => {
            const cx = getX(idx);
            const cy = getY(p.riyadh);
            const isHovered = hoveredPoint === idx;

            return (
              <g 
                key={idx}
                className="cursor-pointer"
                onMouseEnter={() => setHoveredPoint(idx)}
                onMouseLeave={() => setHoveredPoint(null)}
              >
                {/* Year Label */}
                <text
                  x={cx}
                  y={height - 14}
                  fill="#8A8578"
                  fontSize="10"
                  fontFamily="monospace"
                  textAnchor="middle"
                >
                  {p.year}
                </text>

                {/* Point Halo on Hover */}
                {isHovered && (
                  <circle cx={cx} cy={cy} r="14" fill="rgba(184, 145, 58, 0.3)" className="animate-ping" />
                )}

                {/* Interactive Node Point */}
                <circle
                  cx={cx}
                  cy={cy}
                  r={isHovered ? "6" : "4"}
                  fill="#D4A853"
                  stroke="#141412"
                  strokeWidth="2"
                  className="transition-all duration-200"
                />

                {/* Tooltip on Active Point */}
                {isHovered && (
                  <g>
                    <rect
                      x={cx - 45}
                      y={cy - 34}
                      width="90"
                      height="24"
                      rx="6"
                      fill="#0C0C0A"
                      stroke="#B8913A"
                      strokeWidth="1"
                    />
                    <text
                      x={cx}
                      y={cy - 18}
                      fill="#D4A853"
                      fontSize="10.5"
                      fontFamily="monospace"
                      fontWeight="bold"
                      textAnchor="middle"
                    >
                      {p.riyadh}{activeMetric === 'appreciation' ? ' pts' : '%'}
                    </text>
                  </g>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Bottom Transparency Note */}
      <div className="pt-4 border-t border-[rgba(255,255,255,0.06)] flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] font-mono text-[#8A8578]">
        <span>Sadu Real Estate Development — Multi-Market Index</span>
        <span className="text-[#D4A853]">Interactive Telemetry</span>
      </div>

    </div>
  );
}
