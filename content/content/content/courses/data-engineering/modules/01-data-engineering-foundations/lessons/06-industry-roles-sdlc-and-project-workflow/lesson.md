# Industry Roles, SDLC and Project Workflow

> **Memory hook:** Idea → design → build → test → deploy → operate → improve.

![Industry Roles, SDLC and Project Workflow — Infinity AI Cloud Academy concept visual](/content/courses/data-engineering/visuals/01-data-engineering-foundations/06-industry-roles-sdlc-and-project-workflow.svg)

## 1. The idea in 60 seconds

**Industry Roles, SDLC and Project Workflow** should be remembered as a production pattern, not a definition to memorize.

### Know these 3 things

1. ** Industry Roles, SDLC and Project Workflow is useful when you need a repeatable, explainable engineering outcome—not just a one-time script.
2. ** make the behavior testable, observable and safe to rerun; document assumptions and failure handling.
3. * choose the simplest approach that meets freshness, scale, correctness, security and cost requirements.

## 2. Formula / rule to remember

> **Lead time = delivery time + review + test + deployment + feedback**

Use the rule as a quick mental check during implementation and interviews.

## 3. Industry scenario

**Scenario:** Apply **Industry Roles, SDLC and Project Workflow** to a realistic production data-engineering workflow and explain the trade-offs.

**What a good engineer does:** define the input contract, choose the processing pattern, validate the result, make retries safe, and expose enough telemetry to explain failures.

## 4. Code / implementation pattern

```python
# Minimal implementation pattern for: Industry Roles, SDLC and Project Workflow
def run_pipeline(rows):
    return [row for row in rows if row is not None]
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

- Explaining the tool instead of the problem
- Skipping validation evidence
- Ignoring operational ownership

## 7. 30-second memory map

**DEFINE → DESIGN → BUILD → VALIDATE → OPERATE**

If you can explain these five words without notes, you have the mental model.

## 8. Quick practice

1. Explain **Industry Roles, SDLC and Project Workflow** in 60 seconds to a junior engineer.
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

Build a small implementation for **Industry Roles, SDLC and Project Workflow** using the supplied course lab/data where applicable. Submit:

1. source code or SQL,
2. sample input/output,
3. validation evidence,
4. one failure-handling decision,
5. a short README explaining the design.

**Goal:** finish the lesson able to **draw it, code it, explain it and debug it**.
