// src/app/components/LandingSection.tsx
import { FaArrowDown } from 'react-icons/fa';

export default function LandingSection() {
  
  return (
    <section>
      <h1>Welcome to My Year in Review</h1>
      <p>Scroll to explore my journey</p>
      <FaArrowDown className="scroll-arrow animate-bounce" />
    </section>
  );
}