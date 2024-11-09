// src/app/page.tsx
"use client";

import LandingSection from './components/LandingSection';
import MediumArticles from './components/MediumArticles';
import GitHubContributions from './components/GithubContributions';
import FocusProjects from './components/FocusProjects';
import EmbeddedGame from './components/EmbeddedGame';
import ContactForm from './components/ContactForm';
import ParticleBackground from './helpers/ParticleBackground';

export default function Home() {
  return (
    
    <div className="snap-mandatory snap-y snap-center h-screen overflow-y-scroll">
      <ParticleBackground />
      <div id="landing-section" className="snap-center component h-screen">
        <LandingSection />
      </div>
      <div id="medium-articles" className="snap-center component h-screen">
        <MediumArticles />
      </div>
      <div id="github-contributions" className="snap-center component h-screen">
        <GitHubContributions />
      </div>
      <div id="focus-projects" className="snap-center component h-screen">
        <FocusProjects />
      </div>
      <div id="embedded-game" className="snap-center component h-screen">
        <EmbeddedGame />
      </div>
      <div id="contact-form" className="snap-center component h-screen">
        <ContactForm />
      </div>
    </div>
  );
}