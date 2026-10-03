# app.py
# PySpark job to read from GCS, join employee + department, perform transformations,
# write result to BigQuery and write Parquet to GCS.

import os
import argparse
import logging

from pyspark.sql import SparkSession
from pyspark.sql.functions import (
    concat_ws, col, to_date, year, current_date, when
)

# -------------------------------------------------------------------
# Logging setup
# -------------------------------------------------------------------
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(name)s - %(message)s"
)
logger = logging.getLogger(__name__)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--gcs_input_path', required=True, help='GCS prefix where CSVs live, e.g. gs://my-bucket/input')
    parser.add_argument('--gcs_output_path', required=True, help='GCS prefix for output, e.g. gs://my-bucket/output')
    parser.add_argument('--bq_output_table', required=True, help='BigQuery table in project.dataset.table')
    parser.add_argument('--temp_gcs', required=True, help='Temporary GCS bucket for BigQuery write, e.g. gs://my-bucket/tmp')
    args = parser.parse_args()

    # Build Spark session with BigQuery connector
    spark = SparkSession.builder \
        .appName('employee-department-join') \
        .config('spark.sql.session.timeZone', 'UTC') \
        .getOrCreate()

    # Optional: reduce Spark log noise, keep your logs readable
    spark.sparkContext.setLogLevel("WARN")

    logger.info("Spark session created")

    # Input paths
    emp_path = os.path.join(args.gcs_input_path, 'employee.csv')
    dep_path = os.path.join(args.gcs_input_path, 'department.csv')

    logger.info("Employee input path: %s", emp_path)
    logger.info("Department input path: %s", dep_path)

    # ----------------------------------------------------------------
    # Read CSVs
    # ----------------------------------------------------------------
    logger.info("Reading employees CSV")
    employees = spark.read.option('header', True).option('inferSchema', False).csv(emp_path)


    logger.info("Employees DF read with columns: %s", employees.columns)

    logger.info("Reading departments CSV")
    departments = spark.read.option('header', True).option('inferSchema', True).csv(dep_path)
    logger.info("Departments DF read with columns: %s", departments.columns)

    # ----------------------------------------------------------------
    # Basic cleaning and transformations on employees
    # ----------------------------------------------------------------
    logger.info("Adding 'full_name' column")
    employees = employees.withColumn('full_name', concat_ws(' ', col('first_name'), col('last_name')))
    logger.info("Added 'full_name' column. Columns now: %s", employees.columns)

    logger.info("Casting 'hire_date' column to date")
    employees = employees.withColumn('hire_date', to_date(col('hire_date'), 'yyyy-MM-dd'))
    logger.info("Casted 'hire_date' to date")

    logger.info("Adding 'years_with_company' column")
    employees = employees.withColumn('years_with_company', year(current_date()) - year(col('hire_date')))
    logger.info("Added 'years_with_company' column. Columns now: %s", employees.columns)

    # ----------------------------------------------------------------
    # Join
    # ----------------------------------------------------------------
    logger.info("Joining employees and departments on 'department_id'")
    joined = employees.join(departments, on='department_id', how='left')
    logger.info("Join complete. Columns in joined DF: %s", joined.columns)

    # ----------------------------------------------------------------
    # Derived fields
    # ----------------------------------------------------------------
    logger.info("Adding 'bonus_pct' column based on title")
    joined = joined.withColumn(
        'bonus_pct',
        when(col('title').rlike('(?i)engineer'), 0.10).otherwise(0.05)
    )
    logger.info("Added 'bonus_pct' column")

    logger.info("Adding 'bonus_amount' column")
    joined = joined.withColumn('bonus_amount', col('salary') * col('bonus_pct'))
    logger.info("Added 'bonus_amount' column")

    logger.info("Adding 'total_compensation' column")
    joined = joined.withColumn('total_compensation', col('salary') + col('bonus_amount'))
    logger.info("Added 'total_compensation' column")

    # ----------------------------------------------------------------
    # Select final columns and order
    # ----------------------------------------------------------------
    final_columns = [
        'employee_id', 'full_name', 'title', 'department_id', 'department_name', 'location',
        'salary', 'bonus_pct', 'bonus_amount', 'total_compensation', 'hire_date', 'years_with_company'
    ]
    logger.info("Selecting final columns: %s", final_columns)
    final = joined.select(*final_columns)

    # Optionally log record count (this triggers a job!)
    try:
        final_count = final.count()
        logger.info("Final dataframe record count: %d", final_count)
    except Exception as e:
        logger.warning("Could not count final dataframe: %s", e)

    # ----------------------------------------------------------------
    # Write to GCS as partitioned Parquet
    # ----------------------------------------------------------------
    output_parquet = os.path.join(args.gcs_output_path, 'employee_department')
    logger.info(
        "Writing final dataframe to GCS (Parquet) at %s partitioned by department_name",
        output_parquet
    )
    final.write.mode('append').partitionBy('department_name').parquet(output_parquet)
    logger.info("Write to GCS Parquet completed")

    # ----------------------------------------------------------------
    # Write to BigQuery
    # ----------------------------------------------------------------
    # logger.info(
    #     "Writing final dataframe to BigQuery table %s using temp bucket %s",
    #     args.bq_output_table,
    #     args.temp_gcs
    # )
    # logger.info("Employees count: %d", employees.count())
    # logger.info("Departments count: %d", departments.count())
    # logger.info("Joined count: %d", joined.count())
    #
    # # Write to BigQuery with extra options
    # # ----------------------------------------------------------------
    # try:
    #     (final.write
    #      .format("bigquery")  # or "com.google.cloud.spark.bigquery" depending on your env
    #      .option("table", args.bq_output_table)  # e.g. "myproj.mydataset.mytable"
    #      .option("temporaryGcsBucket", args.temp_gcs)  # e.g. "my-bucket-tmp"
    #      # You can uncomment if needed:
    #      # .option("writeMethod", "direct")
    #      # .option("partitionField", "department_name")  # if you want partitioning
    #      .mode("append")
    #      .save()
    #      )
    #     logger.info("Write to BigQuery completed without exception.")
    # except Exception as e:
    #     logger.error("Error while writing to BigQuery: %s", e)
    #     raise
    # logger.info("Write to BigQuery completed")
    # spark.stop()
    logger.info("Spark session stopped. Job completed successfully.")


if __name__ == "__main__":
    main()
