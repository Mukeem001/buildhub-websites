import CTA from "@/components/home/CTA";
import FAQ from "@/components/home/FAQ";
import Features from "@/components/home/Features";
import Hero from "@/components/home/Hero";
import HowItWorks from "@/components/home/HowItWorks";
import Pricing from "@/components/home/Pricing";
import Stats from "@/components/home/Stats";
import Templates from "@/components/home/Templates";
import Testimonials from "@/components/home/Testimonials";



const Home = () => {
  return (
    <>
    
      <Hero />
     
      <Features/>
      <Templates/>
      <Stats/>
      <HowItWorks/>
      <Pricing/>
      <Testimonials/>
      <FAQ/>
      <CTA/>
     
    </>
  );
};

export default Home;