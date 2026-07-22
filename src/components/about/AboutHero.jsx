import { Link } from "react-router-dom";

export default function AboutHero() {
  return (
    <section className="py-24 text-center max-w-7xl mx-auto px-6">

      <span className="inline-block rounded-full border border-cyan-500 px-5 py-2 text-cyan-400 text-sm">
        🚀 About Infinity AI Cloud Academy
      </span>

      <h1 className="mt-8 text-6xl font-extrabold leading-tight">

        Build Your Career in

        <span className="text-cyan-400">

          {" "}AI & Cloud

        </span>

      </h1>

      <p className="mt-8 text-xl text-slate-400 max-w-4xl mx-auto">

        We help students and working professionals become industry-ready
        Data Engineers, AI Engineers and Cloud Professionals through
        live training, real-world projects and mentorship.

      </p>

      <div className="mt-12 flex justify-center gap-5">

        <Link
          to="/book-demo"
          className="rounded-xl bg-blue-600 px-8 py-4 hover:bg-blue-700"
        >
          Book Free Demo
        </Link>

        <Link
          to="/courses"
          className="rounded-xl border border-slate-700 px-8 py-4 hover:border-cyan-500"
        >
          Explore Courses
        </Link>

      </div>

    </section>
  );
}