import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Aman Sharma",
    role: "Data Engineer",
    company: "MNC",
    text: "The projects were exactly like real industry work. I gained confidence in Spark, Airflow and BigQuery.",
  },
  {
    name: "Priya Singh",
    role: "AI Engineer",
    company: "Startup",
    text: "Generative AI and LangChain modules were amazing. The mentors explained everything with practical examples.",
  },
  {
    name: "Rahul Verma",
    role: "Cloud Engineer",
    company: "Product Company",
    text: "The roadmap, interview preparation and live sessions helped me crack my first cloud role.",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-[#030712]">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center">

          <p className="uppercase tracking-[5px] text-blue-400 font-semibold">
            Testimonials
          </p>

          <h2 className="text-5xl font-bold mt-4">
            What Our Learners Say
          </h2>

          <p className="text-slate-400 mt-6 max-w-3xl mx-auto">
            Our goal is to make every learner job-ready through practical
            training and real-world projects.
          </p>

        </div>

        <div className="grid lg:grid-cols-3 gap-8 mt-20">

          {testimonials.map((item) => (

            <div
              key={item.name}
              className="rounded-3xl bg-slate-900 border border-slate-800 p-8 hover:border-blue-500 transition"
            >

              <div className="flex gap-1 text-yellow-400">

                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} fill="currentColor" />
                ))}

              </div>

              <p className="mt-6 text-slate-300 leading-8">
                "{item.text}"
              </p>

              <div className="mt-8">

                <h3 className="font-bold text-xl">
                  {item.name}
                </h3>

                <p className="text-slate-400">
                  {item.role}
                </p>

                <p className="text-blue-400 text-sm">
                  {item.company}
                </p>

              </div>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}