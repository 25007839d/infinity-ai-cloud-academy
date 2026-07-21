import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-white">
      <h1 className="text-5xl font-bold">404</h1>

      <p className="mt-4 text-slate-400">
        Page not found
      </p>

      <Link
        to="/"
        className="mt-8 bg-blue-600 px-6 py-3 rounded-xl"
      >
        Go Home
      </Link>
    </div>
  );
}