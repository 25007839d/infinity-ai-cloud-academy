import {
  Database,
  BrainCircuit,
  Cloud,
  BarChart3,
  Code2,
  Cpu,
} from "lucide-react";

const careers = [
  {
    icon: <Database size={34} />,
    title: "Data Engineer",
    salary: "₹8 – ₹35+ LPA",
    description:
      "Build scalable ETL pipelines, data lakes and cloud-based analytics platforms.",
  },
  {
    icon: <BrainCircuit size={34} />,
    title: "AI Engineer",
    salary: "₹10 – ₹40+ LPA",
    description:
      "Develop Generative AI applications, AI agents, RAG systems and LLM solutions.",
  },
  {
    icon: <Cloud size={34} />,
    title: "Cloud Engineer",
    salary: "₹7 – ₹30+ LPA",
    description:
      "Deploy, monitor and manage scalable cloud infrastructure on Google Cloud.",
  },
  {
    icon: <BarChart3 size={34} />,
    title: "Data Analyst",
    salary: "₹5 – ₹18+ LPA",
    description:
      "Analyze business data using SQL, Python, BigQuery and visualization tools.",
  },
  {
    icon: <Cpu size={34} />,
    title: "ML Engineer",
    salary: "₹10 – ₹35+ LPA",
    description:
      "Design and deploy machine learning models for production environments.",
  },
  {
    icon: <Code2 size={34} />,
    title: "Python Developer",
    salary: "₹5 – ₹20+ LPA",
    description:
      "Develop APIs, automation scripts and backend applications using Python.",
  },
];

export default function CareerOutcomes() {
  return (
    <section className="bg-[#030712] py-24">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center">

          <span className="inline-block rounded-full border border-cyan-500 px-5 py-2 text-cyan-400">
            💼 CAREER OPPORTUNITIES
          </span>

          <h2 className="mt-6 text-5xl font-bold">
            Your Future Career Starts Here
          </h2>

          <p className="mt-6 max-w-3xl mx-auto text-lg text-slate-400">
            Our programs prepare you for high-demand technology roles with
            practical skills, projects and interview preparation.
          </p>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-20">

          {careers.map((career) => (

            <div
              key={career.title}
              className="rounded-2xl border border-slate-800 bg-slate-900 p-8 hover:border-cyan-500 hover:-translate-y-2 transition duration-300"
            >

              <div className="text-cyan-400">
                {career.icon}
              </div>

              <h3 className="mt-6 text-2xl font-bold">
                {career.title}
              </h3>

              <p className="mt-3 text-cyan-300 font-semibold">
                {career.salary}
              </p>

              <p className="mt-5 text-slate-400 leading-7">
                {career.description}
              </p>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}