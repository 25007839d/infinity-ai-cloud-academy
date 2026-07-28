import PageSEO from "./PageSEO";
import siteConfig from "../config/siteConfig";

export default function CourseSEO({ course }) {
  if (!course) return null;

  return (
    <PageSEO
      title={course.seo.title}
      description={course.seo.description}
      keywords={course.seo.keywords.join(", ")}
      url={`${siteConfig.siteUrl}/courses/${course.slug}`}
      image={`${siteConfig.siteUrl}${course.thumbnail}`}
      type="course"
    />
  );
}