const stats = [
  {
    number: "100+",
    title: "Resources",
  },

  {
    number: "5K+",
    title: "Downloads",
  },

  {
    number: "2K+",
    title: "Students",
  },

  {
    number: "20+",
    title: "GitHub Projects",
  },
];

export default function StatsSection() {
  return (
    <section className="py-20">

      <div className="grid md:grid-cols-4 gap-8">

        {stats.map((item) => (
          <div
            key={item.title}
            className="rounded-2xl border border-slate-800 bg-slate-900 p-8 text-center"
          >
            <h2 className="text-5xl font-bold text-cyan-400">
              {item.number}
            </h2>

            <p className="mt-3 text-slate-400">
              {item.title}
            </p>
          </div>
        ))}

      </div>

    </section>
  );
}