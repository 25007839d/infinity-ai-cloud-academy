import { Helmet } from "react-helmet-async";
import siteConfig from "../config/siteConfig.js";

export default function BlogSchema({ blog }) {
  if (!blog) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",

    headline: blog.title,

    description: blog.description,

    image:
      blog.image ||
      `${siteConfig.siteUrl}${siteConfig.defaultImage}`,

    url: `${siteConfig.siteUrl}${blog.url}`,

    datePublished: blog.datePublished,

    dateModified: blog.dateModified || blog.datePublished,

    author: {
      "@type": "Organization",
      name: siteConfig.siteName,
    },

    publisher: {
      "@type": "Organization",

      name: siteConfig.siteName,

      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.siteUrl}${siteConfig.logo}`,
      },
    },

    keywords: blog.keywords || [],

    inLanguage: siteConfig.language,
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
}