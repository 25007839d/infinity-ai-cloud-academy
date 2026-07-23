import { Link } from "react-router-dom";
import {
  Database,
  Cloud,
  BrainCircuit,
  Server,
  Boxes,
  ArrowRight,
} from "lucide-react";

const projects = [
  {
    title: "IoT Data Engineering Platform",
    icon: Database,
    tech: "Python • Spark • BigQuery • Airflow",
    desc: "Build an end-to-end IoT pipeline from sensors to dashboards.",
    color: "from-cyan-500 to-blue-600",
  },
  {
    title: "Google Cloud Data Lake",
    icon: Cloud,
    tech: "GCS • BigQuery • Dataproc",
    desc: "Create a modern cloud data platform using Google Cloud.",
    color: "from-green-500 to-emerald-500",
  },
  {
    title: "Apache Spark ETL Pipeline",
    icon: Server,
    tech: "PySpark • SQL • Airflow",
    desc: "Process millions of records with distributed computing.",
    color: "from-orange-500 to-red-500",
  },
  {
    title: "Generative AI Chatbot",
    icon: BrainCircuit,
    tech: "OpenAI • LangChain • RAG",
    desc: "Build your own AI assistant using modern LLM architecture.",
    color: "from-pink-500 to-violet-600",
  },
  {
    title: "Terraform Infrastructure",
    icon: Boxes,
    tech: "Terraform • GCP • IAM",
    desc: "Deploy complete cloud infrastructure using Infrastructure as Code.",
    color: "from-indigo-500 to-purple-600",
  },
  {
    title: "Industry Capstone Project",
    icon: Database,
    tech: "Everything Combined",
    desc: "One final production-grade project using the complete stack.",
    color: "from-sky-500 to-cyan-500",
  },
];

export default function Projects() {
  return (
    <section
      id="projects"
      className="py-24 bg-[#08111F]"
    >
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center">

          <p className="uppercase tracking-[5px] text-blue-400 font-semibold">
            Real Industry Projects
          </p>

          <h2 className="text-5xl font-bold mt-4">
            Learn By Building
          </h2>

          <p className="text-slate-400 text-lg mt-6 max-w-3xl mx-auto">
            Every student works on production-style projects that mirror
            real-world enterprise data engineering and AI systems.
          </p>

        </div>

        <div className="grid lg:grid-cols-3 gap-8 mt-20">

          {projects.map((project) => {

            const Icon = project.icon;

            return (

              <Link
                key={project.title}
                to="/projects"
                className="group block rounded-3xl bg-slate-900 border border-slate-800 p-8 hover:border-blue-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-900/20 transition-all duration-300"
              >

                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${project.color} flex items-center justify-center`}
                >
                  <Icon size={34} color="white" />
                </div>

                <h3 className="text-2xl font-bold mt-8 group-hover:text-blue-400 transition">
                  {project.title}
                </h3>

                <p className="text-blue-400 mt-3 text-sm">
                  {project.tech}
                </p>

                <p className="text-slate-400 mt-5 leading-8">
                  {project.desc}
                </p>

                <div className="mt-8 flex items-center gap-2 text-blue-400 font-semibold">

                  View Project

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