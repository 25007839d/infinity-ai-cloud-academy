import { NavLink } from "react-router-dom";
export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-950 flex">

      {/* Sidebar */}

      <aside className="w-64 bg-slate-900 border-r border-slate-800 p-6">

        <h2 className="text-2xl font-bold text-white">
          Infinity AI CRM
        </h2>

        <nav className="mt-10 space-y-2">

  <NavLink
    to="/admin/dashboard"
    className={({ isActive }) =>
      `block px-4 py-3 rounded-xl ${
        isActive
          ? "bg-blue-600 text-white"
          : "text-slate-300 hover:bg-slate-800"
      }`
    }
  >
    📊 Dashboard
  </NavLink>

  <NavLink
    to="/admin/demo-registrations"
    className={({ isActive }) =>
      `block px-4 py-3 rounded-xl ${
        isActive
          ? "bg-blue-600 text-white"
          : "text-slate-300 hover:bg-slate-800"
      }`
    }
  >
    👥 Demo Registrations
  </NavLink>

  <NavLink
    to="/admin/analytics"
    className={({ isActive }) =>
      `block px-4 py-3 rounded-xl ${
        isActive
          ? "bg-blue-600 text-white"
          : "text-slate-300 hover:bg-slate-800"
      }`
    }
  >
    📈 Analytics
  </NavLink>

</nav>

      </aside>

      {/* Main */}

      <main className="flex-1 p-10 text-white">
        {children}
      </main>

    </div>
  );
}