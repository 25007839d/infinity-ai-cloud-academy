import { useParams, Link } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { courses } from "../data/courses";

export default function CourseDetails() {
  const { slug } = useParams();

  const course = courses.find((c) => c.slug === slug);

  if (!course) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-[#030712] text-white">
          <div className="text-center">
            <h1 className="text-4xl font-bold">Course Not Found</h1>

            <Link
              to="/courses"
              className="mt-6 inline-block rounded-xl bg-blue-600 px-6 py-3 hover:bg-blue-700"
            >
              Back to Courses
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="bg-[#030712] text-white">

        {/* Hero */}
        <section className="max-w-7xl mx-auto px-6 py-24">

          <span className="rounded-full bg-cyan-500/10 px-4 py-2 text-cyan-400">
            ⭐ Most Popular
          </span>

          <h1 className="mt-6 text-5xl font-bold">
            {course.title}
          </h1>

          <p className="mt-6 max-w-3xl text-xl text-slate-400">
            {course.shortDescription}
          </p>

          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6">

            <div>
              <p className="text-slate-400">Rating</p>
              <h3 className="text-2xl font-bold">⭐ {course.rating}</h3>
            </div>

            <div>
              <p className="text-slate-400">Students</p>
              <h3 className="text-2xl font-bold">{course.students}</h3>
            </div>

            <div>
              <p className="text-slate-400">Duration</p>
              <h3 className="text-2xl font-bold">{course.duration}</h3>
            </div>

            <div>
              <p className="text-slate-400">Projects</p>
              <h3 className="text-2xl font-bold">{course.projects}+</h3>
            </div>

          </div>

          <div className="mt-10 flex gap-4">

            <Link
              to="/book-demo"
              className="rounded-xl bg-blue-600 px-8 py-4 font-semibold hover:bg-blue-700"
            >
              Book Free Demo
            </Link>

          </div>

        </section>

        {/* Overview */}

        <section className="max-w-7xl mx-auto px-6 py-16">

          <h2 className="text-3xl font-bold">
            Course Overview
          </h2>

          <p className="mt-6 text-slate-400 leading-8">
            {course.overview}
          </p>

        </section>

        {/* Skills */}

        <section className="max-w-7xl mx-auto px-6 py-16">

          <h2 className="text-3xl font-bold">
            Skills You'll Learn
          </h2>

          <div className="mt-8 flex flex-wrap gap-3">

            {course.technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-full bg-slate-800 px-4 py-2 text-cyan-300"
              >
                {tech}
              </span>
            ))}

          </div>

        </section>

        {/* Curriculum */}

        <section className="max-w-7xl mx-auto px-6 py-16">

          <h2 className="text-3xl font-bold mb-8">
            Curriculum
          </h2>

          {course.curriculum?.map((module) => (

            <div
              key={module.module}
              className="mb-6 rounded-xl border border-slate-700 bg-slate-900 p-6"
            >

              <h3 className="text-2xl font-semibold text-cyan-400">
                {module.module}
              </h3>

              <ul className="mt-4 space-y-2 text-slate-300">

                {module.topics.map((topic) => (
                  <li key={topic}>✔ {topic}</li>
                ))}

              </ul>

            </div>

          ))}

        </section>

      </main>

      <Footer />
    </>
  );
}