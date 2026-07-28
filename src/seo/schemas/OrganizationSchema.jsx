import { Helmet } from "react-helmet-async";
import siteConfig from "../config/siteConfig";

export default function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",

    "@id": `${siteConfig.siteUrl}/#organization`,

    name: siteConfig.siteName,

    legalName: siteConfig.company.legalName,

    url: siteConfig.siteUrl,

    logo: `${siteConfig.siteUrl}/logo.png`,

    image: `${siteConfig.siteUrl}${siteConfig.defaultImage}`,

    description: siteConfig.academy.description,

    email: siteConfig.contact.email,

    telephone: siteConfig.contact.phone,

    address: {
      "@type": "PostalAddress",
      addressCountry: "IN",
      addressLocality: siteConfig.company.address,
    },

    foundingDate: siteConfig.academy.founded,

    sameAs: Object.values(siteConfig.social).filter(Boolean),
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
}