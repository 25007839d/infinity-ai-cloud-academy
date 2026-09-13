import { useEffect, useState } from "react";
import { courses as legacyCourses } from "../../data/courses";
import { apiRequest } from "../../services/api";
import CourseCard from "./CourseCard";

export default function CourseGrid() {
  const [courses, setCourses] = useState(legacyCourses);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    apiRequest("/courses")
      .then((data) => {
        if (active && Array.isArray(data) && data.length) setCourses(data);
      })
      .catch(() => {
        // Keep the existing static catalog as a safe fallback during migration.
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => { active = false; };
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <div className="mb-10">
        <h2 className="text-4xl font-bold text-white">Explore All Courses</h2>
        <p className="mt-3 text-slate-400">
          Learn the most in-demand technologies through live classes,
          real-world projects, and industry mentorship.
        </p>
      </div>

      {loading && (
        <p className="mb-6 text-sm text-slate-500" aria-live="polite">
          Loading latest course catalog…
        </p>
      )}

      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {courses.map((course) => (
          <CourseCard key={course.id || course.slug} course={course} />
        ))}
      </div>
    </section>
  );
}
