import {
  FileText,
  Users,
  Briefcase,
  BadgeCheck,
  Handshake
} from "lucide-react";

const support = [
  {
    icon: FileText,
    title: "Resume Building",
    desc: "Professional ATS-friendly resume preparation."
  },
  {
    icon: Users,
    title: "LinkedIn Profile",
    desc: "Optimize your LinkedIn profile for recruiters."
  },
  {
    icon: Users,
    title: "Mock Interviews",
    desc: "Technical + HR interview practice."
  },
  {
    icon: Briefcase,
    title: "Job Preparation",
    desc: "Company-specific interview questions and guidance."
  },
  {
    icon: BadgeCheck,
    title: "Certification",
    desc: "Industry-recognized completion certificate."
  },
  {
    icon: Handshake,
    title: "Career Community",
    desc: "Lifetime mentor and learner community."
  }
];

export default function CareerSupport() {

  return (

<section
id="career"
className="py-24 bg-[#08111F]"
>

<div className="max-w-7xl mx-auto px-6">

<div className="text-center">

<p className="uppercase tracking-[5px] text-blue-400 font-semibold">
Career Support
</p>

<h2 className="text-5xl font-bold mt-4">
Beyond Learning
</h2>

<p className="text-slate-400 max-w-3xl mx-auto mt-6 text-lg">
We don't just teach technologies.
We prepare you to get hired.
</p>

</div>

<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-20">

{support.map((item)=>{

const Icon=item.icon;

return(

<div
key={item.title}
className="rounded-3xl bg-slate-900 border border-slate-800 p-8 hover:border-blue-500 hover:-translate-y-2 duration-300"
>

<div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center">

<Icon size={30} color="white"/>

</div>

<h3 className="text-2xl font-bold mt-8">
{item.title}
</h3>

<p className="text-slate-400 mt-5 leading-8">
{item.desc}
</p>

</div>

)

})}

</div>

</div>

</section>

  );

}