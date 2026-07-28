export const courses = [
  // ==========================================================
  // CLOUD DATA ENGINEERING
  // ==========================================================

  {
    id: 1,

    slug: "data-engineering",

    title: "Cloud Data Engineering",

    tagline: "Become an Industry-Ready Cloud Data Engineer",

    shortDescription:
      "Master SQL, Python, PySpark, Google Cloud and build production-ready data pipelines.",

    overview:
      "This bootcamp prepares you for real-world Data Engineering roles through live classes, hands-on projects, assignments, and interview preparation.",

    thumbnail: "/images/courses/data-engineering.webp",

    banner: "/images/banners/data-engineering-banner.webp",

    category: "Bootcamp",

    duration: "24 Weeks",

    level: "Beginner → Advanced",

    mode: "Online",

    language: "English",

    certificate: {
    available: true,
    title: "Course Completion Certificate"
},

    featured: true,

    students: "2500+",

    rating: 4.9,

    projects: 10,

    modules: 17,

    icon: "Database",

    themeColor: "blue",

    displayOrder: 1,

    comingSoon: false,

    popular: true,

    enrollmentOpen: true,
    
    lastUpdated: "2026-07-28",

    version: "v2.1",

    technologies: [
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
      "Capstone Project",
    ],

    seo: {
      title:
        "Cloud Data Engineering Bootcamp | Infinity AI Cloud Academy",

      description:
        "Master SQL, Python, PySpark, Google Cloud, Airflow, BigQuery, Terraform and build production-ready data pipelines with real-world projects.",

      keywords: [
        "Cloud Data Engineering",
        "Data Engineering Course",
        "Python",
        "SQL",
        "PySpark",
        "Google Cloud",
        "BigQuery",
        "Terraform",
        "Airflow",
        "Docker",
      ],
    },

    curriculum: [
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

  // ==========================================================
  // GENERATIVE AI ENGINEERING
  // ==========================================================
  {
    id: 2,

    slug: "generative-ai",

    title: "Generative AI Engineering",

    tagline: "Build Production-Ready AI Applications with LLMs",

    shortDescription:
      "Learn Prompt Engineering, LangChain, RAG, AI Agents and build real-world Generative AI applications.",

    overview:
      "Master modern Generative AI technologies with hands-on projects and build enterprise-ready AI applications using OpenAI, LangChain, RAG, AI Agents, and Vector Databases.",

    thumbnail: "/images/courses/generative-ai.webp",

    banner: "/images/banners/generative-ai-banner.webp",

    category: "Artificial Intelligence",

    duration: "16 Weeks",

    level: "Intermediate",

    mode: "Online",

    language: "English",

    certificate: {
    available: true,
    title: "Course Completion Certificate"
},

    featured: false,

    students: "800+",

    rating: 4.9,

    projects: 12,

    modules: 12,

    icon: "Database",

    themeColor: "blue",

    displayOrder: 1,

    comingSoon: false,

    popular: true,

    enrollmentOpen: true,

    lastUpdated: "2026-07-28",

    version: "v2.1",

    technologies: [
      "OpenAI",
      "Prompt Engineering",
      "LangChain",
      "LangGraph",
      "RAG",
      "Vector Database",
      "ChromaDB",
      "FAISS",
      "Pinecone",
      "FastAPI",
      "Docker",
      "Cloud Run",
    ],

    seo: {
      title:
        "Generative AI Engineering Course | Infinity AI Cloud Academy",

      description:
        "Master Generative AI using OpenAI, Prompt Engineering, LangChain, LangGraph, RAG, Vector Databases and AI Agents through real-world projects.",

      keywords: [
        "Generative AI Course",
        "OpenAI",
        "Prompt Engineering",
        "LangChain",
        "LangGraph",
        "RAG",
        "Vector Database",
        "AI Agents",
        "LLM",
        "ChatGPT",
      ],
    },

    curriculum: [
      {
        module: "Generative AI Fundamentals",
        topics: [
          "What is Generative AI?",
          "AI vs ML vs Deep Learning",
          "Large Language Models (LLMs)",
          "Transformers",
          "Tokenization",
          "Embeddings",
          "Open Source vs Closed Models",
        ],
      },

      {
        module: "Prompt Engineering",
        topics: [
          "Prompt Basics",
          "Prompt Patterns",
          "Zero-shot Prompting",
          "One-shot Prompting",
          "Few-shot Prompting",
          "Chain of Thought",
          "Role Prompting",
          "Prompt Optimization",
        ],
      },

      {
        module: "Python for AI",
        topics: [
          "Virtual Environment",
          "OpenAI SDK",
          "Requests",
          "JSON",
          "Async Programming",
          "Environment Variables",
          "API Integration",
        ],
      },

      {
        module: "OpenAI API",
        topics: [
          "Chat Completions",
          "Responses API",
          "Streaming Responses",
          "Function Calling",
          "Structured Outputs",
          "Image Generation",
          "Audio Models",
          "Embeddings API",
        ],
      },

      {
        module: "LangChain",
        topics: [
          "LLMs",
          "Chat Models",
          "Prompt Templates",
          "Chains",
          "LCEL",
          "Output Parsers",
          "Memory",
          "Callbacks",
        ],
      },

      {
        module: "LangGraph",
        topics: [
          "Nodes",
          "Edges",
          "State Management",
          "Conditional Routing",
          "Human in the Loop",
          "Multi-step Workflows",
          "Agent Graphs",
        ],
      },

      {
        module: "Vector Databases",
        topics: [
          "Embeddings",
          "Similarity Search",
          "ChromaDB",
          "Pinecone",
          "FAISS",
          "Weaviate",
          "Indexing",
        ],
      },

      {
        module: "Retrieval Augmented Generation (RAG)",
        topics: [
          "Document Loading",
          "Chunking",
          "Embedding Documents",
          "Retrievers",
          "Hybrid Search",
          "Context Injection",
          "RAG Pipeline",
        ],
      },

      {
        module: "AI Agents",
        topics: [
          "What are AI Agents?",
          "Tool Calling",
          "Agent Memory",
          "Planning",
          "Reasoning",
          "Multi-Agent Systems",
          "Agent Workflows",
        ],
      },

      {
        module: "Model Deployment",
        topics: [
          "FastAPI",
          "Docker",
          "Cloud Run",
          "Render",
          "Vercel",
          "API Deployment",
          "Monitoring",
        ],
      },

      {
        module: "LLM Evaluation & Guardrails",
        topics: [
          "Hallucinations",
          "Prompt Injection",
          "Guardrails",
          "Evaluation Metrics",
          "Observability",
          "Testing AI Applications",
        ],
      },

      {
        module: "Industry Projects",
        topics: [
          "PDF Chatbot",
          "AI Resume Analyzer",
          "AI Email Assistant",
          "AI Code Generator",
          "Customer Support Bot",
          "Knowledge Base Chatbot",
          "AI Research Assistant",
          "Multi-Agent System",
          "Voice AI Assistant",
          "SQL AI Assistant",
          "Document Search Engine",
          "Enterprise RAG Application",
        ],
      },
    ],
  },

  // ==========================================================
  // GOOGLE CLOUD PLATFORM
  // ==========================================================
  {
    id: 3,

    slug: "google-cloud",

    title: "Google Cloud Platform",

    tagline: "Master Google Cloud for Data Engineering & AI",

    shortDescription:
      "Learn Google Cloud services for Data Engineering and AI workloads.",

    overview:
      "Master Google Cloud Platform with practical labs, real-world projects, and production-ready cloud architectures for modern Data Engineering and AI solutions.",

    thumbnail: "/images/courses/google-cloud.webp",

    banner: "/images/banners/google-cloud-banner.webp",

    category: "Cloud Computing",

    duration: "8 Weeks",

    level: "Intermediate",

    mode: "Online",

    language: "English",

    certificate: {
    available: true,
    title: "Course Completion Certificate"
},

    featured: false,

    students: "650+",

    rating: 4.8,

    projects: 8,

    modules: 12,

    icon: "Database",

    themeColor: "blue",

    displayOrder: 1,

    comingSoon: false,

    popular: true,

    enrollmentOpen: true,

    lastUpdated: "2026-07-28",

    version: "v2.1",

    technologies: [
      "Google Cloud Platform",
      "IAM",
      "Cloud Storage",
      "BigQuery",
      "Dataproc",
      "Pub/Sub",
      "Cloud Composer",
      "Cloud Functions",
      "Cloud Run",
      "Terraform",
      "Cloud Build",
      "Monitoring",
    ],

    seo: {
      title:
        "Google Cloud Platform Course | Infinity AI Cloud Academy",

      description:
        "Learn Google Cloud Platform with BigQuery, Dataproc, Cloud Storage, Pub/Sub, Cloud Composer, Terraform and build production-ready cloud data pipelines.",

      keywords: [
        "Google Cloud",
        "Google Cloud Platform",
        "GCP Course",
        "BigQuery",
        "Dataproc",
        "Cloud Storage",
        "Cloud Composer",
        "Pub/Sub",
        "Terraform",
        "Cloud Build",
      ],
    },

    curriculum: [
      {
        module: "Google Cloud Fundamentals",
        topics: [
          "Cloud Computing Basics",
          "Google Cloud Overview",
          "Projects & Organization",
          "Billing",
          "Cloud Console",
          "Cloud Shell",
          "Cloud SDK (gcloud CLI)",
        ],
      },

      {
        module: "Identity & Access Management (IAM)",
        topics: [
          "IAM Fundamentals",
          "Users & Groups",
          "Roles",
          "Permissions",
          "Service Accounts",
          "IAM Policies",
          "Best Practices",
        ],
      },

      {
        module: "Google Cloud Storage (GCS)",
        topics: [
          "Buckets",
          "Objects",
          "Storage Classes",
          "Lifecycle Management",
          "Versioning",
          "Signed URLs",
          "Access Control",
        ],
      },

      {
        module: "BigQuery",
        topics: [
          "Datasets",
          "Tables",
          "Loading Data",
          "Partitioning",
          "Clustering",
          "SQL Queries",
          "Views",
          "Performance Optimization",
        ],
      },

      {
        module: "Dataproc & PySpark",
        topics: [
          "Dataproc Clusters",
          "PySpark Jobs",
          "Job Submission",
          "Cluster Scaling",
          "Workflow Templates",
          "Optimization",
        ],
      },

      {
        module: "Pub/Sub & Streaming",
        topics: [
          "Topics",
          "Subscriptions",
          "Publishers",
          "Consumers",
          "Dead Letter Queue",
          "Real-time Pipelines",
        ],
      },

      {
        module: "Cloud Composer (Apache Airflow)",
        topics: [
          "Airflow Basics",
          "DAGs",
          "Operators",
          "Sensors",
          "Scheduling",
          "Monitoring",
          "Production Pipelines",
        ],
      },

      {
        module: "Cloud Functions & Cloud Run",
        topics: [
          "Serverless Computing",
          "Cloud Functions",
          "Cloud Run",
          "HTTP Triggers",
          "Event-driven Architecture",
          "Deployment",
        ],
      },

      {
        module: "Infrastructure as Code",
        topics: [
          "Terraform Basics",
          "Providers",
          "Resources",
          "Variables",
          "Modules",
          "Deploy GCP Infrastructure",
        ],
      },

      {
        module: "Monitoring & Logging",
        topics: [
          "Cloud Logging",
          "Cloud Monitoring",
          "Log Explorer",
          "Metrics",
          "Alerts",
          "Dashboards",
        ],
      },

      {
        module: "CI/CD on Google Cloud",
        topics: [
          "Cloud Build",
          "Artifact Registry",
          "GitHub Actions",
          "Build Triggers",
          "Deployment Pipeline",
        ],
      },

      {
        module: "Industry Projects",
        topics: [
          "GCS to BigQuery Pipeline",
          "PySpark ETL Pipeline",
          "Streaming Pipeline with Pub/Sub",
          "Cloud Composer Workflow",
          "Terraform Infrastructure",
          "Cloud Run API Deployment",
          "Production Monitoring",
          "End-to-End Data Engineering Project",
        ],
      },
    ],
  },

  // ==========================================================
  // PYTHON PROGRAMMING
  // ==========================================================
  // ==========================================================
  // PYTHON PROGRAMMING
  // ==========================================================

  {
    id: 4,

    slug: "python",

    title: "Python Programming",

    tagline: "Master Python from Beginner to Advanced",

    shortDescription:
      "Learn Python from basics to advanced with Data Engineering examples.",

    overview:
      "Build a strong Python foundation and master advanced programming concepts including OOP, APIs, NumPy, Pandas, Automation, and Data Engineering projects.",

    thumbnail: "/images/courses/python.webp",

    banner: "/images/banners/python-banner.webp",

    category: "Programming",

    duration: "8 Weeks",

    level: "Beginner",

    mode: "Online",

    language: "English",

    certificate: {
    available: true,
    title: "Course Completion Certificate"
},

    featured: false,

    students: "1000+",

    rating: 4.8,

    projects: 10,

    modules: 10,

    icon: "Database",

    themeColor: "blue",

    displayOrder: 1,

    comingSoon: false,

    popular: true,

    enrollmentOpen: true,

    lastUpdated: "2026-07-28",

    version: "v2.1",

    technologies: [
      "Python",
      "OOP",
      "NumPy",
      "Pandas",
      "REST API",
      "JSON",
      "Automation",
      "SQLite",
      "PostgreSQL",
      "MySQL",
    ],

    seo: {
      title:
        "Python Programming Course | Infinity AI Cloud Academy",

      description:
        "Master Python Programming with OOP, NumPy, Pandas, APIs, Automation and real-world Data Engineering projects.",

      keywords: [
        "Python",
        "Python Programming",
        "Python Course",
        "NumPy",
        "Pandas",
        "Automation",
        "REST API",
        "OOP",
      ],
    },

    curriculum: [
      // KEEP YOUR EXISTING PYTHON CURRICULUM HERE
    ],
  },



  // ==========================================================
  // SQL MASTERY
  // ==========================================================

  {
    id: 5,

    slug: "sql",

    title: "SQL Mastery",

    tagline: "Master SQL for Analytics & Data Engineering",

    shortDescription:
      "Master SQL with real-world database projects and interview questions.",

    overview:
      "Become proficient in SQL from fundamentals to advanced querying techniques used by Data Engineers, Analysts, and Software Developers.",

    thumbnail: "/images/courses/sql.webp",

    banner: "/images/banners/sql-banner.webp",

    category: "Programming",

    duration: "6 Weeks",

    level: "Beginner",

    mode: "Online",

    language: "English",

    certificate: {
    available: true,
    title: "Course Completion Certificate"
},

    featured: false,

    students: "1500+",

    rating: 4.9,

    projects: 6,

    modules: 6,

    icon: "Database",

    themeColor: "blue",

    displayOrder: 1,

    comingSoon: false,

    popular: true,

    enrollmentOpen: true,

    lastUpdated: "2026-07-28",

    version: "v2.1",

    technologies: [
      "SQL",
      "DDL",
      "DML",
      "Joins",
      "CTE",
      "Window Functions",
      "Indexes",
      "Stored Procedures",
      "Performance Tuning",
    ],

    seo: {
      title:
        "SQL Mastery Course | Infinity AI Cloud Academy",

      description:
        "Master SQL from beginner to advanced with Joins, CTE, Window Functions, Query Optimization and real-world database projects.",

      keywords: [
        "SQL",
        "SQL Course",
        "Database",
        "MySQL",
        "PostgreSQL",
        "Oracle",
        "Window Functions",
        "CTE",
        "SQL Interview",
      ],
    },

    curriculum: [
      // KEEP YOUR EXISTING SQL CURRICULUM HERE
    ],
  },



  // ==========================================================
  // PYSPARK MASTERY
  // ==========================================================
  {
    id: 6,

    slug: "pyspark",

    title: "PySpark Mastery",

    tagline: "Master Distributed Data Processing with Apache Spark",

    shortDescription:
      "Master Apache Spark with PySpark for large-scale data processing.",

    overview:
      "Learn Apache Spark and PySpark from fundamentals to advanced concepts including Spark SQL, DataFrames, RDDs, performance optimization, and build real-world Data Engineering projects.",

    thumbnail: "/images/courses/pyspark.webp",

    banner: "/images/banners/pyspark-banner.webp",

    category: "Programming",

    duration: "6 Weeks",

    level: "Intermediate",

    mode: "Online",

    language: "English",

    certificate: {
    available: true,
    title: "Course Completion Certificate"
},

    featured: false,

    students: "550+",

    rating: 4.8,

    projects: 8,

    modules: 8,
    icon: "Database",

    themeColor: "blue",

    displayOrder: 1,

    comingSoon: false,

    popular: true,

    enrollmentOpen: true,

    lastUpdated: "2026-07-28",

    version: "v2.1",

    technologies: [
      "Apache Spark",
      "PySpark",
      "RDD",
      "DataFrame",
      "Spark SQL",
      "UDF",
      "Window Functions",
      "Parquet",
      "Data Lake",
      "BigQuery",
    ],

    seo: {
      title:
        "PySpark Mastery Course | Infinity AI Cloud Academy",

      description:
        "Learn Apache Spark and PySpark with Spark SQL, DataFrames, RDD, Performance Optimization and real-world ETL projects.",

      keywords: [
        "PySpark",
        "Apache Spark",
        "Spark SQL",
        "RDD",
        "DataFrame",
        "Big Data",
        "ETL",
        "Data Engineering",
      ],
    },

    curriculum: [
      {
        module: "Apache Spark Fundamentals",
        topics: [
          "Introduction to Big Data",
          "Apache Spark Architecture",
          "Spark Components",
          "Spark Cluster",
          "Driver & Executors",
          "SparkSession",
          "Spark Context",
        ],
      },

      {
        module: "RDD Programming",
        topics: [
          "Creating RDDs",
          "RDD Transformations",
          "RDD Actions",
          "Pair RDD",
          "Caching & Persistence",
          "Broadcast Variables",
          "Accumulators",
        ],
      },

      {
        module: "DataFrames & Spark SQL",
        topics: [
          "Creating DataFrames",
          "Schema Definition",
          "Reading CSV/JSON/Parquet",
          "Writing Data",
          "Spark SQL",
          "Temporary Views",
          "DataFrame Operations",
        ],
      },

      {
        module: "Data Transformation",
        topics: [
          "Select",
          "Filter",
          "withColumn",
          "Drop",
          "Rename Columns",
          "Sorting",
          "Distinct",
          "Duplicates Handling",
        ],
      },

      {
        module: "Joins & Aggregations",
        topics: [
          "Inner Join",
          "Left Join",
          "Right Join",
          "Full Join",
          "Cross Join",
          "Group By",
          "Aggregations",
          "Pivot",
        ],
      },

      {
        module: "Advanced PySpark",
        topics: [
          "User Defined Functions (UDF)",
          "Window Functions",
          "Partitions",
          "Repartition vs Coalesce",
          "Broadcast Join",
          "Performance Optimization",
          "Lazy Evaluation",
        ],
      },

      {
        module: "File Formats & Data Lake",
        topics: [
          "CSV",
          "JSON",
          "Parquet",
          "ORC",
          "Partitioned Data",
          "Data Lake Concepts",
        ],
      },

      {
        module: "Industry Projects",
        topics: [
          "CSV to Parquet ETL",
          "Customer Sales Analytics",
          "Log File Processing",
          "IoT Sensor Data Pipeline",
          "BigQuery Data Pipeline",
          "Data Cleaning Pipeline",
          "Performance Optimization Project",
          "End-to-End Data Engineering Project",
        ],
      },
    ],
  },
];