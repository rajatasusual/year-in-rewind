// src/app/page.tsx
"use client";

import LandingSection from './components/LandingSection';
import MediumArticles from './components/MediumArticles';
import GitHubContributions from './components/GithubContributions';
import FocusProjects from './components/FocusProjects';
import EmbeddedGame from './components/EmbeddedGame';
import ContactForm from './components/ContactForm';
import { useEffect, useState } from 'react';
import ParticleBackground from './helpers/ParticleBackground';

export default function Home() {
  const [visibleComponents, setVisibleComponents] = useState<string[]>(['landing-section']);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const nextSectionId = entry.target.getAttribute('data-next');
            if (nextSectionId) {
              setVisibleComponents((prev) => [...new Set([...prev, nextSectionId])]);
              observer.unobserve(entry.target);
            }
          }
        });
      },
      { rootMargin: '0px', threshold: 0.8 } // Adjusted threshold
    );

    // Observe each component's section once it’s in the DOM
    visibleComponents.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [visibleComponents]);

  return (
    
    <div className="text-gray-800">
       <ParticleBackground />
      <div id="landing-section" data-next="medium-articles" className="component">
        <LandingSection />
      </div>
      {visibleComponents.includes('medium-articles') && (
        <div id="medium-articles" data-next="github-contributions" className="component">
          <MediumArticles />
        </div>
      )}
      {visibleComponents.includes('github-contributions') && (
        <div id="github-contributions" data-next="focus-projects" className="component">
          <GitHubContributions />
        </div>
      )}
      {visibleComponents.includes('focus-projects') && (
        <div id="focus-projects" data-next="embedded-game" className="component">
          <FocusProjects />
        </div>
      )}
      {visibleComponents.includes('embedded-game') && (
        <div id="embedded-game" data-next="contact-form" className="component">
          <EmbeddedGame />
        </div>
      )}
      {visibleComponents.includes('contact-form') && (
        <div id="contact-form" className="component">
          <ContactForm />
        </div>
      )}
    </div>
  );
}