export const courses = [
  {
    id: 1,
    slug: "data-engineering",

    title: "Cloud Data Engineering",

    shortDescription:
      "Master SQL, Python, PySpark, Google Cloud and build production-ready data pipelines.",

    category: "Bootcamp",

    duration: "24 Weeks",

    level: "Beginner → Advanced",

    students: "2500+",

    rating: 4.9,

    projects: 10,

    featured: true,

    technologies:[
  "SQL",
  "Basic Python",
  "Advanced Python",
  "PySpark",
  "Google Cloud (GCP)",
  "Docker",
  "Cloud Build",
  "Terraform",
  "Logging & Monitoring",
  "Looker",
  "Databricks",
  "Jira",
  "CI/CD (GitHub Actions)",
  "Agile",
  "DBT",
  "SCD",
  "Capstone Project"
],

    overview:
      "This bootcamp prepares you for real-world Data Engineering roles through live classes, hands-on projects, assignments, and interview preparation.",

    curriculum:[
  {
    module: "SQL",
    topics: [
      "Database Fundamentals",
      "SELECT Queries",
      "Joins",
      "Subqueries",
      "CTE",
      "Window Functions",
      "Stored Procedures",
      "Performance Tuning",
    ],
  },

  {
    module: "Python Fundamentals",
    topics: [
      "Variables",
      "Data Types",
      "Operators",
      "Loops",
      "Functions",
      "Modules",
      "File Handling",
      "Exception Handling",
    ],
  },

  {
    module: "Advanced Python",
    topics: [
      "OOP",
      "Decorators",
      "Generators",
      "Iterators",
      "Lambda",
      "Comprehensions",
      "Multithreading",
      "API Integration",
    ],
  },

  {
    module: "PySpark",
    topics: [
      "RDD",
      "DataFrame",
      "Spark SQL",
      "Transformations",
      "Actions",
      "Joins",
      "Window Functions",
      "Performance Optimization",
    ],
  },

  {
    module: "Google Cloud Platform",
    topics: [
      "IAM",
      "Cloud Storage",
      "BigQuery",
      "Dataproc",
      "Pub/Sub",
      "Cloud Functions",
      "Cloud Composer",
      "Cloud Scheduler",
    ],
  },

  {
    module: "Docker",
    topics: [
      "Containers",
      "Docker Images",
      "Dockerfile",
      "Docker Compose",
      "Volumes",
      "Networking",
      "Docker Hub",
    ],
  },

  {
    module: "Cloud Build",
    topics: [
      "Build Triggers",
      "Cloud Build YAML",
      "Artifact Registry",
      "Image Deployment",
      "CI Pipeline",
    ],
  },

  {
    module: "Terraform",
    topics: [
      "Infrastructure as Code",
      "Providers",
      "Variables",
      "Resources",
      "Modules",
      "State File",
      "Remote Backend",
      "Terraform on GCP",
    ],
  },

  {
    module: "Logging & Monitoring",
    topics: [
      "Cloud Logging",
      "Cloud Monitoring",
      "Log Explorer",
      "Metrics",
      "Alerts",
      "Dashboards",
      "Error Reporting",
    ],
  },

  {
    module: "Looker Studio",
    topics: [
      "Data Sources",
      "Charts",
      "Filters",
      "Calculated Fields",
      "Dashboards",
      "Reports",
    ],
  },

  {
    module: "Databricks",
    topics: [
      "Workspace",
      "Notebooks",
      "Clusters",
      "Delta Lake",
      "Unity Catalog",
      "Jobs",
    ],
  },

  {
    module: "Jira",
    topics: [
      "Projects",
      "Boards",
      "Sprint Planning",
      "Epics",
      "Stories",
      "Tasks",
      "Bug Tracking",
    ],
  },

  {
    module: "CI/CD with GitHub Actions",
    topics: [
      "Git Basics",
      "GitHub",
      "Branches",
      "Pull Requests",
      "GitHub Actions",
      "Workflow YAML",
      "Deployments",
    ],
  },

  {
    module: "Agile Methodology",
    topics: [
      "Scrum",
      "Sprint",
      "Stand-up",
      "Product Backlog",
      "Sprint Planning",
      "Retrospective",
    ],
  },

  {
    module: "dbt (Data Build Tool)",
    topics: [
      "Models",
      "Seeds",
      "Snapshots",
      "Tests",
      "Sources",
      "Macros",
      "Documentation",
    ],
  },

  {
    module: "Slowly Changing Dimensions (SCD)",
    topics: [
      "Dimension Tables",
      "SCD Type 0",
      "SCD Type 1",
      "SCD Type 2",
      "SCD Type 3",
      "Real-world Implementation",
    ],
  },

  {
    module: "Industry Capstone Project",
    topics: [
      "Requirement Analysis",
      "Data Ingestion",
      "ETL Pipeline",
      "Data Warehouse",
      "Dashboard",
      "CI/CD Deployment",
      "Monitoring",
      "Production Demo",
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