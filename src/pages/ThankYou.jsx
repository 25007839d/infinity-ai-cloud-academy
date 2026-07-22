import { Link, useLocation } from "react-router-dom";
import {
  CheckCircle,
  ArrowRight,
  BookOpen,
  MessageCircle,
  PlayCircle,
} from "lucide-react";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import siteConfig from "../config/siteConfig";

export default function ThankYou() {
  const { state } = useLocation();

  const name = state?.name || "Student";
  const course = state?.course || "our programs";

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#030712] text-white">
        <section className="max-w-6xl mx-auto px-6 py-20">

          {/* Success Card */}

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-10 text-center">

            <CheckCircle
              size={90}
              className="mx-auto text-green-500"
            />

            <h1 className="text-5xl font-bold mt-8">
              Thank You, {name}! 🎉
            </h1>

            <p className="text-xl text-slate-300 mt-6">
              Your demo request has been successfully received.
            </p>

            <div className="inline-block mt-5 rounded-full bg-blue-600 px-6 py-3 text-lg font-semibold">
              {course}
            </div>

            <p className="text-slate-400 mt-8 leading-8">
              Our team will contact you within the next 24 hours.
              <br />
              Meanwhile, explore our free learning resources.
            </p>

          </div>

          {/* Next Steps */}

          <div className="grid md:grid-cols-3 gap-8 mt-16">

            {/* WhatsApp */}

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">

              <MessageCircle
                size={42}
                className="text-green-500"
              />

              <h3 className="text-2xl font-semibold mt-5">
                Join WhatsApp
              </h3>

              <p className="text-slate-400 mt-4">
                Get notes, announcements, projects and batch updates.
              </p>

              <a
                href={siteConfig.community.whatsappGroup}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 mt-6 text-green-400 hover:text-green-300"
              >
                Join Group
                <ArrowRight size={18} />
              </a>

            </div>

            {/* YouTube */}

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">

              <PlayCircle
                size={42}
                className="text-red-500"
              />

              <h3 className="text-2xl font-semibold mt-5">
                Watch Free Classes
              </h3>

              <p className="text-slate-400 mt-4">
                Learn from our free YouTube tutorials before your demo.
              </p>

              <a
                href={siteConfig.social.youtube}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 mt-6 text-red-400 hover:text-red-300"
              >
                Visit YouTube
                <ArrowRight size={18} />
              </a>

            </div>

            {/* Courses */}

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">

              <BookOpen
                size={42}
                className="text-blue-500"
              />

              <h3 className="text-2xl font-semibold mt-5">
                Explore Courses
              </h3>

              <p className="text-slate-400 mt-4">
                Browse complete learning roadmaps and projects.
              </p>

              <Link
                to="/courses"
                className="inline-flex items-center gap-2 mt-6 text-blue-400 hover:text-blue-300"
              >
                View Courses
                <ArrowRight size={18} />
              </Link>

            </div>

          </div>

          {/* CTA */}

          <div className="mt-16 bg-gradient-to-r from-blue-700 to-cyan-600 rounded-3xl p-10 text-center">

            <h2 className="text-4xl font-bold">
              Need Immediate Assistance?
            </h2>

            <p className="mt-4 text-lg">
              Our team is happy to help you.
            </p>

            <div className="flex flex-wrap justify-center gap-5 mt-8">

              <a
                href={`tel:${siteConfig.contact.phone}`}
                className="bg-white text-blue-700 px-8 py-4 rounded-xl font-semibold"
              >
                📞 Call Now
              </a>

              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="bg-slate-900 px-8 py-4 rounded-xl font-semibold border border-white"
              >
                📧 Email Us
              </a>

            </div>

          </div>

        </section>
      </main>

      <Footer />
    </>
  );
}