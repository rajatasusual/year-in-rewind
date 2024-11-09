// src/app/components/LandingSection.tsx
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { FaArrowDown } from 'react-icons/fa';

export default function LandingSection() {
  const landingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (landingRef.current) {
      gsap.fromTo(landingRef.current, { opacity: 0 }, { opacity: 1, duration: 2 });
    }
  }, []);

  return (
    <section ref={landingRef} className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-blue-500 to-purple-700 text-white">
      <h1 className="text-5xl font-bold mb-6">Welcome to My Year in Review</h1>
      <p className="text-lg opacity-80">Scroll to explore my journey</p>
      <FaArrowDown className="scroll-arrow" />
    </section>
  );
}