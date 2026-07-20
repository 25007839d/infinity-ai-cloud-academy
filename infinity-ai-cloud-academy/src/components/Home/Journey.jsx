import {
  UserPlus,
  BookOpen,
  Laptop,
  FolderGit2,
  Briefcase,
  Trophy,
} from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "Enroll",
    desc: "Join the program and access your learning dashboard.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: BookOpen,
    title: "Learn",
    desc: "Master Python, SQL, Spark, Cloud & AI with live classes.",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Laptop,
    title: "Practice",
    desc: "Daily coding assignments and hands-on labs.",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: FolderGit2,
    title: "Build Projects",
    desc: "Create production-ready portfolio projects.",
    color: "from-orange-500 to-red-500",
  },
  {
    icon: Briefcase,
    title: "Interview Prep",
    desc: "Resume, LinkedIn and mock interviews.",
    color: "from-indigo-500 to-violet-500",
  },
  {
    icon: Trophy,
    title: "Get Hired",
    desc: "Become industry ready and crack top companies.",
    color: "from-cyan-500 to-blue-500",
  },
];

export default function Journey() {
  return (
    <section
      id="journey"
      className="py-24 bg-[#030712]"
    >
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center">

          <p className="uppercase tracking-[5px] text-blue-400 font-semibold">
            Student Journey
          </p>

          <h2 className="text-5xl font-bold mt-4">
            Your Journey To Success
          </h2>

          <p className="text-slate-400 text-lg max-w-3xl mx-auto mt-6">
            From beginner to job-ready engineer with structured learning,
            projects and interview preparation.
          </p>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-20">

          {steps.map((step, index) => {

            const Icon = step.icon;

            return (

              <div
                key={step.title}
                className="relative bg-slate-900 border border-slate-800 rounded-3xl p-8 hover:border-blue-500 hover:-translate-y-2 transition-all duration-300"
              >

                <div className="absolute top-6 right-6 text-5xl font-bold text-slate-800">
                  {index + 1}
                </div>

                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${step.color} flex items-center justify-center`}
                >
                  <Icon size={32} color="white" />
                </div>

                <h3 className="text-2xl font-bold mt-8">
                  {step.title}
                </h3>

                <p className="text-slate-400 mt-5 leading-8">
                  {step.desc}
                </p>

              </div>

            );

          })}

        </div>

      </div>
    </section>
  );
}