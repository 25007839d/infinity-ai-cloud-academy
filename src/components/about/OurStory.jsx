export default function OurStory() {
  return (
    <section className="py-24 bg-[#07111f]">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">

        {/* Left Side */}

        <div>

          <span className="text-cyan-400 font-semibold uppercase tracking-widest">
            OUR STORY
          </span>

          <h2 className="text-5xl font-bold mt-4 leading-tight">
            We Don't Just Teach Technology.
            <br />
            <span className="text-cyan-400">
              We Build Careers.
            </span>
          </h2>

          <p className="mt-8 text-lg text-slate-400 leading-8">

            Infinity AI Cloud Academy was founded with a simple mission—
            to bridge the gap between college education and the real
            skills required by the IT industry.

          </p>

          <p className="mt-6 text-lg text-slate-400 leading-8">

            Every course is designed by experienced professionals
            working on real production projects. Students don't just
            learn concepts—they build end-to-end applications,
            production-ready data pipelines, cloud architectures,
            and AI solutions.

          </p>

          <p className="mt-6 text-lg text-slate-400 leading-8">

            Our goal is simple:

            <span className="text-white font-semibold">
              {" "}Make every student industry-ready.
            </span>

          </p>

        </div>

        {/* Right Side */}

        <div className="grid grid-cols-2 gap-6">

          <div className="rounded-2xl bg-slate-900 border border-slate-800 p-8 text-center">

            <div className="text-5xl">🎓</div>

            <h3 className="text-4xl font-bold mt-4">
              100+
            </h3>

            <p className="text-slate-400 mt-2">
              Learning Resources
            </p>

          </div>

          <div className="rounded-2xl bg-slate-900 border border-slate-800 p-8 text-center">

            <div className="text-5xl">💻</div>

            <h3 className="text-4xl font-bold mt-4">
              20+
            </h3>

            <p className="text-slate-400 mt-2">
              Real Projects
            </p>

          </div>

          <div className="rounded-2xl bg-slate-900 border border-slate-800 p-8 text-center">

            <div className="text-5xl">🚀</div>

            <h3 className="text-4xl font-bold mt-4">
              15+
            </h3>

            <p className="text-slate-400 mt-2">
              Technologies
            </p>

          </div>

          <div className="rounded-2xl bg-slate-900 border border-slate-800 p-8 text-center">

            <div className="text-5xl">🤝</div>

            <h3 className="text-4xl font-bold mt-4">
              Lifetime
            </h3>

            <p className="text-slate-400 mt-2">
              Community Support
            </p>

          </div>

        </div>

      </div>
    </section>
  );
}