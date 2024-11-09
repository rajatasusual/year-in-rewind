"use client";

// src/app/components/EmbeddedGame.tsx
export default function EmbeddedGame() {
  return (
    <section >
      <h2>Few Games I Created</h2>
      <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-4">
        <div className="bg-black rounded-lg overflow-hidden">
          <iframe
            src="https://rajatasusual.github.io/z-game"
            title="Embedded Game"
            className="w-full h-[640px] aspect-video"
          ></iframe>
        </div>
        <div className="bg-black rounded-lg overflow-hidden">
          <iframe
            src="https://rajatasusual.github.io/gemini-mud"
            title="Embedded Game"
            className="w-full h-[640px] aspect-video"
          ></iframe>
        </div>
      </div>
    </section>
  );
}