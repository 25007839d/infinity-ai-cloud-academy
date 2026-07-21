import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

import RoadmapHero from "../components/roadmaps/RoadmapHero";
import RoadmapCard from "../components/roadmaps/RoadmapCard";

import { roadmaps } from "../data/roadmaps";

export default function Roadmaps() {
  return (
    <>
      <Navbar />

      <main className="bg-[#030712] text-white">

        <div className="max-w-7xl mx-auto px-6">

          <RoadmapHero />

          <div className="grid lg:grid-cols-2 gap-10 pb-24">

            {roadmaps.map((roadmap) => (
              <RoadmapCard
                key={roadmap.id}
                roadmap={roadmap}
              />
            ))}

          </div>

        </div>

      </main>

      <Footer />
    </>
  );
}