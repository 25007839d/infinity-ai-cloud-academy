import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import sqlLogo from "../../assets/technologies/mysql.jpg";
import pythonLogo from "../../assets/technologies/python.png";
import sparkLogo from "../../assets/technologies/spark.png";
import bigQueryLogo from "../../assets/technologies/bigquery.jpg";
import airflowLogo from "../../assets/technologies/airflow.png";
import terraformLogo from "../../assets/technologies/terraform.png";
import gcpLogo from "../../assets/technologies/google.png";
import aiLogo from "../../assets/technologies/ai.jpg";
import {
  Cloud,
  BrainCircuit,
  Database,
  Sparkles,
  Cpu,
  ArrowRight,
} from "lucide-react";

const skills = [
  {
    title: "Python",
    image: pythonLogo,
  },
  {
    title: "Apache Spark",
    image: sparkLogo,
  },
  {
    title: "Google Cloud",
    image: gcpLogo,
  },
  {
    title: "Apache Airflow",
    image: airflowLogo,
  },
  {
    title: "Terraform",
    image: terraformLogo,
  },
  {
    title: "Generative AI",
    image: aiLogo,
  },
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

            <Link
              to="/courses"
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:scale-105 duration-300"
            >
              Explore Courses

              <ArrowRight size={18} />
            </Link>

            <Link
              to="/book-demo"
              className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-8 py-4 rounded-xl font-semibold hover:scale-105 transition duration-300"
            >
              Book Free Demo
            </Link>

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

                  <div className="w-14 h-14 rounded-xl bg-white shadow-lg flex items-center justify-center">

                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-10 h-10 object-contain"
                    />

                  </div>

                  <h4 className="mt-5 font-bold text-lg">

                    {item.title}

                  </h4>

                  <p className="text-slate-400 text-sm mt-2">

                    Real Industry Projects

                  </p>

                </div>

              ))}

            </div>

            <Link
              to="/courses"
              className="block mt-8 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 p-6 hover:scale-[1.02] hover:shadow-xl hover:shadow-cyan-500/20 transition-all duration-300"
            >
              <div className="flex items-center justify-between">

                <div>

                  <h3 className="text-2xl font-bold">
                    Start Your Learning Journey
                  </h3>

                  <p className="mt-2 text-blue-100">
                    Explore industry-ready courses and become job-ready with real projects.
                  </p>

                </div>

                <ArrowRight
                  size={28}
                  className="text-white group-hover:translate-x-2 transition"
                />

              </div>
            </Link>

          </div>

        </motion.div>

      </div>

    </section>
  );
}