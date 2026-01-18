import Hero from "../components/Home/Hero.js";
import Features from "../components/Home/Features.js";
import CTA from "../components/Home/CTA.js";

const Home = () => {
  return (
    <div className="min-h-screen bg-linear-to-b from-blue-50 to-white">
      <Hero />
      <Features />
      <CTA />
    </div>
  );
};

export default Home;
