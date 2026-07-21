import { Link } from "react-router-dom";

export default function CourseCard({ course }) {
  return (
    <div className="group rounded-2xl border border-slate-800 bg-slate-900/70 p-6 transition-all duration-300 hover:-translate-y-2 hover:border-cyan-400 hover:shadow-2xl hover:shadow-cyan-500/10">

      {/* Category */}
      <span className="inline-block rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-400">
        {course.category}
      </span>

      {/* Title */}
      <h3 className="mt-4 text-2xl font-bold text-white">
        {course.title}
      </h3>

      {/* Description */}
      <p className="mt-3 text-sm leading-6 text-slate-400">
        {course.shortDescription}
      </p>

      {/* Stats */}
      <div className="mt-6 space-y-2 text-sm text-slate-300">
        <div>📅 {course.duration}</div>
        <div>🎯 {course.level}</div>
        <div>⭐ {course.rating} Rating</div>
        <div>📂 {course.projects} Projects</div>
      </div>

      {/* Technologies */}
      <div className="mt-6 flex flex-wrap gap-2">
        {course.technologies.slice(0, 5).map((tech) => (
          <span
            key={tech}
            className="rounded-full bg-slate-800 px-3 py-1 text-xs text-cyan-300"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Buttons */}
      <div className="mt-8 flex gap-3">
        <Link
          to={`/courses/${course.slug}`}
          className="flex-1 rounded-xl border border-cyan-500 py-3 text-center font-semibold text-cyan-400 transition hover:bg-cyan-500 hover:text-black"
        >
          View Details
        </Link>

        <Link
          to="/book-demo"
          className="flex-1 rounded-xl bg-blue-600 py-3 text-center font-semibold transition hover:bg-blue-700"
        >
          Book Demo
        </Link>
      </div>
    </div>
  );
}