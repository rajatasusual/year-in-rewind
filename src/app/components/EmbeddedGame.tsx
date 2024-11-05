"use client";

// src/app/components/EmbeddedGame.tsx
export default function EmbeddedGame() {
  return (
    <section >
      <h2>Few Games I Created</h2>
      <div>
        <iframe
          src="https://rajatasusual.github.io/z-game"
          title="Embedded Game"
        ></iframe>
        <iframe
          src="https://rajatasusual.github.io/gemini-mud"
          title="Embedded Game"
        ></iframe>
      </div>
    </section>
  );
}