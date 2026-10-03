# Schema, Null, Uniqueness and Referential Checks

> **Memory hook:** Check the shape before trusting the values.

![Schema, Null, Uniqueness and Referential Checks — Infinity AI Cloud Academy concept visual](/content/courses/data-engineering/visuals/12-data-quality-testing/04-schema-null-uniqueness-and-referential-checks.svg)




## 1. The idea in 60 seconds

**Schema, Null, Uniqueness and Referential Checks** should be remembered as a production pattern, not a definition to memorize.

### Know these 3 things

1. ** Schema, Null, Uniqueness and Referential Checks is useful when you need a repeatable, explainable engineering outcome—not just a one-time script.
2. ** make the behavior testable, observable and safe to rerun; document assumptions and failure handling.
3. * choose the simplest approach that meets freshness, scale, correctness, security and cost requirements.

## 1A. Concept at a glance

### Core idea
Understand Schema, Null, Uniqueness and Referential Checks as an engineering pattern, not only a definition.

### Implementation
Identify inputs, transformations, outputs and failure behavior for Schema, Null, Uniqueness and Referential Checks.

### Production lens
Make the solution testable, observable, safe to rerun and explainable.

## 2. Formula / rule to remember

> **null_rate = null_count / row_count**

Use the rule as a quick mental check during implementation and interviews.

## 3. Industry scenario

**Scenario:** A dashboard suddenly shows zero sales. The pipeline succeeded technically, but a source schema change produced bad data. Quality checks must detect the problem before publication.

**What a good engineer does:** define the input contract, choose the processing pattern, validate the result, make retries safe, and expose enough telemetry to explain failures.

## 4. Code / implementation pattern

```sql
SELECT COUNT(*) AS rows,
       SUM(CASE WHEN customer_id IS NULL THEN 1 ELSE 0 END) AS null_customer,
       COUNT(DISTINCT customer_id) AS unique_customers
FROM orders;
```

### Read the code like an engineer

- **Input:** What data enters the step?
- **Transformation:** What business or technical rule changes it?
- **Output:** What is produced and at what grain?
- **Failure:** What happens if input is invalid or the job is retried?
- **Evidence:** Which test, metric or log proves it worked?

## 4A. Coding Syntax to Memorize

**Language / tool:** `Data Engineering`

```text
source = read_input()
result = transform(source)
validate(result)
write_output(result)
```

> 🧠 **Memorize:** Source → Transform → Validate → Output

**Code reading checklist:** Input → Transformation → Output → Failure → Validation.

## 5. Production checklist

- [ ] Input schema / contract is explicit
- [ ] Happy path is tested
- [ ] Invalid or duplicate input has a defined behavior
- [ ] Retry / rerun behavior is safe
- [ ] Logs include useful context
- [ ] Output is validated before publication
- [ ] Ownership and runbook are documented

## 6. Common mistakes

- Explaining the tool instead of the problem
- Skipping validation evidence
- Ignoring operational ownership

## 7. 30-second memory map

**DEFINE → DESIGN → BUILD → VALIDATE → OPERATE**

If you can explain these five words without notes, you have the mental model.

## 8. Quick practice

1. Explain **Schema, Null, Uniqueness and Referential Checks** in 60 seconds to a junior engineer.
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

Build a small implementation for **Schema, Null, Uniqueness and Referential Checks** using the supplied course lab/data where applicable. Submit:

1. source code or SQL,
2. sample input/output,
3. validation evidence,
4. one failure-handling decision,
5. a short README explaining the design.

**Goal:** finish the lesson able to **draw it, code it, explain it and debug it**.
