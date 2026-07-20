import { motion } from "framer-motion";
import {
  Cloud,
  BrainCircuit,
  Database,
  Sparkles,
  Cpu,
  ArrowRight,
} from "lucide-react";

const skills = [
  { title: "Python", color: "from-yellow-400 to-orange-500" },
  { title: "Apache Spark", color: "from-orange-500 to-red-500" },
  { title: "Google Cloud", color: "from-blue-500 to-cyan-500" },
  { title: "Airflow", color: "from-cyan-500 to-blue-700" },
  { title: "Terraform", color: "from-purple-500 to-indigo-600" },
  { title: "Generative AI", color: "from-pink-500 to-violet-600" },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#030712] pt-28 pb-24">

      {/* Glow */}
      <div className="absolute w-[500px] h-[500px] bg-blue-600/20 blur-[150px] rounded-full -left-40 top-10" />
      <div className="absolute w-[450px] h-[450px] bg-cyan-500/20 blur-[150px] rounded-full right-0 bottom-0" />

      <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">

        {/* LEFT */}

        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: .8 }}
        >

          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-blue-500 text-blue-300 bg-blue-600/10">

            <Sparkles size={18} />

            India's Practical AI Learning Platform

          </div>

          <h1 className="mt-8 text-5xl lg:text-6xl font-black leading-tight">

            Become a

            <span className="block mt-3 bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-600 bg-clip-text text-transparent">
              AI & Data Engineer
            </span>

            <span className="block text-white mt-3">
              Build Real Projects
            </span>

          </h1>

          <p className="mt-8 text-slate-400 text-lg leading-9 max-w-xl">

            Master Python, SQL, Apache Spark, Airflow,
            Terraform, Google Cloud and Generative AI
            by building real industry projects.

          </p>

          <div className="flex flex-wrap gap-5 mt-10">

            <button className="flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:scale-105 duration-300">

              Explore Courses

              <ArrowRight size={18} />

            </button>

            <button className="px-8 py-4 rounded-xl border border-slate-700 hover:border-blue-500 duration-300">

              Book Free Demo

            </button>

          </div>

          <div className="grid grid-cols-2 gap-5 mt-12">

            <div className="flex items-center gap-3">

              <BrainCircuit className="text-cyan-400" />

              AI + ML

            </div>

            <div className="flex items-center gap-3">

              <Cloud className="text-blue-400" />

              Cloud Computing

            </div>

            <div className="flex items-center gap-3">

              <Database className="text-yellow-400" />

              Data Engineering

            </div>

            <div className="flex items-center gap-3">

              <Cpu className="text-green-400" />

              Industry Projects

            </div>

          </div>

        </motion.div>

        {/* RIGHT */}

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: .8 }}
        >

          <div className="bg-slate-900/70 backdrop-blur-xl border border-slate-800 rounded-3xl p-8">

            <div className="flex justify-between items-center">

              <div>

                <h3 className="text-2xl font-bold">

                  AI Career Dashboard

                </h3>

                <p className="text-slate-400 mt-2">

                  Industry Ready Learning

                </p>

              </div>

              <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>

            </div>

            <div className="grid grid-cols-2 gap-5 mt-8">

              {skills.map((item) => (

                <div
                  key={item.title}
                  className="rounded-2xl bg-[#111827] border border-slate-800 p-5 hover:-translate-y-2 transition duration-300"
                >

                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-r ${item.color}`}
                  />

                  <h4 className="mt-5 font-bold text-lg">

                    {item.title}

                  </h4>

                  <p className="text-slate-400 text-sm mt-2">

                    Real Industry Projects

                  </p>

                </div>

              ))}

            </div>

            <div className="mt-8 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 p-6">

              <h3 className="text-2xl font-bold">

                Learn • Build • Deploy

              </h3>

              <p className="mt-2 text-blue-100">

                Become Job Ready with Real Projects

              </p>

            </div>

          </div>

        </motion.div>

      </div>

    </section>
  );
}