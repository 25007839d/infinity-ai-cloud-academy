import apache_beam as beam
from apache_beam.options.pipeline_options import PipelineOptions

if __name__ == '__main__':
    options = PipelineOptions()
    with beam.Pipeline(options=options) as p:

        # -----------------------
        # 1. ReadFromText: Read employees.csv
        # -----------------------
        employees = (
            p
            | "Read CSV" >> beam.io.ReadFromText("../data/employees.csv", skip_header_lines=1)
            | "Split CSV" >> beam.Map(lambda line: line.split(","))
        )

        employees | "Print Employees" >> beam.Map(print)

        # -----------------------
        # 2. WriteToText: Save employee names and salaries to a new file
        # -----------------------
        formatted = employees | "Format Name and Salary" >> beam.Map(lambda x: f"{x[1]},{x[4]}")

        formatted | "Write to Text" >> beam.io.WriteToText("employees_name_salary.txt", shard_name_template='')

        # -----------------------
        # 3. ReadFromBigQuery (Placeholder)
        # -----------------------
        # Replace 'project:dataset.table' with your GCP BigQuery table
        # bq_data = (
        #     p
        #     | "Read From BigQuery" >> beam.io.ReadFromBigQuery(query="SELECT name, dept, salary FROM `project.dataset.table`", use_standard_sql=True)
        # )

        # -----------------------
        # 4. WriteToBigQuery (Placeholder)
        # -----------------------
        # bq_data | "Write to BigQuery" >> beam.io.WriteToBigQuery(
        #     table='project:dataset.output_table',
        #     schema='name:STRING, dept:STRING, salary:INTEGER',
        #     write_disposition=beam.io.BigQueryDisposition.WRITE_TRUNCATE,
        #     create_disposition=beam.io.BigQueryDisposition.CREATE_IF_NEEDED
        # )
