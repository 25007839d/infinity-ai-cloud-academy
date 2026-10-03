import apache_beam as beam
from apache_beam.options.pipeline_options import PipelineOptions

with beam.Pipeline(options=PipelineOptions()) as p:
    (p
     | "Create" >> beam.Create(["data engineering", "cloud data platform", "streaming pipeline"])
     | "Upper" >> beam.Map(str.upper)
     | "Write" >> beam.io.WriteToText("output/beam_result"))
