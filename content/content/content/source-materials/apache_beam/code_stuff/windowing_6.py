import apache_beam as beam
from apache_beam.options.pipeline_options import PipelineOptions
from apache_beam import window
import time


PROJECT_ID = "your-gcp-project"
INPUT_TOPIC = "projects/your-gcp-project/topics/employees-input"
OUTPUT_TOPIC_FIXED = "projects/your-gcp-project/topics/employees-fixed"
OUTPUT_TOPIC_SLIDING = "projects/your-gcp-project/topics/employees-sliding"
OUTPUT_TOPIC_SESSION = "projects/your-gcp-project/topics/employees-session"

# Simulate timestamps for demo
def add_timestamp(element):
    import random
    # Generate a timestamp in seconds
    ts = int(time.time()) + random.randint(0, 300)
    return beam.window.TimestampedValue(element, ts)

# Sum salaries in each window
def sum_salaries(elements):
    total = sum(int(x[4]) for x in elements)
    return [("Total Salary", total)]

if __name__ == '__main__':
    options = PipelineOptions()
    with beam.Pipeline(options=options) as p:

        # Read CSV and split
        employees = (
            p
            | "Read CSV" >> beam.io.ReadFromText("../data/employees.csv", skip_header_lines=1)
            | "Split CSV" >> beam.Map(lambda line: line.split(","))
            | "Add Timestamp" >> beam.Map(add_timestamp)  # assign simulated timestamps
        )
        # # 1. Read from Pub/Sub
        # # -----------------------
        # employees = (
        #         p
        #         | "Read from PubSub" >> beam.io.ReadFromPubSub(topic=INPUT_TOPIC).with_output_types(bytes)
        #         | "Decode" >> beam.Map(lambda x: x.decode("utf-8"))
        #         | "Parse CSV" >> beam.ParDo(ParseCSV())
        #         | "Add Timestamp" >> beam.Map(add_timestamp)
        # )

        # -----------------------
        # 1. Fixed Window (5 min)
        # -----------------------
        fixed_windowed = (
            employees
            | "Fixed Window" >> beam.WindowInto(window.FixedWindows(300))
            | "Fixed Window Sum" >> beam.CombineGlobally(sum_salaries).without_defaults()
            | "Print Fixed Window" >> beam.Map(print)
        )

        # -----------------------
        # 2. Sliding Window (5 min size, 1 min period)
        # -----------------------
        sliding_windowed = (
            employees
            | "Sliding Window" >> beam.WindowInto(window.SlidingWindows(size=300, period=60))
            | "Sliding Window Sum" >> beam.CombineGlobally(sum_salaries).without_defaults()
            | "Print Sliding Window" >> beam.Map(print)
        )

        # -----------------------
        # 3. Session Window (10 min gap)
        # -----------------------
        session_windowed = (
            employees
            | "Session Window" >> beam.WindowInto(window.Sessions(gap_size=600))
            | "Session Window Sum" >> beam.CombineGlobally(sum_salaries).without_defaults()
            | "Print Session Window" >> beam.Map(print)
        )

        # -----------------------
        # 4. Global Window
        # -----------------------
        global_windowed = (
            employees
            | "Global Window" >> beam.WindowInto(window.GlobalWindows())
            | "Global Window Sum" >> beam.CombineGlobally(sum_salaries)
            | "Print Global Window" >> beam.Map(print)
        )
