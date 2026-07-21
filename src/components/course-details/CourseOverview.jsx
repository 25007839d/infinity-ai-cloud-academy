export default function CourseOverview({ course }) {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20">

      <h2 className="text-4xl font-bold">
        Course Overview
      </h2>

      <p className="mt-8 text-lg leading-8 text-slate-400">
        {course.overview}
      </p>

    </section>
  );
}