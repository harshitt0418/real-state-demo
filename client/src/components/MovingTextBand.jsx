import React from 'react';

/**
 * MovingTextBand — horizontal scrolling text strip.
 * Props:
 *   items: string[]     — text items to repeat
 *   reverse?: boolean   — scroll direction
 *   dark?: boolean      — dark background variant
 *   speed?: 'slow' | 'normal' | 'fast'
 *   separator?: string  — character between items (default '/')
 *   className?: string
 */
export default function MovingTextBand({
  items = ['FIDUCIARY ADVISORY', 'DIRECT DEVELOPER CHANNEL', 'VERIFIED TITLES', 'CURATED CAPITAL'],
  reverse = false,
  dark = false,
  speed = 'normal',
  separator = '/',
  className = ''
}) {
  const duration = speed === 'slow' ? '38s' : speed === 'fast' ? '18s' : '28s';

  // Double the items so it loops seamlessly
  const doubled = [...items, ...items];

  return (
    <div
      className={`overflow-hidden select-none py-4 ${
        dark
          ? 'bg-[#141412] border-y border-[rgba(255,255,255,0.06)]'
          : 'bg-[#F0EBE1] border-y border-[rgba(15,15,14,0.08)]'
      } ${className}`}
    >
      <div
        className={reverse ? 'text-band-track-reverse flex whitespace-nowrap' : 'text-band-track flex whitespace-nowrap'}
        style={{ animationDuration: duration }}
      >
        {doubled.map((item, i) => (
          <React.Fragment key={i}>
            <span
              className={`font-sans text-[11px] font-bold tracking-[0.22em] uppercase px-8 ${
                dark ? 'text-[#5A5A52]' : 'text-[#8A8A75]'
              }`}
            >
              {item}
            </span>
            <span
              className={`font-serif text-sm px-4 ${
                dark ? 'text-[#B8913A]/50' : 'text-[#B8913A]/60'
              }`}
              aria-hidden="true"
            >
              {separator}
            </span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
