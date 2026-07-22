import { resources } from "../../data/resources";
import ResourceCard from "./ResourceCard";

export default function FeaturedResources() {
  const featured = resources.filter((item) => item.featured);

  return (
    <section className="py-16">
      <h2 className="mb-10 text-4xl font-bold">
        ⭐ Featured Resources
      </h2>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {featured.map((resource) => (
          <ResourceCard
            key={resource.id}
            resource={resource}
          />
        ))}
      </div>
    </section>
  );
}