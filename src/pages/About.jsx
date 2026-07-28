import SEO from "../seo/SEO";

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
      <SEO
        title="About Infinity AI Cloud Academy"
        description="Learn about Infinity AI Cloud Academy, our mission, vision, expert mentors, industry-focused curriculum, real-world projects, career support, and our commitment to building successful Data Engineers, AI Engineers, and Cloud Professionals."
        keywords={[
          "About Infinity AI Cloud Academy",
          "AI Training Institute",
          "Data Engineering Academy",
          "Cloud Computing Training",
          "Generative AI Training",
          "Industry Expert Trainers",
          "Career Support",
          "Placement Assistance",
          "Python Training",
          "SQL Training",
          "PySpark Training",
          "Google Cloud Training",
          "AWS Training",
          "Data Engineering Bootcamp",
          "AI Learning Platform",
        ]}
        url="https://infinityaicloudacademy.com/about"
      />

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