import React, { useEffect, useRef, useState } from 'react';

/**
 * ScrollReveal component
 * Provides subtle, purposeful scroll-triggered reveals using IntersectionObserver.
 * Respects prefers-reduced-motion settings.
 */
export default function ScrollReveal({
  children,
  animation = 'fade-up', // 'fade-up' | 'fade-in' | 'fade-down' | 'fade-left' | 'fade-right' | 'scale-up'
  delay = 0,             // Delay in milliseconds
  duration = 600,        // Duration in milliseconds
  threshold = 0.12,      // Intersection observer threshold
  className = '',
  cascade = false        // Whether to automatically stagger direct children
}) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Once revealed, unobserve to keep performance high
          if (elementRef.current) {
            observer.unobserve(elementRef.current);
          }
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    const currentEl = elementRef.current;
    if (currentEl) {
      observer.observe(currentEl);
    }

    return () => {
      if (currentEl) {
        observer.unobserve(currentEl);
      }
    };
  }, [threshold]);

  const getInitialStyle = () => {
    switch (animation) {
      case 'fade-up':
        return 'translate-y-7 opacity-0';
      case 'fade-down':
        return '-translate-y-7 opacity-0';
      case 'fade-left':
        return 'translate-x-7 opacity-0';
      case 'fade-right':
        return '-translate-x-7 opacity-0';
      case 'scale-up':
        return 'scale-[0.96] opacity-0';
      case 'fade-in':
      default:
        return 'opacity-0';
    }
  };

  const visibleStyle = 'translate-y-0 translate-x-0 scale-100 opacity-100';

  return (
    <div
      ref={elementRef}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        willChange: isVisible ? 'auto' : 'transform, opacity'
      }}
      className={`transition-all ${
        isVisible ? visibleStyle : getInitialStyle()
      } ${className}`}
    >
      {children}
    </div>
  );
}
