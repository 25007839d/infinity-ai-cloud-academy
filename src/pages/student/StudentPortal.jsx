import { motion } from "framer-motion";
import { GraduationCap, BookOpen, Award, Download, Briefcase, ArrowRight } from "lucide-react";

export default function StudentPortal() {
  return (
    <section className="min-h-screen bg-slate-950 flex items-center justify-center px-6 py-24">

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: .6 }}
        className="max-w-4xl w-full rounded-3xl border border-slate-800 bg-slate-900/70 backdrop-blur-xl p-12"
      >

        <div className="text-center">

          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600">

            <GraduationCap className="h-10 w-10 text-white"/>

          </div>

          <h1 className="mt-8 text-5xl font-bold text-white">

            Student Portal

          </h1>

          <p className="mt-5 text-lg text-slate-400">

            Welcome to Infinity AI Cloud Academy.

            Access all your learning resources from one place.

          </p>

        </div>

        <div className="mt-12 grid md:grid-cols-2 gap-6">

          <Feature icon={<BookOpen />} title="My Courses"/>
          <Feature icon={<Download />} title="Study Resources"/>
          <Feature icon={<Award />} title="Certificates"/>
          <Feature icon={<Briefcase />} title="Placement Support"/>

        </div>

        <div className="mt-14 text-center">

          <button
            className="inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-8 py-4 font-semibold text-white transition hover:scale-105"
          >

            Continue to Student Portal

            <ArrowRight size={20}/>

          </button>

          <p className="mt-6 text-sm text-slate-500">

            Phone verification will be enabled in the next step.

          </p>

        </div>

      </motion.div>

    </section>
  );
}

function Feature({ icon, title }) {

  return (

    <div className="flex items-center gap-4 rounded-xl border border-slate-800 bg-slate-950/60 p-5">

      <div className="text-cyan-400">

        {icon}

      </div>

      <span className="font-medium text-white">

        {title}

      </span>

    </div>

  );

}