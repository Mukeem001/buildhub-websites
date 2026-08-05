import { useState } from "react";

import Hero from "./components/Hero";
import PricingToggle from "./components/PricingToggle";
import PricingCards from "./components/PricingCards";
import FeatureComparison from "./components/FeatureComparison";
import IncludedFeatures from "./components/IncludedFeatures";
import EnterprisePlan from "./components/EnterprisePlan";
import PricingFAQ from "./components/PricingFAQ";

export default function Pricing() {
  // Billing State
  const [yearly, setYearly] = useState(false);

  const handleToggle = () => {
    setYearly((prev) => !prev);
  };

  return (
    <main className="min-h-screen bg-[#050816] text-white">

      {/* Hero */}

      <Hero />

      {/* Monthly / Yearly Toggle */}

      <PricingToggle
        yearly={yearly}
        onToggle={handleToggle}
      />

      {/* Pricing Cards */}

      <PricingCards
        yearly={yearly}
      />

      {/* Feature Comparison */}

      <FeatureComparison />

      {/* Included Features */}

      <IncludedFeatures />

            {/* Enterprise Plan */}

      <EnterprisePlan />

      {/* FAQ */}

      <PricingFAQ />

    </main>
  );
}