import { playlists } from "../../data/youtube";

export default function YoutubeSection(){

return(

<section className="py-20">

<h2 className="text-4xl font-bold mb-10">

🎥 YouTube Playlists

</h2>

<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

{playlists.map(item=>(

<a

key={item.id}

href={item.url}

target="_blank"

className="rounded-2xl bg-slate-900 border border-slate-800 p-6 hover:border-red-500 transition"

>

<h3 className="font-bold text-xl">

{item.title}

</h3>

<p className="text-slate-400 mt-3">

{item.videos} Videos

</p>

</a>

))}

</div>

</section>

);

}