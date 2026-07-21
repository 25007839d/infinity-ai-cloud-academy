export const courses = [
  {
    id: 1,
    slug: "data-engineering",

    title: "Data Engineering Bootcamp",

    shortDescription:
      "Master SQL, Python, PySpark, Google Cloud and build production-ready data pipelines.",

    category: "Bootcamp",

    duration: "24 Weeks",

    level: "Beginner → Advanced",

    students: "2500+",

    rating: 4.9,

    projects: 15,

    featured: true,

    technologies: [
      "SQL",
      "Python",
      "PySpark",
      "Airflow",
      "BigQuery",
      "GCP",
      "Terraform",
    ],

    overview:
      "This bootcamp prepares you for real-world Data Engineering roles through live classes, hands-on projects, assignments, and interview preparation.",

    curriculum: [
      {
        module: "SQL",
        topics: [
          "Introduction to SQL",
          "DDL & DML",
          "Constraints",
          "Functions",
          "Joins",
          "Window Functions",
          "CTE",
          "Views",
          "Indexes",
        ],
      },
      {
        module: "Python",
        topics: [
          "Variables",
          "Loops",
          "Functions",
          "OOP",
          "NumPy",
          "Pandas",
        ],
      },
      {
        module: "PySpark",
        topics: [
          "RDD",
          "DataFrame",
          "Transformations",
          "Actions",
          "Joins",
          "Window Functions",
        ],
      },
      {
        module: "Google Cloud",
        topics: [
          "IAM",
          "Cloud Storage",
          "BigQuery",
          "Dataproc",
          "Pub/Sub",
          "Composer",
        ],
      },
    ],
  },

  {
    id: 2,
    slug: "generative-ai",

    title: "Generative AI Engineering",

    shortDescription:
      "Learn Prompt Engineering, LangChain, RAG, AI Agents and build real-world Generative AI applications.",

    category: "AI",

    duration: "16 Weeks",

    level: "Intermediate",

    students: "800+",

    rating: 4.9,

    projects: 12,

    featured: false,

    technologies: [
      "OpenAI",
      "LangChain",
      "LangGraph",
      "RAG",
      "Vector DB",
    ],

    overview:
      "Master modern Generative AI technologies with hands-on projects and production-ready AI applications.",

    curriculum: [],
  },

  {
    id: 3,
    slug: "google-cloud",

    title: "Google Cloud Platform",

    shortDescription:
      "Learn Google Cloud services for Data Engineering and AI workloads.",

    category: "Cloud",

    duration: "8 Weeks",

    level: "Intermediate",

    students: "650+",

    rating: 4.8,

    projects: 8,

    featured: false,

    technologies: [
      "IAM",
      "GCS",
      "BigQuery",
      "Dataproc",
      "Composer",
    ],

    overview:
      "Master Google Cloud Platform with practical labs and production use cases.",

    curriculum: [],
  },

  {
    id: 4,
    slug: "python",

    title: "Python Programming",

    shortDescription:
      "Learn Python from basics to advanced with Data Engineering examples.",

    category: "Programming",

    duration: "8 Weeks",

    level: "Beginner",

    students: "1000+",

    rating: 4.8,

    projects: 10,

    featured: false,

    technologies: ["Python", "OOP", "NumPy", "Pandas"],

    overview:
      "Complete Python programming course from beginner to advanced.",

    curriculum: [],
  },

  {
    id: 5,
    slug: "sql",

    title: "SQL Mastery",

    shortDescription:
      "Master SQL with real-world database projects and interview questions.",

    category: "Programming",

    duration: "6 Weeks",

    level: "Beginner",

    students: "1500+",

    rating: 4.9,

    projects: 6,

    featured: false,

    technologies: [
      "DDL",
      "DML",
      "Joins",
      "Window Functions",
    ],

    overview:
      "Become proficient in SQL from fundamentals to advanced queries.",

    curriculum: [],
  },

  {
    id: 6,
    slug: "pyspark",

    title: "PySpark Mastery",

    shortDescription:
      "Master Apache Spark with PySpark for large-scale data processing.",

    category: "Programming",

    duration: "6 Weeks",

    level: "Intermediate",

    students: "550+",

    rating: 4.8,

    projects: 8,

    featured: false,

    technologies: [
      "RDD",
      "DataFrame",
      "UDF",
      "Window Functions",
    ],

    overview:
      "Learn distributed data processing using Apache Spark and PySpark.",

    curriculum: [],
  },
];