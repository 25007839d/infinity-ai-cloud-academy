import {
  Database,
  Cloud,
  GitBranch,
  Terminal,
  Boxes,
  BrainCircuit,
  Cpu,
  Workflow,
  Server,
  Code2,
} from "lucide-react";

const technologies = [
  {
    icon: <Database size={34} />,
    title: "SQL",
    level: "Foundation",
    color: "text-blue-400",
  },
  {
    icon: <Code2 size={34} />,
    title: "Python",
    level: "Programming",
    color: "text-yellow-400",
  },
  {
    icon: <Cpu size={34} />,
    title: "PySpark",
    level: "Big Data",
    color: "text-orange-400",
  },
  {
    icon: <Cloud size={34} />,
    title: "Google Cloud",
    level: "Cloud",
    color: "text-cyan-400",
  },
  {
    icon: <Workflow size={34} />,
    title: "Airflow",
    level: "Orchestration",
    color: "text-green-400",
  },
  {
    icon: <Server size={34} />,
    title: "BigQuery",
    level: "Data Warehouse",
    color: "text-purple-400",
  },
  {
    icon: <Boxes size={34} />,
    title: "Docker",
    level: "Containers",
    color: "text-blue-500",
  },
  {
    icon: <GitBranch size={34} />,
    title: "Git & GitHub",
    level: "Version Control",
    color: "text-orange-500",
  },
  {
    icon: <Terminal size={34} />,
    title: "Terraform",
    level: "Infrastructure",
    color: "text-violet-400",
  },
  {
    icon: <BrainCircuit size={34} />,
    title: "Generative AI",
    level: "AI Engineering",
    color: "text-pink-400",
  },
];
export default function TechnologyStack() {
  return (
    <section className="bg-[#07111f] py-24">

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center">

          <span className="inline-block rounded-full border border-cyan-500 px-5 py-2 text-cyan-400">

            💻 TECHNOLOGY STACK

          </span>

          <h2 className="mt-6 text-5xl font-bold">

            Technologies You'll Master

          </h2>

          <p className="mt-6 max-w-3xl mx-auto text-lg text-slate-400">

            Learn industry-leading technologies through
            live classes, hands-on labs and real-world projects.

          </p>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 mt-20">

          {technologies.map((tech) => (

            <div
              key={tech.title}
              className="rounded-2xl border border-slate-800 bg-slate-900 p-8 hover:border-cyan-500 hover:-translate-y-2 transition duration-300"
            >

              <div className={tech.color}>

                {tech.icon}

              </div>

              <h3 className="mt-6 text-2xl font-bold">

                {tech.title}

              </h3>

              <p className="mt-3 text-slate-400">

                {tech.level}

              </p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}