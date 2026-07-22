import { resources } from "../../data/resources";

import ResourceCard from "./ResourceCard";

export default function ResourceGrid() {

  return (

    <section className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 pb-24">

      {resources.map((resource) => (

        <ResourceCard
          key={resource.id}
          resource={resource}
        />

      ))}

    </section>

  );

}