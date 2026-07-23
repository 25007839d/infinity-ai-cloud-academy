import iotBanner from "../assets/technologies/iotArc.png";
import gcpBanner from "../assets/technologies/gcpArc.png";
import sparkBanner from "../assets/technologies/sparkArc.png";
export const projects = [
  {
  id: 1,
  title: "Industrial IoT Data Platform",
  category: "Data Engineering",
  level: "Advanced",
  duration: "4 Weeks",
  image: iotBanner,
  description:
    "Build a complete Industrial IoT platform using ESP32, Supabase, PySpark, BigQuery, Airflow and Looker Studio.",

  technologies: [
    "Python",
    "PySpark",
    "BigQuery",
    "Airflow",
    "Supabase",
    "GCP",
  ],

  github: "https://github.com/25007839d/iot-data-engineering-platform",

  demo: "https://github.com/25007839d/data_engineer1",
},

  {
    id: 2,
    title: "Spark processing ETL",
    category: "Data Engineering",
    level: "Intermediate",
    duration: "2 Weeks",

    image: sparkBanner,

    description:
      "Build an end-to-end ETL pipeline to analyze Spotify listening history.",

    technologies: [
      "Python",
      "SQL",
      "BigQuery",
      "Looker Studio",
    ],

    github: "https://github.com/25007839d/pcm_gcp_project",
    demo: "https://github.com/25007839d/data_engineer1",
  },

  {
    id: 3,
    title: "Google Cloud Platform",

    category: "CICD",

    level: "Advanced",

    duration: "3 Weeks",

    image: gcpBanner,

    description:
      "Create an enterprise CICD deployment on Cloud.",

    technologies: [
      "Airflow",
      "Dataproc/Dataflow",
      "Bigquery",
      "GCS",
      "Terraform",
      "Github",
    ],

    github: "https://github.com/25007839d/pcm_gcp_project",
    demo: "https://github.com/25007839d/data_engineer1",
  },
];