"use client";

// src/app/components/FocusProjects.tsx
import { useEffect } from 'react';
import { gsap } from 'gsap';

export default function FocusProjects() {
  useEffect(() => {
    gsap.fromTo('.project-card', { opacity: 0 }, { opacity: 1, stagger: 0.2, duration: 1 });
  }, []);

  return (
    <section className="p-8 component bg-gradient">
      <h2 className="text-3xl mb-4">Projects in Focus</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="project-card bg-white shadow-md p-4 blur-effect">Project 1</div>
        <div className="project-card bg-white shadow-md p-4 blur-effect">Project 2</div>
      </div>
    </section>
  );
}