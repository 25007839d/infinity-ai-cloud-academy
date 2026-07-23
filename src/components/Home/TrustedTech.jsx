import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

// Technology Logos
import sqlLogo from "../../assets/technologies/mysql.jpg";
import pythonLogo from "../../assets/technologies/python.png";
import sparkLogo from "../../assets/technologies/spark.png";
import bigQueryLogo from "../../assets/technologies/bigquery.jpg";
import airflowLogo from "../../assets/technologies/airflow.png";
import terraformLogo from "../../assets/technologies/terraform.png";
import gcpLogo from "../../assets/technologies/google.png";
import aiLogo from "../../assets/technologies/ai.jpg";
import etlLogo from "../../assets/technologies/etl.png";

const techs = [
  {
    icon: sqlLogo,
    title: "SQL",
    slug: "sql",
    description:
      "Master SQL from beginner to advanced with real-world database projects.",
  },
  {
    icon: pythonLogo,
    title: "Python",
    slug: "python",
    description:
      "Learn Python programming for Data Engineering, AI and Automation.",
  },
  {
    icon: sparkLogo,
    title: "Apache Spark",
    slug: "apache-spark",
    description:
      "Process massive datasets using Apache Spark & PySpark.",
  },
  {
    icon: etlLogo,
    title: "data-engineering",
    slug: "data-engineering",
    description:
      "Master SQL, Python, PySpark, Google Cloud and build production-ready data pipelines.",
  },
  {
    icon: gcpLogo,
    title: "google-cloud",
    slug: "google-cloud",
    description:
      "Learn Google Cloud services for Data Engineering and AI workloads.",
  },
  {
    icon: aiLogo,
    title: "Generative AI",
    slug: "generative-ai",
    description:
      "Build AI applications using LLMs, RAG and AI Agents.",
  },
  {
    icon: terraformLogo,
    title: "Terraform",
    slug: "data-engineering",
    description:
      "Master ias from beginner to advanced with real-world projects.",
  },
  {
    icon: airflowLogo,
    title: "Airflow",
    slug: "data-engineering",
    description:
      "Learn from basics to advanced through real industry projects scheduling.",
  },
];

export default function TrustedTech() {
  return (
    <section className="py-24 bg-[#050B18]">
      <div className="max-w-7xl mx-auto px-6">

        {/* Section Header */}

        <div className="text-center">

          <p className="text-blue-400 uppercase tracking-[6px] font-semibold">
            Technologies
          </p>

          <h2 className="text-5xl font-bold mt-4">
            Learn Modern Industry Technologies
          </h2>

          <p className="text-slate-400 mt-6 max-w-3xl mx-auto text-lg">
            Build real-world Data Engineering, Cloud Computing and AI
            projects using the same technologies trusted by leading
            technology companies.
          </p>

        </div>

        {/* Technology Cards */}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-20">

          {techs.map((tech) => (

            <Link
              key={tech.slug}
              to={`/courses/${tech.slug}`}
              className="group"
            >

              <div className="h-full rounded-3xl bg-slate-900 border border-slate-800 p-8 transition-all duration-300 hover:border-blue-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-900/20">

                {/* Icon */}

                <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-white to-slate-100 shadow-xl flex items-center justify-center group-hover:scale-110 transition">

                    <img
                        src={tech.icon}
                        alt={tech.title}
                        className="w-12 h-12 object-contain"
                    />

                </div>

                {/* Title */}

                <h3 className="text-2xl font-semibold mt-6 group-hover:text-blue-400 transition">
                  {tech.title}
                </h3>

                {/* Description */}

                <p className="text-slate-400 mt-4 leading-7 min-h-[90px]">
                  {tech.description}
                </p>

                {/* CTA */}

                <div className="mt-6 flex items-center gap-2 text-blue-400 font-medium opacity-0 group-hover:opacity-100 transition">

                  Learn More

                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition"
                  />

                </div>

              </div>

            </Link>

          ))}

        </div>

      </div>
    </section>
  );
}