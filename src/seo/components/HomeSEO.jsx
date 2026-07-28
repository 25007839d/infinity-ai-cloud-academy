import PageSEO from "./PageSEO";
import siteConfig from "../config/siteConfig";

export default function HomeSEO() {
  return (
    <PageSEO
      title="Learn Data Engineering, AI, Cloud & Generative AI Courses"
      description="Master Data Engineering, Artificial Intelligence, Machine Learning, Generative AI, Python, SQL, PySpark, Google Cloud, AWS and Cloud Computing with industry-ready projects, interview preparation and placement assistance."
      keywords={[
        "Data Engineering Course",
        "Artificial Intelligence Course",
        "Machine Learning",
        "Generative AI",
        "Python Course",
        "SQL Course",
        "PySpark Course",
        "Google Cloud",
        "AWS",
        "Cloud Computing",
        "Interview Preparation",
        "Placement Assistance",
        "Infinity AI Cloud Academy",
      ].join(", ")}
      url={siteConfig.siteUrl}
      type="website"
    />
  );
}