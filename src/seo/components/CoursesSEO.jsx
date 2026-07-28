import PageSEO from "./PageSEO";
import siteConfig from "../config/siteConfig";

export default function CoursesSEO() {
  return (
    <PageSEO
      title="Data Engineering, AI & Cloud Courses"
      description="Explore industry-focused courses in Cloud Data Engineering, Generative AI, Google Cloud Platform, Python, SQL and PySpark with live projects, interview preparation and certification."
      keywords={[
        "Data Engineering Course",
        "Generative AI Course",
        "Google Cloud Course",
        "Python Course",
        "SQL Course",
        "PySpark Course",
        "Cloud Computing Course",
        "Online IT Training",
        "Infinity AI Cloud Academy",
      ].join(", ")}
      url={`${siteConfig.siteUrl}/courses`}
      type="website"
    />
  );
}