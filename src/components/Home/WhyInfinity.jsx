import {
  Briefcase,
  GraduationCap,
  Cpu,
  Cloud,
  ShieldCheck,
  Users,
} from "lucide-react";

const features = [
  {
    icon: Briefcase,
    title: "Real Industry Projects",
    desc: "Build production-ready AI & Data Engineering projects exactly like top companies.",
    color: "from-cyan-500 to-blue-600",
  },
  {
    icon: GraduationCap,
    title: "Live Mentor Support",
    desc: "Weekly live classes, doubt sessions and career guidance from experienced engineers.",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Cpu,
    title: "AI Powered Learning",
    desc: "Learn Generative AI, LLMs, RAG, LangChain and modern AI tools.",
    color: "from-orange-500 to-red-500",
  },
  {
    icon: Cloud,
    title: "Cloud Labs",
    desc: "Hands-on Google Cloud projects using BigQuery, Dataproc, Airflow and Terraform.",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: ShieldCheck,
    title: "Interview Preparation",
    desc: "Resume building, mock interviews and company-level coding practice.",
    color: "from-indigo-500 to-violet-500",
  },
  {
    icon: Users,
    title: "Career Community",
    desc: "Lifetime Discord & WhatsApp community with mentors and learners.",
    color: "from-sky-500 to-cyan-500",
  },
];

export default function WhyInfinity() {
  return (
    <section
      id="why"
      className="py-24 bg-gradient-to-b from-[#08111F] to-[#030712]"
    >
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center">

          <p className="uppercase tracking-[5px] text-blue-400 font-semibold">
            Why Choose Us
          </p>

          <h2 className="text-5xl font-bold mt-4">
            Why Infinity AI Cloud Academy?
          </h2>

          <p className="text-slate-400 max-w-3xl mx-auto mt-6 text-lg">
            Learn modern AI, Cloud and Data Engineering with industry mentors,
            production projects and career-focused training.
          </p>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-20">

          {features.map((item) => {

            const Icon = item.icon;

            return (

              <div
                key={item.title}
                className="group rounded-3xl bg-slate-900 border border-slate-800 p-8 hover:border-blue-500 hover:-translate-y-2 transition-all duration-300"
              >

                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${item.color} flex items-center justify-center`}
                >
                  <Icon size={32} color="white" />
                </div>

                <h3 className="text-2xl font-bold mt-8">
                  {item.title}
                </h3>

                <p className="text-slate-400 leading-8 mt-5">
                  {item.desc}
                </p>

              </div>

            );

          })}

        </div>

      </div>
    </section>
  );
}