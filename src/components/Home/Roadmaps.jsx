import { Link } from "react-router-dom";
import {
  ArrowRight,
  Database,
  BrainCircuit,
  Cloud,
  CheckCircle2,
} from "lucide-react";

const roadmaps = [
  {
    title: "Data Engineer",
    icon: Database,
    color: "from-cyan-500 to-blue-600",
    salary: "₹8L - ₹35L",
    skills: [
      "Python",
      "SQL",
      "Apache Spark",
      "Airflow",
      "BigQuery",
      "Terraform",
      "Real Projects",
      "Interview Prep",
    ],
  },
  {
    title: "AI Engineer",
    icon: BrainCircuit,
    color: "from-pink-500 to-violet-600",
    salary: "₹10L - ₹50L",
    skills: [
      "Python",
      "Machine Learning",
      "Deep Learning",
      "LLMs",
      "RAG",
      "LangChain",
      "AI Projects",
      "Deployment",
    ],
  },
  {
    title: "Cloud Engineer",
    icon: Cloud,
    color: "from-green-500 to-emerald-500",
    salary: "₹8L - ₹30L",
    skills: [
      "Linux",
      "Docker",
      "Kubernetes",
      "Terraform",
      "Google Cloud",
      "CI/CD",
      "Monitoring",
      "DevOps",
    ],
  },
];

export default function Roadmaps() {
  return (
    <section
      id="roadmaps"
      className="py-24 bg-[#030712]"
    >
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center">

          <p className="uppercase tracking-[5px] text-blue-400 font-semibold">
            Career Roadmaps
          </p>

          <h2 className="text-5xl font-bold mt-4">
            Choose Your Career Path
          </h2>

          <p className="text-slate-400 text-lg max-w-3xl mx-auto mt-6">
            Structured learning paths designed to make you
            industry-ready through real projects and interview
            preparation.
          </p>

        </div>

        <div className="grid lg:grid-cols-3 gap-8 mt-20">

          {roadmaps.map((roadmap) => {

            const Icon = roadmap.icon;

            return (

              <Link
                key={roadmap.title}
                to="/roadmaps"
                className="group block rounded-3xl border border-slate-800 bg-slate-900 p-8 hover:border-blue-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-900/20 transition-all duration-300"
              >

                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-r ${roadmap.color}`}
                >
                  <Icon size={34} color="white" />
                </div>

                <h3 className="text-3xl font-bold mt-8 group-hover:text-blue-400 transition">
                  {roadmap.title}
                </h3>

                <p className="text-green-400 mt-3 font-semibold">
                  Expected Salary: {roadmap.salary}
                </p>

                <div className="mt-8 space-y-4">

                  {roadmap.skills.map((skill) => (

                    <div
                      key={skill}
                      className="flex items-center gap-3"
                    >
                      <CheckCircle2
                        size={18}
                        className="text-blue-400"
                      />

                      <span className="text-slate-300">
                        {skill}
                      </span>

                    </div>

                  ))}

                </div>

                <div className="mt-10 flex items-center gap-2 text-blue-400 font-semibold">

                  View Complete Roadmap

                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-2 transition-transform duration-300"
                  />

                </div>

              </Link>

            );

          })}

        </div>

      </div>
    </section>
  );
}