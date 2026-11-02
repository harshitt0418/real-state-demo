import React, { useEffect, useRef, useState } from 'react';

/**
 * Enhanced ScrollReveal using IntersectionObserver.
 * Supports: fade-up, fade-down, fade-left, fade-right, fade, scale-up, clip-reveal
 */
export default function ScrollReveal({
  children,
  animation = 'fade-up',
  delay = 0,
  duration = 700,
  threshold = 0.12,
  className = '',
  once = true,
}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setIsVisible(true);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.unobserve(el);
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [once, threshold]);

  const classMap = {
    'fade-up':    'reveal-init',
    'fade-down':  'reveal-fade', // handled via inline
    'fade-left':  'reveal-left',
    'fade-right': 'reveal-right',
    'fade':       'reveal-fade',
    'scale-up':   'reveal-scale',
    'clip':       'img-reveal-mask',
  };

  const baseClass = classMap[animation] || 'reveal-init';
  const visibleClass = isVisible ? 'is-visible' : '';

  // For fade-down we do it inline
  let inlineStyle = {
    transitionDelay: `${delay}ms`,
    transitionDuration: `${duration}ms`,
  };

  if (animation === 'fade-down') {
    inlineStyle = {
      ...inlineStyle,
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(-28px)',
      transition: `opacity ${duration}ms cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform ${duration}ms cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
    };
    return (
      <div ref={ref} className={className} style={inlineStyle}>
        {children}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={`${baseClass} ${visibleClass} ${className}`}
      style={inlineStyle}
    >
      {children}
    </div>
  );
}
