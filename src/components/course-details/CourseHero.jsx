import { Link } from "react-router-dom";

export default function CourseHero({ course }) {
  return (
    <section className="border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-6 py-24">

        <span className="rounded-full bg-cyan-500/10 px-4 py-2 text-cyan-400">
          ⭐ Most Popular
        </span>

        <h1 className="mt-6 text-6xl font-bold">
          {course.title}
        </h1>

        <p className="mt-6 max-w-3xl text-xl text-slate-400">
          {course.shortDescription}
        </p>

        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6">

          <div>
            <p className="text-slate-400">Rating</p>
            <h3 className="text-2xl font-bold">
              ⭐ {course.rating}
            </h3>
          </div>

          <div>
            <p className="text-slate-400">Students</p>
            <h3 className="text-2xl font-bold">
              {course.students}
            </h3>
          </div>

          <div>
            <p className="text-slate-400">Duration</p>
            <h3 className="text-2xl font-bold">
              {course.duration}
            </h3>
          </div>

          <div>
            <p className="text-slate-400">Projects</p>
            <h3 className="text-2xl font-bold">
              {course.projects}+
            </h3>
          </div>

        </div>

        <div className="mt-10 flex gap-4">

          <Link
            to="/book-demo"
            className="rounded-xl bg-blue-600 px-8 py-4 font-semibold hover:bg-blue-700"
          >
            Book Free Demo
          </Link>

          <button className="rounded-xl border border-cyan-400 px-8 py-4 text-cyan-400 hover:bg-cyan-500 hover:text-black transition">
            Download Syllabus
          </button>

        </div>

      </div>
    </section>
  );
}