import { Helmet } from "react-helmet-async";
import siteConfig from "../config/siteConfig";

export default function BreadcrumbSchema({ items = [] }) {
  if (!items.length) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",

    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",

      position: index + 1,

      item: {
        "@id": `${siteConfig.siteUrl}${item.url || item.path}`,
        name: item.name,
      },
    })),
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
}