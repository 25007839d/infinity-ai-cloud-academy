import apache_beam as beam
import apache_beam.options.pipeline_options

# ---------------------------
# Custom DoFn for ParDo
# ---------------------------
class SalaryCheck(beam.DoFn):
    def process(self, element):
        # Only yield employees with salary > 60000
        if int(element[4]) > 60000:
            yield element

# ---------------------------gh
# Pipeline
# ---------------------------
if __name__ == '__main__':
    options = apache_beam.options.pipeline_options.PipelineOptions()
    with beam.Pipeline(options=options) as p:

        # 1. Read CSV
        employees = (
            p
            | "Read CSV" >> beam.io.ReadFromText("../data/employees.csv", skip_header_lines=1)

            | "Split CSV" >> beam.Map(lambda line: line.split(","))
            # | "see read data" >> beam.Map(print)
        )

        # -----------------------
        # 2. Map: Increase salary by 10%
        # -----------------------
        increased_salary = (
            employees
            | "Increase Salary" >> beam.Map(lambda x: [x[0], x[1], x[2], x[3], str(int(x[4])*1.1), x[5]])
            # | "Print Increased Salary" >> beam.Map(print)
        )

        # -----------------------
        # 3. FlatMap: Split name into characters
        # -----------------------
        name_chars = (
            employees
            | "Split Names to Chars" >> beam.FlatMap(lambda x: list(x[1]))
            # | "Print Name Chars" >> beam.Map(print)
        )

        # -----------------------
        # 4. Filter: Only employees from Finance or IT dept
        # -----------------------
        filtered_dept = (
            employees
            | "Filter Dept" >> beam.Filter(lambda x: x[5] in ["Finance", "IT"])
            # | "Print Filtered Dept" >> beam.Map(print)
        )

        # -----------------------
        # 5. ParDo: Only employees with salary > 60000
        # -----------------------
        high_salary = (
            employees
            | "Salary Check ParDo" >> beam.ParDo(SalaryCheck())
            # | "Print High Salary" >> beam.Map(print)
        )
