import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

import CourseHero from "../components/courses/CourseHero";
import CourseGrid from "../components/courses/CourseGrid";

export default function Courses() {
  return (
    <>
      <Navbar />

      <main className="bg-[#030712] text-white">

        <CourseHero />

        <CourseGrid />

      </main>

      <Footer />
    </>
  );
}