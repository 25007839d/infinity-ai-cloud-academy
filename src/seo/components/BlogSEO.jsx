import PageSEO from "./PageSEO";
import { BlogSchema, BreadcrumbSchema } from "../";

export default function BlogSEO({ blog }) {
  if (!blog) return null;

  return (
    <>
      <PageSEO
        title={blog.seo?.title || blog.title}
        description={blog.seo?.description || blog.description}
        keywords={
          blog.seo?.keywords?.join(", ") ||
          blog.keywords?.join(", ")
        }
        image={blog.image}
        url={blog.url}
        type="article"
      />

      <BlogSchema blog={blog} />

      <BreadcrumbSchema
        items={[
          {
            name: "Home",
            path: "/",
          },
          {
            name: "Blog",
            path: "/blog",
          },
          {
            name: blog.title,
            path: blog.url,
          },
        ]}
      />
    </>
  );
}