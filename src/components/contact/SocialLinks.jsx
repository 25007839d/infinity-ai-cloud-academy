import siteConfig from "../../config/siteConfig";

export default function SocialLinks() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20">

      <h2 className="text-4xl font-bold mb-8">
        Connect With Us
      </h2>

      <div className="flex flex-wrap gap-5">

        <a href={siteConfig.social.youtube} target="_blank" className="rounded-xl bg-red-600 px-6 py-4">
          YouTube
        </a>

        <a href={siteConfig.social.github} target="_blank" className="rounded-xl bg-slate-800 px-6 py-4">
          GitHub
        </a>

        <a href={siteConfig.social.linkedin} target="_blank" className="rounded-xl bg-blue-700 px-6 py-4">
          LinkedIn
        </a>

        <a href={siteConfig.social.instagram} target="_blank" className="rounded-xl bg-pink-600 px-6 py-4">
          Instagram
        </a>

      </div>

    </section>
  );
}