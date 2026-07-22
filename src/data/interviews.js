import { resources } from "../../data/resources";
import ResourceCard from "./ResourceCard";

export default function FeaturedResources(){

const featured=resources.filter(r=>r.featured);

return(

<section className="py-16">

<h2 className="text-4xl font-bold mb-10">

⭐ Featured Resources

</h2>

<div className="grid lg:grid-cols-3 gap-8">

{featured.map(resource=>

<ResourceCard

key={resource.id}

resource={resource}

/>

)}

</div>

</section>

);

}