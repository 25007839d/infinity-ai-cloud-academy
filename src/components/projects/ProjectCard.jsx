import TechBadge from "./TechBadge";

export default function ProjectCard({ project }) {
  return (
    <div className="rounded-3xl overflow-hidden border border-slate-800 bg-slate-900 hover:border-cyan-500 transition">

      <div className="h-52 bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center text-6xl">
        🚀
      </div>

      <div className="p-6">

        <div className="flex justify-between">

          <span className="text-cyan-400">
            {project.category}
          </span>

          <span className="text-sm text-slate-400">
            {project.level}
          </span>

        </div>

        <h2 className="mt-4 text-2xl font-bold">
          {project.title}
        </h2>

        <p className="mt-4 text-slate-400">
          {project.description}
        </p>

        <div className="mt-6 flex flex-wrap gap-2">

          {project.technologies.map((tech) => (
            <TechBadge key={tech} tech={tech} />
          ))}

        </div>

        <div className="mt-8 flex gap-4">

          <div className="mt-8 flex gap-4">

  <a
    href={project.demo}
    target="_blank"
    rel="noopener noreferrer"
                className="rounded-xl bg-blue-600 px-5 py-3 hover:bg-blue-700 transition"
              >
                View Project
              </a>

              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border border-blue-500 px-5 py-3 hover:bg-blue-500 transition"
              >
                GitHub
              </a>

            </div>

        </div>

      </div>

    </div>
  );
}