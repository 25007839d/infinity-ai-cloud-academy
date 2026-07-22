import siteConfig from "../../config/siteConfig";
import { Link } from "react-router-dom";

export default function QuickActions() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-24">

      <div className="rounded-3xl bg-gradient-to-r from-blue-700 to-cyan-600 p-12 text-center">

        <h2 className="text-5xl font-bold">
          Ready to Start?
        </h2>

        <p className="mt-6 text-lg">
          Join our community and book your free demo.
        </p>

        <div className="flex flex-wrap justify-center gap-5 mt-10">

          <Link
            to="/book-demo"
            className="rounded-xl bg-white text-blue-700 px-6 py-4 font-semibold"
          >
            Book Demo
          </Link>

          <a
            href={siteConfig.community.whatsappGroup}
            target="_blank"
            rel="noreferrer"
            className="rounded-xl bg-green-600 px-6 py-4"
          >
            WhatsApp Group
          </a>

          <a
            href={siteConfig.community.whatsappChannel}
            target="_blank"
            rel="noreferrer"
            className="rounded-xl bg-green-700 px-6 py-4"
          >
            WhatsApp Channel
          </a>

        </div>

      </div>

    </section>
  );
}