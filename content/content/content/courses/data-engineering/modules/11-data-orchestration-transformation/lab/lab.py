from airflow import DAG
from airflow.operators.python import PythonOperator
from datetime import datetime

def extract(): print("extract source data")
def transform(): print("transform and validate")
def load(): print("load curated data")

with DAG("industry_data_pipeline", start_date=datetime(2026,1,1), schedule="0 6 * * *", catchup=False) as dag:
    e=PythonOperator(task_id="extract", python_callable=extract)
    t=PythonOperator(task_id="transform", python_callable=transform)
    l=PythonOperator(task_id="load", python_callable=load)
    e >> t >> l
