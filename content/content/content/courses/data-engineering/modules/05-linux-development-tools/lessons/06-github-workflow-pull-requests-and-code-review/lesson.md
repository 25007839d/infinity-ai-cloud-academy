# GitHub Workflow, Pull Requests and Code Review

> **Memory hook:** PR = change + evidence + review.

![GitHub Workflow, Pull Requests and Code Review — Infinity AI Cloud Academy concept visual](/content/courses/data-engineering/visuals/05-linux-development-tools/06-github-workflow-pull-requests-and-code-review.svg)

## 1. The idea in 60 seconds

**GitHub Workflow, Pull Requests and Code Review** should be remembered as a production pattern, not a definition to memorize.

### Know these 3 things

1. ** GitHub Workflow, Pull Requests and Code Review is useful when you need a repeatable, explainable engineering outcome—not just a one-time script.
2. ** make the behavior testable, observable and safe to rerun; document assumptions and failure handling.
3. * choose the simplest approach that meets freshness, scale, correctness, security and cost requirements.

## 2. Formula / rule to remember

> **PR quality = small scope + tests + explanation**

Use the rule as a quick mental check during implementation and interviews.

## 3. Industry scenario

**Scenario:** A scheduled pipeline runs on Linux. Engineers need to inspect logs, manage files, debug processes and automate repeatable commands without manual steps.

**What a good engineer does:** define the input contract, choose the processing pattern, validate the result, make retries safe, and expose enough telemetry to explain failures.

## 4. Code / implementation pattern

```yaml
name: ci
on: [pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: pip install -r requirements.txt
      - run: pytest -q
```

### Read the code like an engineer

- **Input:** What data enters the step?
- **Transformation:** What business or technical rule changes it?
- **Output:** What is produced and at what grain?
- **Failure:** What happens if input is invalid or the job is retried?
- **Evidence:** Which test, metric or log proves it worked?


## Coding Syntax to Memorize

> **Syntax card:** Memorize the pattern first; then understand where and why to use it.

```bash
git checkout -b feature/orders
git add .
git commit -m "Add orders pipeline"
git push -u origin feature/orders
```

**Remember:** identify the **input → operation → output** before writing production code.

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

1. Explain **GitHub Workflow, Pull Requests and Code Review** in 60 seconds to a junior engineer.
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

Build a small implementation for **GitHub Workflow, Pull Requests and Code Review** using the supplied course lab/data where applicable. Submit:

1. source code or SQL,
2. sample input/output,
3. validation evidence,
4. one failure-handling decision,
5. a short README explaining the design.

**Goal:** finish the lesson able to **draw it, code it, explain it and debug it**.
