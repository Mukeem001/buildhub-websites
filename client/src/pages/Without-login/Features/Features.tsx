import Hero from "./components/Hero";
import FeatureGrid from "./components/FeatureGrid";
import WhyChooseUs from "./components/WhyChooseUs";
import WebsiteCategories from "./components/WebsiteCategories";
import AdvancedFeatures from "./components/AdvancedFeatures";
import Workflow from "./components/Workflow";
import Integrations from "./components/Integrations";
import Security from "./components/Security";
import Testimonials from "./components/Testimonials";
import FAQ from "./components/FAQ";
import CTA from "./components/CTA";

export default function Features() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#050816] text-white">

      {/* Hero Section */}
      <Hero />

      {/* Core Features */}
      <FeatureGrid />

      {/* Why Choose BuildHub */}
      <WhyChooseUs />

      {/* Website Categories */}
      <WebsiteCategories />

      {/* Advanced Platform Features */}
      <AdvancedFeatures />

      {/* Workflow */}
      <Workflow />

      {/* Integrations */}
      <Integrations />

      {/* Security */}
      <Security />

      {/* Customer Reviews */}
      <Testimonials />

      {/* Frequently Asked Questions */}
      <FAQ />

      {/* Final CTA */}
      <CTA />

    </main>
  );
}