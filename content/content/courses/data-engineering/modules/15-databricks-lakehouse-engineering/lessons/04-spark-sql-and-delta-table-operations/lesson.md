# Spark SQL and Delta Table Operations

> **Memory hook:** Use SQL for readable transformations and Delta for reliable writes.

![Spark SQL and Delta Table Operations — Infinity AI Cloud Academy concept visual](/content/courses/data-engineering/visuals/15-databricks-lakehouse-engineering/04-spark-sql-and-delta-table-operations.svg)

## 1. The idea in 60 seconds

**Spark SQL and Delta Table Operations** should be remembered as a production pattern, not a definition to memorize.

### Know these 3 things

1. ** Spark SQL and Delta Table Operations is useful when you need a repeatable, explainable engineering outcome—not just a one-time script.
2. ** make the behavior testable, observable and safe to rerun; document assumptions and failure handling.
3. * choose the simplest approach that meets freshness, scale, correctness, security and cost requirements.

## 2. Formula / rule to remember

> **MERGE = matched update + unmatched insert**

Use the rule as a quick mental check during implementation and interviews.

## 3. Industry scenario

**Scenario:** A lakehouse team needs reliable incremental updates, historical tracking and efficient analytical queries over cloud object storage.

**What a good engineer does:** define the input contract, choose the processing pattern, validate the result, make retries safe, and expose enough telemetry to explain failures.

## 4. Code / implementation pattern

```sql
MERGE INTO target t
USING source s ON t.order_id = s.order_id
WHEN MATCHED THEN UPDATE SET *
WHEN NOT MATCHED THEN INSERT *;
```

### Read the code like an engineer

- **Input:** What data enters the step?
- **Transformation:** What business or technical rule changes it?
- **Output:** What is produced and at what grain?
- **Failure:** What happens if input is invalid or the job is retried?
- **Evidence:** Which test, metric or log proves it worked?

## 5. Production checklist

- [ ] Input schema / contract is explicit
- [ ] Happy path is tested
- [ ] Invalid or duplicate input has a defined behavior
- [ ] Retry / rerun behavior is safe
- [ ] Logs include useful context
- [ ] Output is validated before publication
- [ ] Ownership and runbook are documented

## 6. Common mistakes

- Ignoring row grain
- Filtering at the wrong stage
- Using `SELECT *` in production transformations

## 7. 30-second memory map

**GRAIN → FILTER → JOIN → AGGREGATE → VALIDATE**

If you can explain these five words without notes, you have the mental model.

## 8. Quick practice

1. Explain **Spark SQL and Delta Table Operations** in 60 seconds to a junior engineer.
2. Give one production use case and one case where you would avoid this approach.
3. Identify one failure mode and its mitigation.
4. Modify the code example for a realistic business field.
5. State one metric you would monitor in production.

## 9. Interview checkpoint

- Why is this pattern useful at production scale?
- What changes when data volume increases 10×?
- What happens during a retry or partial failure?
- How would you prove the output is correct?

## 10. Assignment

Build a small implementation for **Spark SQL and Delta Table Operations** using the supplied course lab/data where applicable. Submit:

1. source code or SQL,
2. sample input/output,
3. validation evidence,
4. one failure-handling decision,
5. a short README explaining the design.

**Goal:** finish the lesson able to **draw it, code it, explain it and debug it**.
