"use client";

// src/app/components/ContactForm.tsx
export default function ContactForm() {
  return (
    <section>
      <h2>Contact Me</h2>
      <form className="contact-form" method="POST" data-netlify="true">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          className="contact-input"
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          className="contact-input"
        />
        <textarea
          name="message"
          placeholder="Your Message"
          className="contact-input"
        ></textarea>
        <button type="submit">
          Send
        </button>
      </form>
    </section>
  );
}