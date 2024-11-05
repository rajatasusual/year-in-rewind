"use client";

// src/app/components/LandingSection.tsx
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function LandingSection() {
  const landingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (landingRef.current) {
      gsap.fromTo(landingRef.current, { opacity: 0 }, { opacity: 1, duration: 2 });
    }
  }, []);

  return (
    <section
      ref={landingRef}
    >
      <div>
        <h1>Welcome to My Year in Review</h1>
      </div>
    </section>
  );
}