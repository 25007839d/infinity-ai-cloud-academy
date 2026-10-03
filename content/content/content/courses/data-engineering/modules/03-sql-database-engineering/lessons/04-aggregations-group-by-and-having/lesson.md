# Aggregations, GROUP BY and HAVING

> **Memory hook:** GROUP BY changes row grain; every selected non-aggregate column must be grouped.

![Aggregations, GROUP BY and HAVING — Infinity AI Cloud Academy concept visual](/content/courses/data-engineering/visuals/03-sql-database-engineering/04-aggregations-group-by-and-having.svg)

## 1. The idea in 60 seconds

**Aggregations, GROUP BY and HAVING** should be remembered as a production pattern, not a definition to memorize.

### Know these 3 things

1. ** Aggregations, GROUP BY and HAVING is useful when you need a repeatable, explainable engineering outcome—not just a one-time script.
2. ** make the behavior testable, observable and safe to rerun; document assumptions and failure handling.
3. * choose the simplest approach that meets freshness, scale, correctness, security and cost requirements.

## 2. Formula / rule to remember

> **AVG = SUM(value) / COUNT(value)**

Use the rule as a quick mental check during implementation and interviews.

## 3. Industry scenario

**Scenario:** A data engineer must turn transactional tables into a trusted analytical dataset. The design must preserve grain, handle nulls and remain efficient as data grows.

**What a good engineer does:** define the input contract, choose the processing pattern, validate the result, make retries safe, and expose enough telemetry to explain failures.

## 4. Code / implementation pattern

```sql
SELECT department,
       COUNT(*) AS employees,
       SUM(salary) AS payroll,
       AVG(salary) AS avg_salary
FROM employees
GROUP BY department
HAVING AVG(salary) > 60000;
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

**DEFINE → DESIGN → BUILD → VALIDATE → OPERATE**

If you can explain these five words without notes, you have the mental model.

## 8. Quick practice

1. Explain **Aggregations, GROUP BY and HAVING** in 60 seconds to a junior engineer.
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

Build a small implementation for **Aggregations, GROUP BY and HAVING** using the supplied course lab/data where applicable. Submit:

1. source code or SQL,
2. sample input/output,
3. validation evidence,
4. one failure-handling decision,
5. a short README explaining the design.

**Goal:** finish the lesson able to **draw it, code it, explain it and debug it**.
