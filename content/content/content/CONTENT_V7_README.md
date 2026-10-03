# Infinity AI Cloud Academy — Data Engineering Content V7

## What changed

This content pack updates all **19 modules / 142 lessons** into a visual-first, memory-oriented learning experience.

### Lesson format
Every lesson now follows:

1. **Memory Hook** — one sentence to remember the topic.
2. **Concept Visual** — topic-specific SVG diagram already included in the course.
3. **60-second explanation** — three crisp production points.
4. **Formula / Rule** — one mental model or formula.
5. **Industry Scenario** — realistic engineering context.
6. **Code / Implementation Pattern** — short runnable pattern.
7. **Production Checklist** — correctness, retry, quality, observability and ownership.
8. **Common Mistakes** — what students usually get wrong.
9. **30-second Memory Map** — five keywords for retrieval.
10. **Practice + Interview + Assignment** — active recall and implementation.

## Source alignment

The pack preserves and uses the supplied teaching resources for:
- Python 8-session syllabus and session-wise practice.
- Apache Beam/Dataflow transforms and windowing examples.
- PySpark/Dataproc sample pipeline material.
- Existing Quarto module/presentation structure.

Additional professional material is added where the supplied resources did not cover production concerns such as contracts, observability, security, CI/CD, IaC, lakehouse operations and system design.

## Important

- No database migration is required for this content package.
- The package updates course content files; it does **not** deploy anything to Hostinger.
- The existing learning-experience DB records (visuals, practice, quizzes, assignments) should remain protected by the V6 CMS save fix.
- If a previous admin save already deleted learning-experience records, this content pack does not recover those DB rows automatically; restore/seed those records separately before continuing.

## Suggested sync

Use your existing code-driven content sync flow, for example:

```bash
npm run content:sync -- --course data-engineering
```

If your repo uses a different sync command, use the command already configured in the Academy repository.

## Quality target

The student should be able to:

**See → Remember → Code → Practice → Explain → Debug**

## Visual diagram standard

Every one of the 142 lessons now has its own topic-specific SVG concept diagram. Comparison topics use side-by-side comparison boards (for example OLTP vs OLAP); pipeline topics use flow/architecture diagrams; SQL/Python/Spark topics use implementation-oriented visual boards; cloud, quality, DevOps, security, lakehouse and career topics use matching architecture/checklist visuals. The visual files are referenced with numbered paths in `course.json` and `lesson.md`.

Visual goal: **See → Recall → Explain → Code → Apply**.
