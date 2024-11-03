"use client";

// src/app/components/EmbeddedGame.tsx
export default function EmbeddedGame() {
  return (
    <section className="p-8 component bg-gradient">
      <h2 className="text-3xl mb-4">Z</h2>
      <div className="blur-effect p-4">
        <iframe
          src="https://rajatasusual.github.io/z-game"
          className="w-full h-screen"
          title="Embedded Game"
        ></iframe>
      </div>
    </section>
  );
}