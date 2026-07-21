import { courses } from "../../data/courses";
import CourseCard from "./CourseCard";

export default function CourseGrid() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20">

      <div className="mb-10">
        <h2 className="text-4xl font-bold text-white">
          Explore All Courses
        </h2>

        <p className="mt-3 text-slate-400">
          Learn the most in-demand technologies through live classes,
          real-world projects, and industry mentorship.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>

    </section>
  );
}