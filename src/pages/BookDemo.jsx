import DemoForm from "../components/demo/DemoForm";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
export default function BookDemo() {
  return (
    <div className="min-h-screen bg-[#030712] text-white py-20 px-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">

        {/* Left Section */}
        <div>
          <span className="bg-blue-600/20 text-blue-400 px-4 py-2 rounded-full text-sm">
            BOOK FREE DEMO
          </span>

          <h1 className="text-5xl font-bold mt-6 leading-tight">
            Build Your Future with
            <span className="text-cyan-400"> AI & Cloud</span>
          </h1>

          <p className="text-gray-400 mt-6 text-lg">
            Book a FREE live demo with our industry experts and get a personalized roadmap for your IT career.
          </p>

          <div className="mt-10 space-y-5">
            <Feature text="Expert Mentors from Industry" />
            <Feature text="Real World Projects" />
            <Feature text="Placement Assistance" />
            <Feature text="Resume & Interview Preparation" />
            <Feature text="Live Q&A Session" />
            <div className="max-w-7xl mx-auto px-6 pt-8">

              <Link
                to="/"
                className="inline-flex items-center gap-2 text-slate-400 hover:text-blue-400 transition"
              >
                <ArrowLeft size={18} />
                Back to Home
              </Link>

            </div>
          </div>
        </div>

        {/* Right Section */}
        <DemoForm />

      </div>
    </div>
  );
}

function Feature({ text }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-3 h-3 rounded-full bg-green-500"></div>
      <span>{text}</span>
    </div>
  );
}