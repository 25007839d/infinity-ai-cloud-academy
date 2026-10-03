from pyspark.sql import SparkSession
from pyspark.sql.functions import avg, count, col

spark = SparkSession.builder.appName("EmployeeAnalytics").getOrCreate()
df = spark.read.option("header", True).option("inferSchema", True).csv("data/employees.csv")

result = (df.groupBy("department")
            .agg(count("*").alias("employee_count"), avg("salary").alias("avg_salary"))
            .orderBy(col("avg_salary").desc()))
result.show(truncate=False)
spark.stop()
