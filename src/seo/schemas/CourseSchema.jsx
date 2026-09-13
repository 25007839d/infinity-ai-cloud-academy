import { Helmet } from "react-helmet-async";
import siteConfig from "../config/siteConfig";

export default function CourseSchema({ course }) {
  if (!course) return null;
  const seo = course.seo || {};
  const imagePath = seo.ogImage || course.thumbnail || siteConfig.defaultImage;
  const image = imagePath.startsWith("http") ? imagePath : `${siteConfig.siteUrl}${imagePath.startsWith("/") ? imagePath : `/${imagePath}`}`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.title,
    description: seo.description || course.shortDescription || course.overview || "",
    url: seo.canonicalUrl || `${siteConfig.siteUrl}/courses/${course.slug}`,
    image,
    provider: {
      "@type": "EducationalOrganization",
      "@id": `${siteConfig.siteUrl}/#organization`,
      name: siteConfig.siteName,
      url: siteConfig.siteUrl,
    },
    inLanguage: course.language || siteConfig.language,
    educationalLevel: course.level || undefined,
    teaches: course.technologies || [],
    keywords: seo.keywords || [],
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: course.mode || "Online",
      inLanguage: course.language || siteConfig.language,
    },
  };

  return <Helmet><script type="application/ld+json">{JSON.stringify(schema)}</script></Helmet>;
}
