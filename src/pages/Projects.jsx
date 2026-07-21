import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

import ProjectHero from "../components/projects/ProjectHero";
import ProjectCard from "../components/projects/ProjectCard";

import { projects } from "../data/projects";

export default function Projects() {
  return (
    <>
      <Navbar />

      <main className="bg-[#030712] text-white">

        <div className="max-w-7xl mx-auto px-6">

          <ProjectHero />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 pb-24">

            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
              />
            ))}

          </div>

        </div>

      </main>

      <Footer />
    </>
  );
}