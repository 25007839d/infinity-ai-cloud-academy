import { Search, RotateCcw, Download } from "lucide-react";

export default function LeadFilters({
  search,
  setSearch,
  course,
  setCourse,
  status,
  setStatus,
  onRefresh,
  onExport,
}) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 mb-6">

      <div className="grid lg:grid-cols-5 gap-4">

        {/* Search */}

        <div className="relative lg:col-span-2">

          <Search
            size={18}
            className="absolute left-4 top-4 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search Name, Email, Phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-800 rounded-xl py-3 pl-11 pr-4"
          />

        </div>

        {/* Course */}

        <select
          value={course}
          onChange={(e) => setCourse(e.target.value)}
          className="bg-slate-800 rounded-xl px-4"
        >
          <option value="">All Courses</option>
          <option>Data Engineering</option>
          <option>Generative AI</option>
          <option>Google Cloud</option>
          <option>AWS Data Engineering</option>
          <option>Azure Data Engineering</option>
          <option>Python for Data Engineering</option>
        </select>

        {/* Status */}

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="bg-slate-800 rounded-xl px-4"
        >
          <option value="">All Status</option>
          <option>New</option>
          <option>Contacted</option>
          <option>Demo Scheduled</option>
          <option>Follow Up</option>
          <option>Joined</option>
          <option>Not Interested</option>
        </select>

        {/* Buttons */}

        <div className="flex gap-3">

          <button
            onClick={onRefresh}
            className="flex-1 bg-slate-700 hover:bg-slate-600 rounded-xl flex justify-center items-center"
          >
            <RotateCcw size={18} />
          </button>

          <button
            onClick={onExport}
            className="flex-1 bg-blue-600 hover:bg-blue-700 rounded-xl flex justify-center items-center"
          >
            <Download size={18} />
          </button>

        </div>

      </div>

    </div>
  );
}