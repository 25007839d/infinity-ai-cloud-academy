export default function Analytics() {
  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-5xl font-bold text-white">
          Analytics
        </h1>

        <p className="text-slate-400 mt-2">
          Track leads, conversions and course performance.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6">
          <h3 className="text-slate-400">Today's Leads</h3>
          <p className="text-4xl font-bold mt-3">0</p>
        </div>

        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6">
          <h3 className="text-slate-400">This Week</h3>
          <p className="text-4xl font-bold mt-3">0</p>
        </div>

        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6">
          <h3 className="text-slate-400">This Month</h3>
          <p className="text-4xl font-bold mt-3">0</p>
        </div>

        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6">
          <h3 className="text-slate-400">Total Leads</h3>
          <p className="text-4xl font-bold mt-3">0</p>
        </div>

      </div>

      <div className="bg-slate-900 rounded-2xl border border-slate-800 p-8 h-[450px] flex items-center justify-center">

        <p className="text-slate-400 text-xl">
          📊 Charts Coming Soon
        </p>

      </div>

    </div>
  );
}