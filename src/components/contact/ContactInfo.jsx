import {
  Mail,
  Phone,
  Clock,
  Globe,
} from "lucide-react";

import siteConfig from "../../config/siteConfig";

export default function ContactInfo() {
  const cards = [
    {
      icon: <Mail size={32} className="text-cyan-400" />,
      title: "Email",
      value: siteConfig.contact.email,
      link: `mailto:${siteConfig.contact.email}`,
    },
    {
      icon: <Phone size={32} className="text-cyan-400" />,
      title: "Phone",
      value: siteConfig.contact.phone,
      link: `tel:${siteConfig.contact.phone}`,
    },
    {
      icon: <Clock size={32} className="text-cyan-400" />,
      title: "Working Hours",
      value: siteConfig.company.workingHours,
      link: null,
    },
    {
      icon: <Globe size={32} className="text-cyan-400" />,
      title: "Mode",
      value: siteConfig.academy.mode,
      link: null,
    },
  ];

  return (
    <section className="py-20 bg-[#07111f]">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">

          <span className="rounded-full border border-cyan-500 px-5 py-2 text-cyan-400">
            CONTACT INFORMATION
          </span>

          <h2 className="mt-6 text-5xl font-bold">
            Get In Touch
          </h2>

          <p className="mt-5 text-lg text-slate-400">
            We'd love to hear from you.
          </p>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {cards.map((item) => (

            <div
              key={item.title}
              className="rounded-2xl border border-slate-800 bg-slate-900 p-8 hover:border-cyan-500 transition duration-300"
            >

              {item.icon}

              <h3 className="mt-6 text-2xl font-bold">

                {item.title}

              </h3>

              {item.link ? (

                <a
                  href={item.link}
                  className="mt-5 block text-slate-400 hover:text-cyan-400 break-all"
                >
                  {item.value}
                </a>

              ) : (

                <p className="mt-5 text-slate-400">

                  {item.value}

                </p>

              )}

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}