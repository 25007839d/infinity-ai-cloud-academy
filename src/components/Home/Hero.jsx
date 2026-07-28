import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BrainCircuit,
  Cloud,
  Cpu,
  Database,
  Sparkles,
  CheckCircle2,
  PlayCircle,
  TrendingUp,
} from "lucide-react";

// Technology Logos
import pythonLogo from "../../assets/technologies/python.png";
import sparkLogo from "../../assets/technologies/spark.png";
import airflowLogo from "../../assets/technologies/airflow.png";
import terraformLogo from "../../assets/technologies/terraform.png";
import gcpLogo from "../../assets/technologies/google.png";
import aiLogo from "../../assets/technologies/ai.jpg";

const technologies = [
  {
    title: "Python",
    image: pythonLogo,
    description: "Automation, APIs & Data Processing",
  },
  {
    title: "Apache Spark",
    image: sparkLogo,
    description: "Distributed Data Processing",
  },
  {
    title: "Google Cloud",
    image: gcpLogo,
    description: "Modern Cloud Platform",
  },
  {
    title: "Apache Airflow",
    image: airflowLogo,
    description: "Workflow Orchestration",
  },
  {
    title: "Terraform",
    image: terraformLogo,
    description: "Infrastructure as Code",
  },
  {
    title: "Generative AI",
    image: aiLogo,
    description: "LLMs, RAG & AI Applications",
  },
];

const highlights = [
  {
    icon: BrainCircuit,
    title: "Artificial Intelligence",
  },
  {
    icon: Database,
    title: "Data Engineering",
  },
  {
    icon: Cloud,
    title: "Cloud Computing",
  },
  {
    icon: Cpu,
    title: "Real Industry Projects",
  },
];

const achievements = [
  "Live Industry Projects",
  "Interview Preparation",
  "Placement Guidance",
  "Career Roadmaps",
];

export default function Hero() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className="relative overflow-hidden bg-[#030712] pt-28 pb-24"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden">

        <div className="absolute -left-40 top-10 h-[500px] w-[500px] rounded-full bg-blue-600/20 blur-[170px]" />

        <div className="absolute right-0 bottom-0 h-[450px] w-[450px] rounded-full bg-cyan-500/20 blur-[170px]" />

        <div className="absolute left-1/2 top-40 h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-sky-500/10 blur-[120px]" />

      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2">

        {/* ================= LEFT CONTENT ================= */}

        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >

          {/* Badge */}

          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-5 py-2 text-sm font-medium text-cyan-300 backdrop-blur">

            <Sparkles size={16} />

            <span>
              India's Practical AI & Data Engineering Learning Platform
            </span>

          </div>

          {/* Heading */}

          <h1
            id="hero-title"
            className="mt-8 text-5xl font-black leading-tight tracking-tight text-white lg:text-6xl"
          >

            Master

            <span className="mt-3 block bg-gradient-to-r from-blue-400 via-cyan-300 to-sky-500 bg-clip-text text-transparent">

              AI, Data Engineering

            </span>

            <span className="mt-3 block">

              & Cloud Computing

            </span>

          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-9 text-slate-300">

            Learn
            <strong className="text-white"> Python</strong>,
            <strong className="text-white"> SQL</strong>,
            <strong className="text-white"> Apache Spark</strong>,
            <strong className="text-white"> Apache Airflow</strong>,
            <strong className="text-white"> Terraform</strong>,
            <strong className="text-white"> Google Cloud</strong>
            &nbsp;and
            <strong className="text-white"> Generative AI</strong>
            through real-world industry projects, interview preparation,
            mentorship and hands-on practical learning.

          </p>

          {/* CTA */}

          <div className="mt-10 flex flex-wrap gap-5">

            <Link
              to="/courses"
              className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-8 py-4 font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/30"
            >
              Explore Courses

              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>

            <Link
              to="/roadmaps"
              className="inline-flex items-center gap-2 rounded-xl border border-cyan-500 px-8 py-4 font-semibold text-cyan-300 transition hover:bg-cyan-500 hover:text-white"
            >
              <TrendingUp size={18} />
              View Roadmaps
            </Link>

            <Link
              to="/book-demo"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900/70 px-8 py-4 font-semibold text-white transition hover:border-blue-500"
            >
              <PlayCircle size={18} />
              Book Free Demo
            </Link>

          </div>
                {/* Trust Stats */}

          <div className="mt-12 grid grid-cols-2 gap-6 lg:grid-cols-4">

            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur">

              <h3 className="text-3xl font-bold text-cyan-400">
                100%
              </h3>

              <p className="mt-2 text-sm text-slate-400">
                Practical Learning
              </p>

            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur">

              <h3 className="text-3xl font-bold text-cyan-400">
                20+
              </h3>

              <p className="mt-2 text-sm text-slate-400">
                Real Projects
              </p>

            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur">

              <h3 className="text-3xl font-bold text-cyan-400">
                AI
              </h3>

              <p className="mt-2 text-sm text-slate-400">
                Industry Curriculum
              </p>

            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur">

              <h3 className="text-3xl font-bold text-cyan-400">
                24×7
              </h3>

              <p className="mt-2 text-sm text-slate-400">
                Community Support
              </p>

            </div>

          </div>

          {/* Key Features */}

          <div className="mt-12 grid gap-5 sm:grid-cols-2">

            {highlights.map(({ icon: Icon, title }) => (

              <div
                key={title}
                className="flex items-center gap-4 rounded-2xl border border-slate-800 bg-slate-900/50 p-5 transition-all duration-300 hover:border-cyan-500 hover:bg-slate-900 hover:shadow-lg hover:shadow-cyan-500/10"
              >

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500">

                  <Icon size={22} className="text-white" />

                </div>

                <div>

                  <h3 className="font-semibold text-white">

                    {title}

                  </h3>

                  <p className="mt-1 text-sm text-slate-400">

                    Learn with enterprise-level hands-on implementation.

                  </p>

                </div>

              </div>

            ))}

          </div>

          {/* Achievements */}

          <div className="mt-12 grid gap-4 sm:grid-cols-2">

            {achievements.map((item) => (

              <div
                key={item}
                className="flex items-center gap-3"
              >

                <CheckCircle2
                  size={20}
                  className="text-green-400"
                />

                <span className="text-slate-300">

                  {item}

                </span>

              </div>

            ))}

          </div>

        </motion.div>

        {/* ================= RIGHT SECTION ================= */}

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9 }}
        >

          <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/70 p-8 backdrop-blur-xl shadow-2xl">

            {/* Dashboard Header */}

            <div className="flex items-center justify-between">

              <div>

                <h2 className="text-2xl font-bold text-white">

                  AI Career Dashboard

                </h2>

                <p className="mt-2 text-slate-400">

                  Become Industry Ready with Modern Technologies

                </p>

              </div>

              <div className="flex items-center gap-2">

                <span className="h-3 w-3 rounded-full bg-green-500 animate-pulse"></span>

                <span className="text-sm text-green-400">

                  Live

                </span>

              </div>

            </div>

            {/* Technology Grid */}

            <div className="mt-8 grid grid-cols-2 gap-5">
                    {technologies.map((tech) => (

                <article
                  key={tech.title}
                  className="group rounded-2xl border border-slate-800 bg-[#111827] p-5 transition-all duration-300 hover:-translate-y-2 hover:border-cyan-500 hover:shadow-xl hover:shadow-cyan-500/20"
                >

                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-lg">

                    <img
                      src={tech.image}
                      alt={`${tech.title} Logo`}
                      loading="lazy"
                      decoding="async"
                      width="48"
                      height="48"
                      className="h-12 w-12 object-contain transition-transform duration-300 group-hover:scale-110"
                    />

                  </div>

                  <h3 className="mt-5 text-lg font-bold text-white">

                    {tech.title}

                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-400">

                    {tech.description}

                  </p>

                </article>

              ))}

            </div>

            {/* Bottom CTA */}

            <div className="mt-10 rounded-2xl bg-gradient-to-r from-blue-600 via-cyan-500 to-sky-600 p-[1px]">

              <Link
                to="/courses"
                className="group flex items-center justify-between rounded-2xl bg-[#0b1220] p-6 transition-all duration-300 hover:bg-transparent"
              >

                <div>

                  <h3 className="text-2xl font-bold text-white">

                    Start Your AI Journey Today

                  </h3>

                  <p className="mt-2 max-w-md text-sm leading-6 text-slate-300">

                    Build practical AI, Data Engineering and Cloud skills with
                    real-world projects, interview preparation and career
                    guidance designed for today's industry.

                  </p>

                </div>

                <div className="ml-6 flex h-14 w-14 items-center justify-center rounded-full bg-white/10 transition-all duration-300 group-hover:translate-x-2 group-hover:bg-white/20">

                  <ArrowRight
                    size={26}
                    className="text-white"
                  />

                </div>

              </Link>

            </div>

            {/* SEO Keywords */}

            <div className="mt-8 border-t border-slate-800 pt-6">

              <p className="text-sm leading-7 text-slate-500">

                Learn Python • SQL • Apache Spark • Apache Airflow • Google
                Cloud Platform (GCP) • Terraform • Docker • Kubernetes •
                Data Engineering • Data Analytics • Machine Learning •
                Generative AI • Prompt Engineering • RAG • LLM Applications •
                FastAPI • Git • CI/CD • Real Industry Projects • Interview
                Preparation • Placement Guidance.

              </p>

            </div>

          </div>

        </motion.div>

      </div>

      {/* Decorative Bottom Blur */}

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#020617] to-transparent" />

    </section>

  );

}