import { Link } from "react-router-dom";
import Timeline from "./Timeline";

export default function RoadmapCard({ roadmap }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900">

      <div className={`bg-gradient-to-r ${roadmap.color} p-8`}>

        <div className="text-5xl">
          {roadmap.icon}
        </div>

        <h2 className="mt-4 text-3xl font-bold">
          {roadmap.title}
        </h2>

        <div className="mt-6 grid grid-cols-2 gap-4">

          <div>
            <p className="text-sm opacity-80">Level</p>
            <p>{roadmap.level}</p>
          </div>

          <div>
            <p className="text-sm opacity-80">Duration</p>
            <p>{roadmap.duration}</p>
          </div>

          <div>
            <p className="text-sm opacity-80">Projects</p>
            <p>{roadmap.projects}</p>
          </div>

          <div>
            <p className="text-sm opacity-80">Salary</p>
            <p>{roadmap.salary}</p>
          </div>

        </div>

      </div>

      <div className="p-8">

        <Timeline steps={roadmap.steps} />

        <div className="mt-8 flex gap-4">

          <Link
            to="/courses"
            className="rounded-xl border border-blue-500 px-5 py-3 hover:bg-blue-500"
          >
            View Courses
          </Link>

          <Link
            to="/book-demo"
            className="rounded-xl bg-blue-600 px-5 py-3 hover:bg-blue-700"
          >
            Start Learning
          </Link>

        </div>

      </div>

    </div>
  );
}