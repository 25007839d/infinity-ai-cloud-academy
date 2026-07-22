import SearchBar from "./SearchBar";
import CategoryFilter from "./CategoryFilter";

export default function ResourceHero() {
  return (
    <section className="py-20 text-center">

      <span className="rounded-full border border-cyan-500 px-5 py-2 text-cyan-400">
        📚 FREE Learning Hub
      </span>

      <h1 className="mt-8 text-6xl font-bold">
        Learning Resources
      </h1>

      <p className="mx-auto mt-6 max-w-3xl text-lg text-slate-400">
        Download Notes, Cheat Sheets, Interview Questions,
        Templates and GitHub Projects.
      </p>

      <SearchBar />

      <CategoryFilter />

    </section>
  );
}