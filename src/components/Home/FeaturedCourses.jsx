import { Link } from "react-router-dom";
import {
  Database,
  BrainCircuit,
  Cloud,
  Code2,
  Workflow,
  Briefcase,
  ArrowRight,
} from "lucide-react";

const courses = [
  {
    title: "Data Engineering Bootcamp",
    icon: Database,
    duration: "24 Weeks",
    level: "Beginner to Advanced",
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "Generative AI",
    icon: BrainCircuit,
    duration: "12 Weeks",
    level: "Intermediate",
    color: "from-pink-500 to-purple-600",
  },
  {
    title: "Google Cloud Platform",
    icon: Cloud,
    duration: "10 Weeks",
    level: "Beginner",
    color: "from-green-500 to-emerald-500",
  },
  {
    title: "Python + SQL",
    icon: Code2,
    duration: "8 Weeks",
    level: "Beginner",
    color: "from-yellow-400 to-orange-500",
  },
  {
    title: "Apache Spark & Airflow",
    icon: Workflow,
    duration: "10 Weeks",
    level: "Advanced",
    color: "from-orange-500 to-red-500",
  },
  {
    title: "Interview Preparation",
    icon: Briefcase,
    duration: "4 Weeks",
    level: "Career",
    color: "from-indigo-500 to-violet-600",
  },
];

export default function FeaturedCourses() {
  return (
    <section
      id="courses"
      className="py-24 bg-gradient-to-b from-[#030712] to-[#0B1120]"
    >
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center">

          <p className="uppercase tracking-[5px] text-blue-400 font-semibold">
            Courses
          </p>

          <h2 className="text-5xl font-bold mt-4">
            Learn In-Demand Technologies
          </h2>

          <p className="text-slate-400 max-w-3xl mx-auto mt-6 text-lg">
            Industry-designed programs focused on practical implementation,
            real projects and interview preparation.
          </p>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-20">

          {courses.map((course) => {

            const Icon = course.icon;

            return (

              <div
                key={course.title}
                className="group bg-slate-900 border border-slate-800 rounded-3xl p-8 hover:border-blue-500 hover:-translate-y-3 transition-all duration-300"
              >

                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-r ${course.color}`}
                >
                  <Icon size={34} color="white" />
                </div>

                <h3 className="text-2xl font-bold mt-8">
                  {course.title}
                </h3>

                <div className="grid grid-cols-2 gap-4 mt-8">

                  <div className="bg-slate-800 rounded-xl p-3 text-center">
                    <p className="text-2xl font-bold text-blue-400">15+</p>
                    <p className="text-xs text-slate-400 mt-1">
                      Projects
                    </p>
                  </div>

                  <div className="bg-slate-800 rounded-xl p-3 text-center">
                    <p className="text-2xl font-bold text-cyan-400">40+</p>
                    <p className="text-xs text-slate-400 mt-1">
                      Live Classes
                    </p>
                  </div>

                  <div className="bg-slate-800 rounded-xl p-3 text-center">
                    <p className="text-lg font-bold text-green-400">
                      ✔
                    </p>
                    <p className="text-xs text-slate-400 mt-1">
                      Certificate
                    </p>
                  </div>

                  <div className="bg-slate-800 rounded-xl p-3 text-center">
                    <p className="text-lg font-bold text-yellow-400">
                      Online
                    </p>
                    <p className="text-xs text-slate-400 mt-1">
                      Mode
                    </p>
                  </div>

                </div>

                <div className="mt-8 flex items-center justify-between">

                  <Link
                    to="/courses"
                    className="flex items-center gap-2 text-blue-400 font-semibold group-hover:gap-3 transition-all"
                  >
                    View Details

                    <ArrowRight size={18} />
                  </Link>

                  <span className="text-xs text-slate-500">
                    {course.duration}
                  </span>

                </div>

              </div>

            );

          })}

        </div>

      </div>
    </section>
  );
}