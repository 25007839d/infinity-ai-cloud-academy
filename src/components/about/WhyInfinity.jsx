import {
  Briefcase,
  FolderKanban,
  Users,
  FileText,
  MessageSquare,
  GraduationCap,
  BookOpen,
  BadgeCheck,
} from "lucide-react";

const features = [
  {
    icon: <BookOpen size={36} />,
    title: "Industry Curriculum",
    description:
      "Courses designed according to current industry requirements with real-world use cases.",
  },
  {
    icon: <FolderKanban size={36} />,
    title: "Real Projects",
    description:
      "Build production-ready Data Engineering, Cloud and AI projects for your portfolio.",
  },
  {
    icon: <Users size={36} />,
    title: "Live Mentorship",
    description:
      "Learn directly from experienced professionals working in top IT companies.",
  },
  {
    icon: <FileText size={36} />,
    title: "Resume Building",
    description:
      "ATS-friendly resume templates and personalized resume review sessions.",
  },
  {
    icon: <MessageSquare size={36} />,
    title: "Mock Interviews",
    description:
      "Practice technical interviews with real interview questions and feedback.",
  },
  {
    icon: <Briefcase size={36} />,
    title: "Placement Guidance",
    description:
      "Complete career guidance including job strategy, referrals and interview preparation.",
  },
  {
    icon: <GraduationCap size={36} />,
    title: "Lifetime Learning",
    description:
      "Get lifetime access to notes, recordings, projects and future updates.",
  },
  {
    icon: <BadgeCheck size={36} />,
    title: "Community Support",
    description:
      "Join our active WhatsApp community for doubt solving, updates and networking.",
  },
];

export default function WhyInfinity() {
  return (
    <section className="py-24 bg-[#030712]">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center">

          <span className="inline-block rounded-full border border-cyan-500 px-5 py-2 text-cyan-400 text-sm">
            ⭐ WHY CHOOSE US
          </span>

          <h2 className="mt-6 text-5xl font-bold">
            Why Choose
            <span className="text-cyan-400"> Infinity AI Cloud Academy</span>?
          </h2>

          <p className="mt-6 max-w-3xl mx-auto text-lg text-slate-400">
            Everything you need to become an industry-ready AI, Cloud or
            Data Engineer — all in one place.
          </p>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-20">

          {features.map((item, index) => (
            <div
              key={index}
              className="rounded-2xl border border-slate-800 bg-slate-900 p-8 transition-all duration-300 hover:-translate-y-2 hover:border-cyan-500 hover:shadow-xl hover:shadow-cyan-500/10"
            >
              <div className="text-cyan-400">{item.icon}</div>

              <h3 className="mt-6 text-2xl font-semibold">
                {item.title}
              </h3>

              <p className="mt-4 text-slate-400 leading-7">
                {item.description}
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}