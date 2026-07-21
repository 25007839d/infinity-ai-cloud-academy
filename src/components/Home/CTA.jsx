import { ArrowRight, Calendar, MessageCircle } from "lucide-react";

export default function CTA() {
  return (
    <section className="py-24 bg-gradient-to-r from-blue-700 via-cyan-600 to-blue-800">

      <div className="max-w-6xl mx-auto px-6 text-center">

        <p className="uppercase tracking-[5px] text-blue-100 font-semibold">
          Ready To Start?
        </p>

        <h2 className="text-5xl font-bold mt-6 text-white">
          Become an AI & Data Engineer
        </h2>

        <p className="text-blue-100 mt-8 max-w-3xl mx-auto text-xl leading-9">
          Learn from industry professionals, build real-world projects,
          prepare for interviews and launch your technology career.
        </p>

        <div className="flex flex-wrap justify-center gap-6 mt-14">

          <a
            href="#courses"
            className="bg-white text-blue-700 px-8 py-4 rounded-2xl font-semibold flex items-center gap-3 hover:scale-105 transition"
          >
            Explore Courses
            <ArrowRight size={20} />
          </a>

          <a
            href="#contact"
            className="border border-white text-white px-8 py-4 rounded-2xl font-semibold flex items-center gap-3 hover:bg-white hover:text-blue-700 transition"
          >
            <Calendar size={20} />
            Book Free Demo
          </a>

          <a
            href="https://wa.me/"
            target="_blank"
            rel="noreferrer"
            className="bg-green-500 text-white px-8 py-4 rounded-2xl font-semibold flex items-center gap-3 hover:bg-green-600 transition"
          >
            <MessageCircle size={20} />
            WhatsApp Us
          </a>

        </div>

      </div>

    </section>
  );
}