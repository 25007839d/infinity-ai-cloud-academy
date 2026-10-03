# Why Apache Beam?

| Aspect                | **Apache Beam**                                         | **PySpark**                                        |
| --------------------- | ------------------------------------------------------- | -------------------------------------------------- |
| **Type**              | Programming model for pipelines                         | Distributed data processing framework              |
| **Engine**            | Runs on many backends (Dataflow, Flink, Spark, etc.)    | Runs only on Spark                                 |
| **Batch + Streaming** | Unified API for both                                    | Separate APIs (DataFrame, Structured Streaming)    |
| **Portability**       | High (multi-cloud, hybrid)                              | Low (Spark-only)                                   |
| **Ease of Use**       | More low-level, transform-based                         | Easier, SQL/DataFrame-like                         |
| **Ecosystem**         | Strong with cloud (BigQuery, Pub/Sub, Kafka)            | Rich ML/SQL/Graph (MLlib, SparkSQL, GraphX)        |
| **Best For**          | Real-time streaming, multi-cloud, Google Cloud Dataflow | ETL, analytics, ML pipelines in Spark environments |


# 1. Element-wise Transforms

* Map → Applies a function to each element (1 input → 1 output).
* FlatMap → Applies a function that returns an iterable (1 input → many outputs).
* Filter → Keeps elements that satisfy a condition.
* ParDo → General-purpose transform for custom logic; can emit 0, 1, or many outputs, supports side inputs/outputs.

# 2. Aggregation Transforms

* GroupByKey → Groups values by key (like SQL GROUP BY).
* CombineGlobally → Aggregates all elements into a single result (like reduce).
* CombinePerKey → Aggregates values for each key.
* Count.Globally → Counts total number of elements.
* Count.PerKey → Counts elements for each key.
* Mean.Globally → Computes average across all elements.
* Mean.PerKey → Computes average per key.
* Top.Of → Returns top N elements.
* Top.PerKey → Returns top N elements per key.

# 3. Utility / Data Management Transforms

* Create → Creates a PCollection from in-memory data.
* Flatten → Merges multiple PCollections into one.
* Partition → Splits a PCollection into multiple based on a function.
* Reshuffle → Breaks fusion by randomizing shuffle order (helps scaling).
* WindowInto → Assigns elements into time-based windows for streaming.

# 4. I/O Transforms

* ReadFromText → Reads data from text or CSV files.
* WriteToText → Writes PCollection to text files.
* ReadFromBigQuery → Reads data from BigQuery.
* WriteToBigQuery → Writes results to BigQuery.

# 5. Advanced / Composite Transforms

* Composite Transforms → Combine multiple transforms into a single reusable transform.
* Side Inputs → Pass extra data into ParDo or Map.
* Side Outputs → Split output of a ParDo into multiple PCollections.

# 6. What is Windowing in Apache Beam?

In streaming data, events keep coming continuously (infinite data).
We can’t wait forever to compute results → you need to break the stream into finite chunks.
Windowing = dividing an unbounded stream into windows (time-based or session-based) so you can apply transforms (like aggregation).

## 1. Fixed Windows

Breaks data into non-overlapping, equal-sized time intervals.
Example: Every 5 minutes, compute total sales.

`| beam.WindowInto(window.FixedWindows(300))`  # 5 mins

## Sliding Windows

Windows overlap → each element can belong to multiple windows.
Example: Compute sales every 5 minutes, but update every 1 minute.

`| beam.WindowInto(window.SlidingWindows(size=300, period=60))`

## Session Windows

Groups elements by user activity with gaps.
If no event for X minutes, the session ends.
Example: Track user session purchases (session ends after 10 mins of inactivity).

`| beam.WindowInto(window.Sessions(gap_size=600)) ` # 10 min gap

## Global Window

All elements belong to a single window.
Useful for batch pipelines or when you want to apply global aggregations.

`| beam.WindowInto(window.GlobalWindows())`

