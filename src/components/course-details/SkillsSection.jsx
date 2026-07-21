export default function SkillsSection({ course }) {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20">

      <h2 className="text-4xl font-bold">
        Skills You'll Learn
      </h2>

      <div className="mt-10 flex flex-wrap gap-4">

        {course.technologies.map((skill) => (

          <span
            key={skill}
            className="rounded-full border border-slate-700 bg-slate-900 px-5 py-3 text-cyan-300"
          >
            {skill}
          </span>

        ))}

      </div>

    </section>
  );
}