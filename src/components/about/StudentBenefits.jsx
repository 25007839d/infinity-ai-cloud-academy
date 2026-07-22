import {
  BookOpen,
  FolderKanban,
  Users,
  FileText,
  Video,
  Award,
  MessageCircle,
  Infinity,
} from "lucide-react";

const benefits = [
  {
    icon: <BookOpen size={30} />,
    title: "Premium Study Material",
  },
  {
    icon: <FolderKanban size={30} />,
    title: "Real Industry Projects",
  },
  {
    icon: <Video size={30} />,
    title: "Class Recordings",
  },
  {
    icon: <FileText size={30} />,
    title: "ATS Resume Templates",
  },
  {
    icon: <Award size={30} />,
    title: "Interview Preparation",
  },
  {
    icon: <Users size={30} />,
    title: "Career Mentorship",
  },
  {
    icon: <MessageCircle size={30} />,
    title: "WhatsApp Community",
  },
  {
    icon: <Infinity size={30} />,
    title: "Lifetime Learning Access",
  },
];

export default function StudentBenefits() {
  return (
    <section className="bg-[#07111f] py-24">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center">

          <h2 className="text-5xl font-bold">
            What Every Student Gets
          </h2>

          <p className="mt-6 text-lg text-slate-400 max-w-3xl mx-auto">
            More than just classes — you get everything needed to build a successful tech career.
          </p>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-20">

          {benefits.map((item) => (

            <div
              key={item.title}
              className="rounded-2xl border border-slate-800 bg-slate-900 p-8 text-center hover:border-cyan-500 transition"
            >
              <div className="flex justify-center text-cyan-400">
                {item.icon}
              </div>

              <h3 className="mt-6 text-xl font-semibold">
                {item.title}
              </h3>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}