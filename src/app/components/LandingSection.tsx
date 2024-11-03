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
      className="h-screen flex items-center justify-center bg-gradient bg-gradient-to-r from-blue-500 to-green-500 text-white text-4xl component"
    >
      <div className="blur-effect p-8">
        <h1>Welcome to My Year in Review</h1>
      </div>
    </section>
  );
}