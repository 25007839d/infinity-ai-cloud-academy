import { Eye, Download } from "lucide-react";

export default function ResourceCard({ resource }) {
  const viewUrl = `${import.meta.env.BASE_URL}${resource.view}`;
  const downloadUrl = `${import.meta.env.BASE_URL}${resource.download}`;

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 hover:border-blue-500 hover:-translate-y-2 transition-all duration-300">

      {/* Icon */}
      <div className="text-5xl">
        📄
      </div>

      {/* Title */}
      <h2 className="mt-5 text-2xl font-bold">
        {resource.title}
      </h2>

      {/* Description */}
      <p className="mt-3 text-slate-400 leading-7">
        {resource.description}
      </p>

      {/* Tags */}
      <div className="mt-5 flex gap-3 flex-wrap">

        <span className="rounded-full bg-blue-900 px-3 py-1 text-sm">
          {resource.type}
        </span>

        <span className="rounded-full bg-slate-800 px-3 py-1 text-sm">
          {resource.level}
        </span>

      </div>

      {/* Buttons */}
      <div className="mt-8 flex gap-4">

        <a
          href={viewUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 hover:bg-blue-700 transition"
        >
          <Eye size={18} />
          View
        </a>

        <a
          href={downloadUrl}
          download
          className="flex items-center gap-2 rounded-xl border border-blue-500 px-5 py-3 hover:bg-blue-600 transition"
        >
          <Download size={18} />
          Download
        </a>

      </div>

    </div>
  );
}