import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { courses as legacyCourses } from "../data/courses";
import { apiRequest } from "../services/api";
import { CourseSEO, CourseSchema, BreadcrumbSchema } from "../seo";
import { useAuth } from "../contexts/AuthContext";

export default function CourseDetails() {
  const { slug } = useParams();
  const fallback = legacyCourses.find((c) => c.slug === slug);
  const [course, setCourse] = useState(fallback || null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    let active = true;
    setLoading(true);
    setNotFound(false);

    apiRequest(`/courses/${encodeURIComponent(slug)}`)
      .then((data) => {
        if (active) setCourse(data);
      })
      .catch((error) => {
        if (active && error.status === 404 && !fallback) {
          setCourse(null);
          setNotFound(true);
        }
        // Existing static course remains available if the DB migration is not yet seeded.
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => { active = false; };
  }, [slug]);

  useEffect(() => {
    if (!isAuthenticated || !slug) return;
    apiRequest(`/courses/${encodeURIComponent(slug)}/view`, { method: "POST" }).catch(() => {});
  }, [isAuthenticated, slug]);

  if (!course && (loading || !notFound)) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-[#030712] text-white">
          <p className="text-slate-400">Loading course…</p>
        </div>
        <Footer />
      </>
    );
  }

  if (!course) {
    return (
      <>
        <CourseSEO course={null} />
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

  const seo = course.seo || {};
  const breadcrumbItems = [
    { name: "Home", url: "/" },
    { name: "Courses", url: "/courses" },
    { name: course.title, url: `/courses/${course.slug}` },
  ];

  return (
    <>
      <CourseSEO course={course} />
      <CourseSchema course={course} />
      <BreadcrumbSchema items={breadcrumbItems} />

      <Navbar />
      <main className="bg-[#030712] text-white">
        <section className="max-w-7xl mx-auto px-6 pt-20 pb-12">
          <span className="rounded-full bg-cyan-500/10 px-4 py-2 text-cyan-400">
            {course.popular ? "⭐ Most Popular" : course.category || "Professional Course"}
          </span>

          <h1 className="mt-6 text-5xl font-bold">{course.title}</h1>

          {course.tagline && (
            <p className="mt-3 max-w-3xl text-lg text-cyan-300">{course.tagline}</p>
          )}

          <p className="mt-6 max-w-3xl text-xl text-slate-400">
            {course.shortDescription}
          </p>

          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6">
            <div><p className="text-slate-400">Rating</p><h3 className="text-2xl font-bold">⭐ {course.rating}</h3></div>
            <div><p className="text-slate-400">Students</p><h3 className="text-2xl font-bold">{course.students}</h3></div>
            <div><p className="text-slate-400">Duration</p><h3 className="text-2xl font-bold">{course.duration}</h3></div>
            <div><p className="text-slate-400">Projects</p><h3 className="text-2xl font-bold">{course.projects}+</h3></div>
          </div>

          <div className="mt-10 flex gap-4">
            <Link to="/book-demo" className="rounded-xl bg-blue-600 px-8 py-4 font-semibold hover:bg-blue-700">
              Book Free Demo
            </Link>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 py-10">
          <h2 className="text-3xl font-bold">Course Overview</h2>
          <p className="mt-6 text-slate-400 leading-8">{course.overview}</p>
        </section>

        <section className="max-w-7xl mx-auto px-6 py-10">
          <h2 className="text-3xl font-bold">Skills You'll Learn</h2>
          <div className="mt-8 flex flex-wrap gap-3">
            {(course.technologies || []).map((tech) => (
              <span key={tech} className="rounded-full bg-slate-800 px-4 py-2 text-cyan-300">
                {tech}
              </span>
            ))}
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 pt-10 pb-20">
          <h2 className="text-3xl font-bold mb-8">Curriculum</h2>
          {(course.curriculum || []).map((module, index) => (
            <div key={`${module.module}-${index}`} className="mb-6 rounded-xl border border-slate-700 bg-slate-900 p-6">
              <h3 className="text-2xl font-semibold text-cyan-400">{module.module}</h3>
              <ul className="mt-4 space-y-2 text-slate-300">
                {(module.topics || []).map((topic, topicIndex) => (
                  <li key={`${topic}-${topicIndex}`}>✔ {topic}</li>
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
