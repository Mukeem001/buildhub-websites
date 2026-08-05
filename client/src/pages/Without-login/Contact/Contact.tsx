import React from "react";

import ContactHero from "./components/ContactHero";
import ContactInfo from "./components/ContactInfo";
import ContactForm from "./components/ContactForm";

const Contact: React.FC = () => {
  return (
    <main className="min-h-screen bg-[#020617] text-white">
      <ContactHero />

      <section className="relative overflow-hidden bg-[#020617] px-6 py-20 sm:px-8 sm:py-24">
        <div className="pointer-events-none absolute right-0 top-1/3 h-[400px] w-[400px] rounded-full bg-blue-600/5 blur-[120px]" />

        <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_1.05fr] lg:items-start">
          <ContactInfo />

          <ContactForm />
        </div>
      </section>
    </main>
  );
};

export default Contact;