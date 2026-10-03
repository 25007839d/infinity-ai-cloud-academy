import apache_beam as beam
from apache_beam.options.pipeline_options import PipelineOptions

if __name__ == '__main__':
    options = PipelineOptions()
    with beam.Pipeline(options=options) as p:

        # 1. Read CSV and split
        employees = (
            p
            | "Read CSV" >> beam.io.ReadFromText("../data/employees.csv", skip_header_lines=1)
            | "Split CSV" >> beam.Map(lambda line: line.split(","))
        )

        # -----------------------
        # GroupByKey: Group names by department
        # -----------------------
        names_by_dept = (
            employees
            | "Dept-Name Pair" >> beam.Map(lambda x: (x[5], x[1]))  # (dept, name)
            | "Group By Dept" >> beam.GroupByKey()
            # | "Print GroupByKey" >> beam.Map(print)
        )

        # -----------------------
        # CombineGlobally: Total salary of all employees
        # -----------------------
        total_salary = (
            employees
            | "Extract Salary" >> beam.Map(lambda x: int(x[4]))
            | "Sum Salary Globally" >> beam.CombineGlobally(sum)
            # | "Print Total Salary" >> beam.Map(print)
        )

        # -----------------------
        # CombinePerKey: Total salary per department
        # -----------------------
        salary_per_dept = (
            employees
            | "Dept-Salary Pair" >> beam.Map(lambda x: (x[5], int(x[4])))
            | "Sum Salary Per Dept" >> beam.CombinePerKey(sum)
            # | "Print CombinePerKey" >> beam.Map(print)
        )

        # -----------------------
        # Count.Globally: Total number of employees
        # -----------------------
        total_employees = (
            employees
            | "Count All Employees" >> beam.combiners.Count.Globally()
            # | "Print Total Employees" >> beam.Map(print)
        )

        # -----------------------
        # Count.PerKey: Number of employees per department
        # -----------------------
        count_per_dept = (
            employees
            | "Dept as Key" >> beam.Map(lambda x: (x[5], 1))
            | "Count Per Dept" >> beam.combiners.Count.PerKey()
            # | "Print Count PerKey" >> beam.Map(print)
        )

        # -----------------------
        # Mean.Globally: Average salary of all employees
        # -----------------------

        avg_salary_global = (
            employees
            | "Salary Globally" >> beam.Map(lambda x: int(x[4]))
            | "Mean Globally" >> beam.combiners.Mean.Globally()
            | "Print Avg Salary Globally" >> beam.Map(print)
        )

        # -----------------------
        # Mean.PerKey: Average salary per department
        # -----------------------
        avg_salary_per_dept = (
            employees
            | "Dept-Salary Pair for Mean" >> beam.Map(lambda x: (x[5], int(x[4])))
            | "Mean Per Dept" >> beam.combiners.Mean.PerKey()
            # | "Print Mean PerKey" >> beam.Map(print)
        )

        # -----------------------
        # Top.Of: Top 3 salaries globally
        # -----------------------
        top_salaries = (
            employees
            | "Extract Salary for Top" >> beam.Map(lambda x: int(x[4]))
            | "Top 3 Salaries" >> beam.combiners.Top.Of(3)
            # | "Print Top Salaries" >> beam.Map(print)
        )

        # -----------------------
        # Top.PerKey: Top 2 salaries per department
        # -----------------------
        top_salary_per_dept = (
            employees
            | "Dept-Salary Pair for Top" >> beam.Map(lambda x: (x[5], int(x[4])))
            | "Top 2 Per Dept" >> beam.combiners.Top.PerKey(2)
            # | "Print Top PerKey" >> beam.Map(print)
        )
