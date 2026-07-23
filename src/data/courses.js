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

    curriculum: [
  {
    module: "Python Fundamentals",
    topics: [
      "Introduction to Python",
      "Variables & Data Types",
      "Input & Output",
      "Operators",
      "Conditional Statements",
      "Loops",
      "Functions",
      "Modules & Packages",
    ],
  },

  {
    module: "Advanced Python",
    topics: [
      "Object-Oriented Programming (OOP)",
      "Inheritance",
      "Polymorphism",
      "Encapsulation",
      "Exception Handling",
      "File Handling",
      "Lambda Functions",
      "Decorators",
      "Generators",
      "Iterators",
    ],
  },

  {
    module: "Python Data Structures",
    topics: [
      "Lists",
      "Tuples",
      "Sets",
      "Dictionaries",
      "Comprehensions",
      "Collections Module",
      "String Manipulation",
      "Regular Expressions",
    ],
  },

  {
    module: "NumPy",
    topics: [
      "NumPy Arrays",
      "Indexing & Slicing",
      "Array Operations",
      "Broadcasting",
      "Mathematical Functions",
      "Statistics",
      "Linear Algebra Basics",
    ],
  },

  {
    module: "Pandas",
    topics: [
      "Series",
      "DataFrames",
      "Reading CSV/Excel/JSON",
      "Filtering",
      "Grouping",
      "Merging",
      "Pivot Tables",
      "Data Cleaning",
    ],
  },

  {
    module: "Working with APIs",
    topics: [
      "REST APIs",
      "Requests Library",
      "JSON Handling",
      "Authentication",
      "API Pagination",
      "Error Handling",
    ],
  },

  {
    module: "Database Programming",
    topics: [
      "SQLite",
      "MySQL",
      "PostgreSQL",
      "Connecting with Python",
      "CRUD Operations",
      "Executing SQL Queries",
    ],
  },

  {
    module: "Automation & Scripting",
    topics: [
      "OS Module",
      "Pathlib",
      "Logging",
      "Scheduling",
      "Email Automation",
      "File Automation",
    ],
  },

  {
    module: "Python for Data Engineering",
    topics: [
      "ETL Pipeline",
      "CSV Processing",
      "JSON Processing",
      "Data Validation",
      "Data Transformation",
      "Pipeline Automation",
    ],
  },

  {
    module: "Industry Projects",
    topics: [
      "Employee Management System",
      "REST API Integration",
      "CSV to Database ETL",
      "Web Scraper",
      "Weather Data Pipeline",
      "Email Automation",
      "Sales Data Analysis",
      "Log File Analyzer",
      "Database CRUD Application",
      "Mini Data Engineering Project",
    ],
  },
],
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

   curriculum: [
  {
    module: "SQL Fundamentals",
    topics: [
      "Introduction to Databases",
      "SQL Syntax",
      "Database Objects",
      "Creating Databases",
      "Data Types",
      "Constraints",
      "Primary & Foreign Keys",
    ],
  },

  {
    module: "DDL & DML",
    topics: [
      "CREATE",
      "ALTER",
      "DROP",
      "TRUNCATE",
      "INSERT",
      "UPDATE",
      "DELETE",
      "MERGE",
    ],
  },

  {
    module: "Data Retrieval",
    topics: [
      "SELECT",
      "WHERE",
      "ORDER BY",
      "GROUP BY",
      "HAVING",
      "DISTINCT",
      "LIMIT",
      "Aliases",
    ],
  },

  {
    module: "Joins & Set Operators",
    topics: [
      "INNER JOIN",
      "LEFT JOIN",
      "RIGHT JOIN",
      "FULL OUTER JOIN",
      "SELF JOIN",
      "CROSS JOIN",
      "UNION",
      "UNION ALL",
      "INTERSECT",
      "EXCEPT",
    ],
  },

  {
    module: "Advanced SQL",
    topics: [
      "Subqueries",
      "Correlated Subqueries",
      "Common Table Expressions (CTE)",
      "Recursive CTE",
      "Window Functions",
      "CASE Statements",
      "NULL Handling",
      "Conditional Expressions",
    ],
  },

  {
    module: "Performance & Industry Projects",
    topics: [
      "Indexes",
      "Views",
      "Stored Procedures",
      "Functions",
      "Query Optimization",
      "Execution Plan",
      "SQL Interview Questions",
      "Real-world SQL Projects",
    ],
  },
],
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