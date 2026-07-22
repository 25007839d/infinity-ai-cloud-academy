import {
  CalendarCheck,
  BookOpen,
  ClipboardCheck,
  FolderKanban,
  FileText,
  MessageSquare,
  Briefcase,
  Trophy,
} from "lucide-react";

const journey = [
  {
    icon: <CalendarCheck size={28} />,
    title: "Book Free Demo",
    duration: "Day 1",
    description:
      "Attend a free live demo session to understand our teaching methodology and career roadmap.",
  },
  {
    icon: <BookOpen size={28} />,
    title: "Live Classes",
    duration: "Weeks 1–12",
    description:
      "Interactive live sessions covering SQL, Python, PySpark, Google Cloud and AI.",
  },
  {
    icon: <ClipboardCheck size={28} />,
    title: "Assignments",
    duration: "Weekly",
    description:
      "Hands-on coding assignments to strengthen every concept.",
  },
  {
    icon: <FolderKanban size={28} />,
    title: "Industry Projects",
    duration: "4–6 Weeks",
    description:
      "Build production-ready projects like IoT Platform, ETL Pipelines and AI Applications.",
  },
  {
    icon: <FileText size={28} />,
    title: "Resume Building",
    duration: "Week 10",
    description:
      "Create an ATS-friendly resume with project portfolio and GitHub profile.",
  },
  {
    icon: <MessageSquare size={28} />,
    title: "Mock Interviews",
    duration: "Week 11",
    description:
      "Technical and HR mock interviews with detailed feedback.",
  },
  {
    icon: <Briefcase size={28} />,
    title: "Placement Preparation",
    duration: "Week 12",
    description:
      "Job strategy, referrals, LinkedIn optimization and interview guidance.",
  },
  {
    icon: <Trophy size={28} />,
    title: "Career Growth",
    duration: "Ongoing",
    description:
      "Continue learning through our lifetime community, projects and advanced courses.",
  },
];

export default function TrainingProcess() {
  return (
    <section className="bg-[#030712] py-24">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center">

          <span className="inline-block rounded-full border border-cyan-500 px-5 py-2 text-cyan-400">
            🎯 LEARNING JOURNEY
          </span>

          <h2 className="mt-6 text-5xl font-bold">
            Your Journey to Becoming an
            <span className="text-cyan-400"> Industry Professional</span>
          </h2>

          <p className="mt-6 text-slate-400 max-w-3xl mx-auto text-lg">
            From your first demo session to your first job,
            we guide you at every step.
          </p>

        </div>

        <div className="relative mt-20">

          {/* Vertical Line */}

          <div className="absolute left-5 top-0 h-full w-1 bg-slate-800 hidden md:block"></div>

          <div className="space-y-10">

            {journey.map((step, index) => (

              <div
                key={index}
                className="relative flex gap-6"
              >

                <div className="z-10 flex h-12 w-12 items-center justify-center rounded-full bg-cyan-500 text-black">
                  {step.icon}
                </div>

                <div className="flex-1 rounded-2xl border border-slate-800 bg-slate-900 p-8 hover:border-cyan-500 transition">

                  <div className="flex flex-wrap justify-between items-center">

                    <h3 className="text-2xl font-bold">

                      {step.title}

                    </h3>

                    <span className="rounded-full bg-cyan-500/10 px-4 py-1 text-cyan-400">

                      {step.duration}

                    </span>

                  </div>

                  <p className="mt-5 text-slate-400 leading-8">

                    {step.description}

                  </p>

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>
    </section>
  );
}