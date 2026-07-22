import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

import AboutHero from "../components/about/AboutHero";
import OurStory from "../components/about/OurStory";
import WhyInfinity from "../components/about/WhyInfinity";
import MissionVision from "../components/about/MissionVision";
import TrainingProcess from "../components/about/TrainingProcess";
import TechnologyStack from "../components/about/TechnologyStack";
import CareerOutcomes from "../components/about/CareerOutcomes";
import StudentBenefits from "../components/about/StudentBenefits";
import AboutCTA from "../components/about/AboutCTA";



export default function About() {
  return (
    <>
      <Navbar />

      <main className="bg-[#030712] text-white">

        <AboutHero />

        <OurStory />

        <WhyInfinity />

        <MissionVision />

        <TrainingProcess />

        <TechnologyStack />

        <CareerOutcomes />

        <StudentBenefits />

        <AboutCTA />


      </main>

      <Footer />
    </>
  );
}