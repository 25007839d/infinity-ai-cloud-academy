import Navbar from "../components/layout/Navbar";
import Hero from "../components/Home/Hero";
import TrustedTech from "../components/Home/TrustedTech";
import FeaturedCourses from "../components/Home/FeaturedCourses";
import Footer from "../components/Home/Footer";
import Roadmaps from "../components/Home/Roadmaps";
import Projects from "../components/Home/Projects";
import WhyInfinity from "../components/Home/WhyInfinity";
import Journey from "../components/Home/Journey";
import CareerSupport from "../components/Home/CareerSupport";
import Testimonials from "../components/Home/Testimonials";
import CTA from "../components/Home/CTA";

export default function Home() {
  return (
    <div className="bg-[#030712] text-white overflow-x-hidden">

      <Navbar />

      <Hero />

      <TrustedTech />

      <FeaturedCourses />

      <Roadmaps />

      <Projects />

      <WhyInfinity />

      <Journey />

      <CareerSupport />

      <Testimonials />

      <CTA />

      <Footer />

    </div>
  );
}