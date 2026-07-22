import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  FolderKanban,
  Users,
  GraduationCap,
} from "lucide-react";

export default function AboutCTA() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6">

        <div className="rounded-3xl overflow-hidden bg-gradient-to-r from-blue-700 via-cyan-600 to-blue-900">

          <div className="grid lg:grid-cols-2 gap-12 items-center p-12 lg:p-16">

            {/* Left */}

            <div>

              <span className="rounded-full bg-white/20 px-4 py-2 text-sm">
                🚀 Start Your Career Today
              </span>

              <h2 className="mt-8 text-5xl font-bold text-white leading-tight">

                Ready to Become an
                <br />

                <span className="text-cyan-200">

                  Industry Ready Professional?

                </span>

              </h2>

              <p className="mt-8 text-lg text-blue-100 leading-8">

                Join Infinity AI Cloud Academy and learn
                through live classes, industry projects,
                mentorship and career guidance.

              </p>

              <div className="mt-10 flex flex-wrap gap-5">

                <Link
                  to="/book-demo"
                  className="flex items-center gap-3 rounded-xl bg-white text-blue-700 px-8 py-4 font-semibold hover:scale-105 transition"
                >
                  Book Free Demo

                  <ArrowRight size={20} />

                </Link>

                <Link
                  to="/courses"
                  className="rounded-xl border border-white px-8 py-4 text-white hover:bg-white hover:text-blue-700 transition"
                >
                  Explore Courses
                </Link>

              </div>

            </div>

            {/* Right */}

            <div className="grid grid-cols-2 gap-6">

              <div className="rounded-2xl bg-white/10 backdrop-blur p-6">

                <BookOpen className="text-white" size={36} />

                <h3 className="mt-4 text-xl font-semibold text-white">

                  Live Learning

                </h3>

              </div>

              <div className="rounded-2xl bg-white/10 backdrop-blur p-6">

                <FolderKanban className="text-white" size={36} />

                <h3 className="mt-4 text-xl font-semibold text-white">

                  Real Projects

                </h3>

              </div>

              <div className="rounded-2xl bg-white/10 backdrop-blur p-6">

                <Users className="text-white" size={36} />

                <h3 className="mt-4 text-xl font-semibold text-white">

                  Mentorship

                </h3>

              </div>

              <div className="rounded-2xl bg-white/10 backdrop-blur p-6">

                <GraduationCap className="text-white" size={36} />

                <h3 className="mt-4 text-xl font-semibold text-white">

                  Career Support

                </h3>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}