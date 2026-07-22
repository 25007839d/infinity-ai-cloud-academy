import {
  Target,
  Globe2,
  HeartHandshake,
  Lightbulb,
  Rocket,
  ShieldCheck,
} from "lucide-react";

const values = [
  {
    icon: <Lightbulb size={32} />,
    title: "Innovation",
    description:
      "We continuously update our curriculum with the latest AI, Cloud and Data technologies.",
  },
  {
    icon: <ShieldCheck size={32} />,
    title: "Integrity",
    description:
      "Transparent learning with practical knowledge and honest career guidance.",
  },
  {
    icon: <Rocket size={32} />,
    title: "Excellence",
    description:
      "Industry-level training focused on real projects and production-ready skills.",
  },
  {
    icon: <HeartHandshake size={32} />,
    title: "Community",
    description:
      "A supportive learning environment where students grow together.",
  },
];

export default function MissionVision() {
  return (
    <section className="bg-[#07111f] py-24">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-20">

          <span className="inline-block rounded-full border border-cyan-500 px-5 py-2 text-cyan-400">
            🌍 OUR PURPOSE
          </span>

          <h2 className="mt-6 text-5xl font-bold text-white">
            Mission, Vision & Values
          </h2>

          <p className="mt-6 text-lg text-slate-400 max-w-3xl mx-auto">
            Everything we do is focused on helping students build
            practical skills and achieve successful careers.
          </p>

        </div>

        {/* Mission & Vision */}

        <div className="grid lg:grid-cols-2 gap-8">

          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-10">

            <Target className="text-cyan-400" size={48} />

            <h3 className="mt-6 text-3xl font-bold text-white">
              Our Mission
            </h3>

            <p className="mt-6 text-slate-400 leading-8">
              To bridge the gap between academic learning and industry
              expectations by providing practical education in
              Data Engineering, Cloud Computing and Generative AI.
            </p>

          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-10">

            <Globe2 className="text-cyan-400" size={48} />

            <h3 className="mt-6 text-3xl font-bold text-white">
              Our Vision
            </h3>

            <p className="mt-6 text-slate-400 leading-8">
              To become India's most trusted AI & Cloud learning
              platform where students gain real-world experience,
              confidence and career opportunities.
            </p>

          </div>

        </div>

        {/* Core Values */}

        <div className="mt-24">

          <h3 className="text-center text-4xl font-bold text-white">
            Our Core Values
          </h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-14">

            {values.map((value) => (
              <div
                key={value.title}
                className="rounded-2xl border border-slate-800 bg-slate-900 p-8 hover:border-cyan-500 transition duration-300"
              >
                <div className="text-cyan-400">
                  {value.icon}
                </div>

                <h4 className="mt-6 text-2xl font-semibold text-white">
                  {value.title}
                </h4>

                <p className="mt-4 text-slate-400 leading-7">
                  {value.description}
                </p>

              </div>
            ))}

          </div>

        </div>

      </div>
    </section>
  );
}