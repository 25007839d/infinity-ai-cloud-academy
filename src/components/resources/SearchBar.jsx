import { Search } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="max-w-xl mx-auto mt-10">
      <div className="flex items-center rounded-2xl border border-slate-700 bg-slate-900 px-5 py-4">
        <Search className="text-slate-400" size={20} />

        <input
          type="text"
          placeholder="Search notes, cheat sheets, interview questions..."
          className="ml-3 w-full bg-transparent outline-none text-white placeholder:text-slate-500"
        />
      </div>
    </div>
  );
}