import {
  Database,
  Cloud,
  Server,
  BrainCircuit,
  Boxes,
  Workflow,
  Cpu,
  BarChart3,
} from "lucide-react";

const techs = [
  {
    icon: <Database size={36} />,
    title: "SQL",
    color: "text-sky-400",
  },
  {
    icon: <Cpu size={36} />,
    title: "Python",
    color: "text-yellow-400",
  },
  {
    icon: <Workflow size={36} />,
    title: "Apache Spark",
    color: "text-orange-400",
  },
  {
    icon: <BarChart3 size={36} />,
    title: "BigQuery",
    color: "text-cyan-400",
  },
  {
    icon: <Boxes size={36} />,
    title: "Airflow",
    color: "text-blue-400",
  },
  {
    icon: <Server size={36} />,
    title: "Terraform",
    color: "text-violet-400",
  },
  {
    icon: <Cloud size={36} />,
    title: "Google Cloud",
    color: "text-green-400",
  },
  {
    icon: <BrainCircuit size={36} />,
    title: "Generative AI",
    color: "text-pink-400",
  },
];

export default function TrustedTech() {
  return (
    <section className="py-24 bg-[#050B18]">

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center">

          <p className="text-blue-400 uppercase tracking-[6px] font-semibold">
            Technologies
          </p>

          <h2 className="text-5xl font-bold mt-4">
            Learn Modern Industry Technologies
          </h2>

          <p className="text-slate-400 mt-6 max-w-3xl mx-auto text-lg">
            Build real-world data engineering, cloud computing and AI
            projects using the same technologies used by leading
            technology companies.
          </p>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-20">

          {techs.map((tech) => (

            <div
              key={tech.title}
              className="group rounded-3xl bg-slate-900 border border-slate-800 p-8 hover:border-blue-500 hover:-translate-y-2 duration-300"
            >

              <div
                className={`${tech.color} w-16 h-16 rounded-2xl bg-slate-800 flex items-center justify-center group-hover:scale-110 duration-300`}
              >
                {tech.icon}
              </div>

              <h3 className="text-2xl font-semibold mt-6">
                {tech.title}
              </h3>

              <p className="text-slate-400 mt-3">
                Learn from basics to advanced through real industry
                projects.
              </p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}