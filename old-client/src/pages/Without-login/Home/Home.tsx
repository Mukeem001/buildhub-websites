
import Hero from "./component/Hero";
import Features from "./component/Features";
import Templates from "./component/Templates";
import Stats from "./component/Stats";
import HowItWorks from "./component/HowItWorks";
import Pricing from "./component/Pricing";
import Testimonials from "./component/Testimonials";
import FAQ from "./component/FAQ";
import CTA from "./component/CTA";


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