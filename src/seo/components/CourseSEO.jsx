import PageSEO from "./PageSEO";
import siteConfig from "../config/siteConfig";

export default function CourseSEO({ course }) {
  if (!course) return null;
  const seo = course.seo || {};
  const title = seo.title || course.title;
  const description = seo.description || course.shortDescription || course.overview || "";
  const keywords = Array.isArray(seo.keywords) ? seo.keywords.join(", ") : (seo.keywords || "");
  const url = seo.canonicalUrl || `${siteConfig.siteUrl}/courses/${course.slug}`;
  const imagePath = seo.ogImage || course.thumbnail || siteConfig.defaultImage;
  const image = imagePath.startsWith("http") ? imagePath : `${siteConfig.siteUrl}${imagePath.startsWith("/") ? imagePath : `/${imagePath}`}`;

  return (
    <PageSEO
      title={title}
      description={description}
      keywords={keywords}
      url={url}
      image={image}
      type="website"
      robots={seo.robots || "index,follow"}
    />
  );
}
