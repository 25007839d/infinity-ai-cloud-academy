import { Helmet } from "react-helmet-async";
import siteConfig from "../config/siteConfig";

export default function WebsiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",

    "@id": `${siteConfig.siteUrl}/#website`,

    url: siteConfig.siteUrl,

    name: siteConfig.siteName,

    description: siteConfig.academy.description,

    inLanguage: siteConfig.language,

    publisher: {
      "@id": `${siteConfig.siteUrl}/#organization`,
    },

    potentialAction: {
      "@type": "SearchAction",
      target: `${siteConfig.siteUrl}/courses?search={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
}