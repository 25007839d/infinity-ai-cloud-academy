import { Link } from "react-router-dom";

export default function ContactHero() {
  return (
    <section className="py-24 text-center">

      <div className="max-w-5xl mx-auto px-6">

        <span className="rounded-full border border-cyan-500 px-5 py-2 text-cyan-400">
          📞 CONTACT US
        </span>

        <h1 className="mt-8 text-6xl font-bold">

          Let's Build Your Tech Career Together

        </h1>

        <p className="mt-8 text-xl text-slate-400">

          Have questions about our courses?

          Book a free demo or contact our team.

        </p>

        <div className="mt-10">

          <Link
            to="/book-demo"
            className="rounded-xl bg-blue-600 px-8 py-4 hover:bg-blue-700"
          >
            Book Free Demo
          </Link>

        </div>

      </div>

    </section>
  );
}