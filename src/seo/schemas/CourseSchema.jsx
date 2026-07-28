import { Helmet } from "react-helmet-async";
import siteConfig from "../config/siteConfig";

export default function CourseSchema({ course }) {
  if (!course) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Course",

    name: course.title,

    description: course.description,

    url: course.url,

    image:
      course.image ||
      `${siteConfig.siteUrl}${siteConfig.defaultImage}`,

    provider: {
      "@type": "EducationalOrganization",

      "@id": `${siteConfig.siteUrl}/#organization`,

      name: siteConfig.siteName,

      url: siteConfig.siteUrl,
    },

    inLanguage: siteConfig.language,

    educationalLevel: course.level,

    teaches: course.skills || [],

    courseCode: course.code || "",

    keywords: course.keywords || [],
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
}