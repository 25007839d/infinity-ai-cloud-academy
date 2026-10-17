const categories = [
  "All",
  "SQL",
  "Python",
  "PySpark",
  "Cloud",
  "AI",
  "Interview",
  "Resume",
];

export default function CategoryFilter() {
  return (
    <div className="mt-10 flex flex-wrap justify-center gap-3">
      {categories.map((item) => (
        <button
          key={item}
          className="site-tab rounded-full border border-slate-700 px-5 py-2 transition"
        >
          {item}
        </button>
      ))}
    </div>
  );
}