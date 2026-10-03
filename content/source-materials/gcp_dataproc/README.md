# PySpark Dataproc -> BigQuery + GCS pipeline

This bundle contains:
- sample data in `data/`
- a PySpark job in `spark_job/app.py`
- an Airflow DAG in `airflow_dag/dags/dataproc_pyspark_dag.py`

## Quick steps

1. Upload files to GCS:
   - gs://your-bucket/input/ (copy the CSVs)
   - gs://your-bucket/jars/ (upload app.py)
   - gs://your-bucket/output/ (results)
   - gs://your-bucket/tmp/ (BigQuery temp)

2. Update `dataproc_pyspark_dag.py` with your project/bucket/dataset names and place the DAG in Airflow's `dags/` folder.

3. Ensure Dataproc's service account has permissions: BigQuery writer, Storage object admin, Dataproc worker.

4. Trigger the DAG from Airflow UI.

## Local testing

Run locally with Spark (example):

spark-submit --master local[4] spark_job/app.py \
  --gcs_input_path file://$(pwd)/data \
  --gcs_output_path file://$(pwd)/local_output \
  --bq_output_table your-gcp-project.your_dataset.employee_department \
  --temp_gcs gs://your-bucket/tmp
