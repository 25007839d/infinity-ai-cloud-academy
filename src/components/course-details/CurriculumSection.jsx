export default function CurriculumSection({ course }) {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20">

      <h2 className="text-4xl font-bold mb-10">
        Curriculum
      </h2>

      {course.curriculum?.map((module, index) => (

        <div
          key={index}
          className="mb-6 rounded-2xl border border-slate-800 bg-slate-900 p-6"
        >

          <h3 className="text-2xl font-bold text-cyan-400">
            {module.module}
          </h3>

          <div className="mt-6 grid md:grid-cols-2 gap-3">

            {module.topics.map((topic) => (

              <div
                key={topic}
                className="rounded-lg bg-slate-800 px-4 py-3"
              >
                ✔ {topic}
              </div>

            ))}

          </div>

        </div>

      ))}

    </section>
  );
}