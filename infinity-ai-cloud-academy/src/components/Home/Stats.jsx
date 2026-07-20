const items = [
  "Real Industry Projects",
  "Hands-on Learning",
  "Career Roadmaps",
  "Expert Mentorship",
];

export default function Stats() {
  return (
    <section className="py-20">

      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8 px-6">

        {items.map((item) => (

          <div
            key={item}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center hover:border-blue-500 transition"
          >

            <h2 className="text-blue-500 text-4xl font-black">
              ✔
            </h2>

            <p className="mt-5 text-lg">
              {item}
            </p>

          </div>

        ))}

      </div>

    </section>
  );
}