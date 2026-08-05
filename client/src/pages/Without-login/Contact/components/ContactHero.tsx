import React from "react";
import { ArrowDown, MessageCircle } from "lucide-react";

const ContactHero: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-[#020617] px-6 pb-20 pt-16 sm:px-8 sm:pb-24 sm:pt-20 lg:pt-24">
      {/* Background glow */}
      <div className="pointer-events-none absolute left-1/2 top-20 h-[420px] w-[700px] -translate-x-1/2 rounded-full bg-blue-600/10 blur-[130px]" />

      <div className="relative mx-auto max-w-5xl text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/5 px-4 py-2 text-xs font-medium text-blue-400">
          <MessageCircle className="h-3.5 w-3.5" />
          Get In Touch
        </div>

        {/* Heading */}
        <h1 className="mx-auto mt-7 max-w-4xl text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl">
          We'd Love To
          <span className="block bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500 bg-clip-text text-transparent">
            Hear From You
          </span>
        </h1>

        {/* Description */}
        <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
          Have a question, need help, or want to learn more about BuildHub?
          Our team is here to help you build and launch your website with
          confidence.
        </p>

        {/* Scroll indicator */}
        <div className="mt-10 flex justify-center">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-700 bg-slate-900/60 text-slate-400">
            <ArrowDown className="h-4 w-4 animate-bounce" />
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent" />
    </section>
  );
};

export default ContactHero;