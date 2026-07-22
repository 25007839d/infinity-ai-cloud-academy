import { ArrowUp } from "lucide-react";
import { Link } from "react-router-dom";

import {
  FaYoutube,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";

import { FaXTwitter } from "react-icons/fa6";

import logo from "../../assets/images/logo.png";

export default function Footer() {
  return (
    <footer
      id="contact"
      className="bg-[#020617] border-t border-slate-800"
    >
      <div className="max-w-7xl mx-auto px-6 py-20">

        {/* ================= Top Footer ================= */}

        <div className="grid lg:grid-cols-4 gap-12">

          {/* Brand */}

          <div>

            <div className="flex items-center gap-4">

              <img
                src={logo}
                className="w-16 h-16 rounded-xl"
                alt="Infinity AI Cloud Academy"
              />

              <div>

                <h2 className="text-2xl font-bold">
                  Infinity AI Cloud Academy
                </h2>

                <p className="text-slate-400 text-sm">
                  Learn • Build • Deploy • Grow
                </p>

              </div>

            </div>

            <p className="text-slate-400 mt-6 leading-8">

              Learn AI, Data Engineering and Cloud Computing through
              real-world projects with industry mentors.

            </p>

            <div className="flex gap-4 mt-8">

              <a
                href="https://www.youtube.com/@InfinityAICloudAcademy"
                target="_blank"
                rel="noreferrer"
                className="w-11 h-11 rounded-xl bg-slate-800 flex items-center justify-center hover:bg-red-600 transition"
              >
                <FaYoutube size={20} />
              </a>

              <a
                href="https://www.facebook.com/profile.php?id=61591588247466"
                target="_blank"
                rel="noreferrer"
                className="w-11 h-11 rounded-xl bg-slate-800 flex items-center justify-center hover:bg-blue-600 transition"
              >
                <FaFacebook size={20} />
              </a>

              <a
                href="https://www.instagram.com/infinityaicloudacademy/"
                target="_blank"
                rel="noreferrer"
                className="w-11 h-11 rounded-xl bg-slate-800 flex items-center justify-center hover:bg-pink-600 transition"
              >
                <FaInstagram size={20} />
              </a>

              <a
                href="https://www.linkedin.com/company/132614038/"
                target="_blank"
                rel="noreferrer"
                className="w-11 h-11 rounded-xl bg-slate-800 flex items-center justify-center hover:bg-sky-600 transition"
              >
                <FaLinkedin size={20} />
              </a>

              <a
                href="https://x.com/aicloudacd"
                target="_blank"
                rel="noreferrer"
                className="w-11 h-11 rounded-xl bg-slate-800 flex items-center justify-center hover:bg-white hover:text-black transition"
              >
                <FaXTwitter size={18} />
              </a>

            </div>

          </div>

          {/* Quick Links */}

          <div>

            <h3 className="font-bold text-xl mb-6">
              Quick Links
            </h3>

            <ul className="space-y-4 text-slate-400">

              <li>
                <Link to="/">Home</Link>
              </li>

              <li>
                <Link to="/courses">Courses</Link>
              </li>

              <li>
                <Link to="/roadmaps">Roadmaps</Link>
              </li>

              <li>
                <Link to="/projects">Projects</Link>
              </li>

              <li>
                <Link to="/resources">Resources</Link>
              </li>

              <li>
                <Link to="/about">About</Link>
              </li>

              <li>
                <Link to="/contact">Contact</Link>
              </li>

            </ul>

          </div>

          {/* Courses */}

          <div>

            <h3 className="font-bold text-xl mb-6">
              Popular Courses
            </h3>

            <ul className="space-y-4 text-slate-400">

              <li>Data Engineering</li>

              <li>Generative AI</li>

              <li>Google Cloud</li>

              <li>Apache Spark</li>

              <li>Terraform</li>

            </ul>

          </div>

          {/* Contact */}

          <div>

            <h3 className="font-bold text-xl mb-6">
              Contact
            </h3>

            <div className="space-y-5 text-slate-400">

              <p>📍 India</p>

              <p>📧 infinityaicloudacademy@gmail.com</p>

              <p>🌐 www.infinityaicloudacademy.com</p>

              <Link
                to="/book-demo"
                className="inline-block bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl text-white font-semibold transition"
              >
                Book Free Demo
              </Link>

            </div>

          </div>

        </div>

        {/* ================= Footer Links ================= */}

        <div className="border-t border-slate-800 mt-16 pt-8">

          <div className="flex flex-wrap justify-center items-center gap-3 text-sm">

            <Link
              to="/privacy-policy"
              className="text-slate-400 hover:text-white transition"
            >
              Privacy Policy
            </Link>

            <span className="text-slate-600">•</span>

            <Link
              to="/terms"
              className="text-slate-400 hover:text-white transition"
            >
              Terms & Conditions
            </Link>

            <span className="text-slate-600">•</span>

            <Link
              to="/admin/login"
              className="text-blue-400 hover:text-blue-300 font-medium transition"
            >
              Admin Login
            </Link>

          </div>

        </div>

        {/* ================= Copyright ================= */}

        <div className="border-t border-slate-800 mt-8 pt-8 flex flex-col lg:flex-row justify-between items-center">

          <p className="text-slate-500 text-center">

            © {new Date().getFullYear()} Infinity AI Cloud Academy.
            All Rights Reserved.

          </p>

          <button
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              })
            }
            className="mt-6 lg:mt-0 w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center transition"
          >
            <ArrowUp size={20} />
          </button>

        </div>

      </div>

    </footer>
  );
}