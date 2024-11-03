"use client";

// src/app/components/ContactForm.tsx
export default function ContactForm() {
  return (
    <section className="p-8 component bg-gradient">
      <h2 className="text-3xl mb-4">Contact Me</h2>
      <form className="bg-white shadow-md p-6 blur-effect space-y-4" method="POST" data-netlify="true">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          className="w-full p-2 border"
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          className="w-full p-2 border"
        />
        <textarea
          name="message"
          placeholder="Your Message"
          className="w-full p-2 border"
        ></textarea>
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white">
          Send
        </button>
      </form>
    </section>
  );
}