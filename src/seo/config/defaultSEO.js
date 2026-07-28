// src/seo/config/defaultSEO.js

import siteConfig from "./siteConfig";

const defaultSEO = {
  title:
    "Infinity AI Cloud Academy | Data Engineering, Cloud & Generative AI Training",

  description:
    "Learn Data Engineering, Google Cloud Platform (GCP), Generative AI, Machine Learning, DevOps, Python, SQL, PySpark and build real-world industry projects with live online training.",

  keywords: [
    "Infinity AI Cloud Academy",
    "Data Engineering Course",
    "Generative AI Course",
    "Google Cloud Platform",
    "GCP Training",
    "Cloud Computing",
    "Python Course",
    "SQL Course",
    "PySpark Course",
    "Machine Learning",
    "DevOps",
    "Big Data",
    "Apache Spark",
    "Apache Airflow",
    "ETL",
    "Data Pipeline",
    "Online IT Training",
    "Live Online Classes",
    "Industry Projects",
  ],

  robots: "index,follow",

  type: "website",

  image: `${siteConfig.siteUrl}${siteConfig.defaultImage}`,
};

export default defaultSEO;