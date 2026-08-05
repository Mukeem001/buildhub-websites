import React from "react";

import AboutHero from "./components/AboutHero";
import OurStory from "./components/OurStory";
import Mission from "./components/Mission";
import Stats from "./components/Stats";
import WhyBuildHub from "./components/WhyBuildHub";
import Vision from "./components/Vision";
import AboutCTA from "./components/AboutCTA";

const About: React.FC = () => {
  return (
    <main className="min-h-screen bg-[#020617] text-white">
      {/* Hero */}
      <AboutHero />

      {/* Our Story */}
      <OurStory />

      {/* Mission */}
      <Mission />

      {/* Stats */}
      <Stats />

      {/* Why BuildHub */}
      <WhyBuildHub />

      {/* Vision */}
      <Vision />

      {/* CTA */}
      <AboutCTA />
    </main>
  );
};

export default About;