import { repositories } from "../../data/github";

export default function GitHubSection(){

return(

<section className="py-20">

<h2 className="text-4xl font-bold mb-10">

💻 GitHub Repositories

</h2>

<div className="grid md:grid-cols-2 gap-8">

{repositories.map(repo=>(

<a

key={repo.title}

href={repo.url}

target="_blank"

className="rounded-2xl bg-slate-900 p-8 border border-slate-800 hover:border-cyan-500"

>

<h3 className="text-2xl font-bold">

{repo.title}

</h3>

<p className="text-slate-400 mt-3">

{repo.description}

</p>

</a>

))}

</div>

</section>

);

}