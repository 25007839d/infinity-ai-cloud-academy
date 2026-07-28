import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  Menu,
  X,
  ArrowRight,
} from "lucide-react";

import logo from "../../assets/images/logo.png";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Courses", href: "/courses" },
  { name: "Roadmaps", href: "/roadmaps" },
  { name: "Projects", href: "/projects" },
  { name: "Resources", href: "/resources" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {

  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const location = useLocation();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-slate-800 bg-slate-950/90 backdrop-blur-xl shadow-xl"
          : "bg-transparent"
      }`}
    >      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

        <Link
          to="/"
          className="flex items-center gap-3"
          aria-label="Infinity AI Cloud Academy"
        >

          <motion.img
            whileHover={{ rotate: 4, scale: 1.05 }}
            transition={{ duration: 0.3 }}
            src={logo}
            alt="Infinity AI Cloud Academy Logo"
            className="h-14 w-14 rounded-xl object-contain"
          />

          <div>

            <h2 className="text-lg font-bold text-white">

              Infinity AI Cloud Academy

            </h2>

            <p className="text-xs text-slate-400">

              Learn • Build • Deploy • Grow

            </p>

          </div>

        </Link>

        <nav className="hidden items-center gap-8 lg:flex">

          {navigation.map((item) => {

            const active = location.pathname === item.href;

            return (

              <Link
                key={item.name}
                to={item.href}
                aria-current={active ? "page" : undefined}
                className={`relative font-medium transition ${
                  active
                    ? "text-cyan-400"
                    : "text-slate-300 hover:text-cyan-400"
                }`}
              >

                {item.name}

                {active && (
                  <motion.span
                    layoutId="active-nav"
                    className="absolute -bottom-2 left-0 h-[2px] w-full rounded-full bg-cyan-400"
                  />
                )}

              </Link>

            );

          })}

        </nav>

        <div className="hidden lg:flex">

          <Link
            to="/courses"
            className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3 font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/30"
          >

            Explore Courses

            <ArrowRight
              size={18}
              className="transition-transform group-hover:translate-x-1"
            />

          </Link>

        </div>

        <button
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
          className="rounded-lg p-2 lg:hidden"
        >

          {open ? <X size={28} /> : <Menu size={28} />}

        </button>

      </div>
            <AnimatePresence>

        {open && (

          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="border-t border-slate-800 bg-slate-950 lg:hidden"
          >

            <nav className="flex flex-col gap-2 px-6 py-6">

              {navigation.map((item) => {

                const active = location.pathname === item.href;

                return (

                  <Link
                    key={item.href}
                    to={item.href}
                    className={`rounded-xl px-4 py-4 transition ${
                      active
                        ? "bg-cyan-500/10 font-semibold text-cyan-400"
                        : "text-slate-300 hover:bg-slate-900 hover:text-cyan-400"
                    }`}
                  >

                    {item.name}

                  </Link>

                );

              })}

              <Link
                to="/courses"
                className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 py-4 font-semibold text-white"
              >

                Explore Courses

                <ArrowRight size={18} />

              </Link>

            </nav>

          </motion.div>

        )}

      </AnimatePresence>

    </header>

  );

}