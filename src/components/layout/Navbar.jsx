import { Menu, X } from "lucide-react";
import { useState } from "react";
import logo from "../../assets/images/logo.png";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

const links = [
  { name: "Home", href: "/" },
  { name: "Courses", href: "/courses" },
  { name: "Roadmaps", href: "/roadmaps" },
  { name: "Projects", href: "/projects" },
  { name: "Resources", href: "/resources" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-slate-950/80 backdrop-blur border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">

        <div className="flex items-center gap-3">

          <img
            src={logo}
            alt="Infinity AI Cloud Academy"
            className="w-14 h-14 rounded-xl object-contain"
          />

          <div>
            <h2 className="font-bold text-lg">
              Infinity AI Cloud Academy
            </h2>

            <p className="text-xs text-slate-400">
              Learn • Build • Deploy • Grow
            </p>

          </div>

        </div>

        <nav className="hidden lg:flex gap-8">

          {links.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className={`transition ${
                location.pathname === link.href
                  ? "text-blue-400 font-semibold"
                  : "text-slate-300 hover:text-blue-400"
              }`}
            >
              {link.name}
            </Link>

          ))}

        </nav>

        <Link
          to="/book-demo"
          className="bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-xl transition"
        >
          Book Free Demo
        </Link>

        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden"
        >
          {open ? <X /> : <Menu />}
        </button>

      </div>

      {open && (
        <div className="lg:hidden bg-slate-900 px-6 py-6 flex flex-col gap-5">

          {links.map((item) => (
            <a key={item}>{item}</a>
          ))}

        </div>
      )}

    </header>
  );
}