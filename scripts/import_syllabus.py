#!/usr/bin/env python3
"""
Infinity AI Cloud Academy - New Syllabus Importer

Reads the New_syllabus worksheet, preserves PPT/code hyperlinks, optionally downloads
public GitHub/PDF resources, converts PDF slides into HTML pages with rendered images,
and produces:
  - public/generated-syllabus/materials/*
  - public/generated-syllabus/manifest.json
  - db/DATA_ENGINEERING_NEW_SYLLABUS_SEED.sql

Run locally:
  python scripts/import_syllabus.py --xlsx "Data Engineer - Jun-2025.xlsx"
"""
from __future__ import annotations
import argparse, html, json, os, re, shutil, sys, urllib.parse, urllib.request
from pathlib import Path
from uuid import uuid4

try:
    from openpyxl import load_workbook
except ImportError:
    print("Install openpyxl: pip install openpyxl", file=sys.stderr); raise

try:
    import fitz  # PyMuPDF
except ImportError:
    fitz = None

ROOT = Path(__file__).resolve().parents[1]
DEFAULT_OUT = ROOT / "public" / "generated-syllabus"

def slugify(s: str) -> str:
    s = re.sub(r"[^a-zA-Z0-9]+", "-", str(s or "").strip().lower()).strip("-")
    return s[:100] or "lesson"

def clean(v):
    if v is None: return ""
    s = str(v).strip()
    if re.fullmatch(r"-?\d+\.0+", s): s = s.split(".")[0]
    return s

def github_raw(url: str) -> str:
    m = re.match(r"https?://github\.com/([^/]+/[^/]+)/blob/([^/]+)/(.*)$", url)
    if m:
        owner_repo, branch, path = m.groups()
        return f"https://raw.githubusercontent.com/{owner_repo}/{branch}/{urllib.parse.quote(path)}"
    return url

def safe_filename(url: str, default="resource") -> str:
    path = urllib.parse.urlparse(url).path
    name = Path(urllib.parse.unquote(path)).name or default
    return re.sub(r"[^A-Za-z0-9._-]+", "_", name)

def fetch(url: str, dest: Path) -> bool:
    try:
        dest.parent.mkdir(parents=True, exist_ok=True)
        req = urllib.request.Request(url, headers={"User-Agent": "InfinityAICloudAcademy-SyllabusImporter/1.0"})
        with urllib.request.urlopen(req, timeout=45) as r, open(dest, "wb") as f:
            shutil.copyfileobj(r, f)
        return True
    except Exception as exc:
        print(f"[WARN] download failed: {url} -> {exc}")
        return False

def pdf_to_html(pdf_path: Path, html_path: Path, image_dir: Path, title: str):
    if not fitz:
        raise RuntimeError("PyMuPDF is required for PDF->HTML conversion: pip install pymupdf")
    doc = fitz.open(pdf_path)
    style = """<style>body{font-family:Inter,Arial,sans-serif;background:#020617;color:#e2e8f0;margin:0;padding:28px;line-height:1.65}.source-material{max-width:1100px;margin:auto}.slide-page{margin:0 0 36px;padding:20px;background:#0f172a;border:1px solid #1e293b;border-radius:16px}.slide-page img{display:block;width:100%;height:auto;border-radius:10px;background:#fff}.slide-text{font-size:14px;color:#cbd5e1}.academy-lesson{max-width:900px;margin:auto;background:#0f172a;border:1px solid #1e293b;border-radius:16px;padding:32px}.academy-lesson h1,.academy-lesson h2{color:#f8fafc}.academy-lesson code{background:#020617;padding:2px 6px;border-radius:5px}</style>"""
    parts = [f"<!doctype html><html><head><meta charset='utf-8'><meta name='viewport' content='width=device-width,initial-scale=1'>{style}</head><body><article class='source-material'><h1>{html.escape(title)}</h1>"]
    for i, page in enumerate(doc):
        image_name = f"page-{i+1:03d}.png"
        image_path = image_dir / image_name
        pix = page.get_pixmap(matrix=fitz.Matrix(1.5, 1.5), alpha=False)
        pix.save(str(image_path))
        text = page.get_text("html") or ""
        parts.append(f"<section class='slide-page'><h2>Page {i+1}</h2>")
        parts.append(f"<img src='images/{image_name}' alt='{html.escape(title)} page {i+1}' loading='lazy'/>")
        if text.strip():
            # PDF.js/HTML extraction can contain positioning markup. Keep it inside a
            # source block so no source text is lost while preserving the rendered page.
            parts.append(f"<details><summary>Extracted slide text</summary><div class='slide-text'>{text}</div></details>")
        parts.append("</section>")
    parts.append("</article></body></html>")
    html_path.parent.mkdir(parents=True, exist_ok=True)
    html_path.write_text("\n".join(parts), encoding="utf-8")
    return len(doc)

def generated_topic_html(module_name: str, lesson_title: str, topic: str) -> str:
    # Academy-authored fallback for rows without a PPT/code source.
    bullets = [x.strip(" .") for x in re.split(r"\d+\.\s*", topic or "") if x.strip()]
    if not bullets:
        bullets = [topic or lesson_title]
    lis = "".join(f"<li>{html.escape(x)}</li>" for x in bullets[:80])
    style = """<style>body{font-family:Inter,Arial,sans-serif;background:#020617;color:#e2e8f0;margin:0;padding:28px;line-height:1.65}.academy-lesson{max-width:900px;margin:auto;background:#0f172a;border:1px solid #1e293b;border-radius:16px;padding:32px}.academy-lesson h1,.academy-lesson h2{color:#f8fafc}</style>"""
    return f"""<!doctype html><html><head><meta charset="utf-8">{style}</head><body><article class="academy-lesson">
<h1>{html.escape(lesson_title)}</h1>
<p><strong>Module:</strong> {html.escape(module_name)}</p>
<p>This lesson is part of the Infinity AI Cloud Academy industry-ready Data Engineering program. It combines the syllabus topic with practical engineering context, examples, interview checkpoints and hands-on work.</p>
<h2>What you will learn</h2><ul>{lis}</ul>
<h2>Industry perspective</h2>
<p>Connect the concept to a production data platform: source systems → ingestion → storage → transformation → serving/analytics → orchestration → quality → monitoring and security.</p>
<h2>Hands-on objective</h2>
<p>Implement the concept using the lab supplied with this lesson. Validate the result, document assumptions and keep the solution reproducible in GitHub.</p>
<h2>Interview checkpoint</h2>
<p>Be able to explain the concept, when to use it, its trade-offs, failure modes and how you would operate it in production.</p>
</article></body></html>"""

def get_links(ws, row_idx):
    links = {}
    for col in range(1, ws.max_column + 1):
        c = ws.cell(row_idx, col)
        if c.hyperlink and c.hyperlink.target:
            links[c.column_letter] = {"label": clean(c.value), "url": c.hyperlink.target}
    return links

def build_rows(ws):
    headers = {clean(ws.cell(1,c).value): c for c in range(1, ws.max_column+1)}
    # The workbook has some duplicate/blank headers; use fixed known columns.
    def val(r, col):
        return clean(ws.cell(r, col).value)
    rows = []
    for r in range(2, ws.max_row+1):
        module = val(r,1)
        module_name = val(r,2)
        topics = val(r,4)
        w = val(r,5)
        session = val(r,6)
        ppt = ws.cell(r,7).hyperlink.target if ws.cell(r,7).hyperlink else ""
        code = ws.cell(r,8).hyperlink.target if ws.cell(r,8).hyperlink else ""
        topic = val(r,9)
        ppt_label = clean(ws.cell(r,7).value)
        code_label = clean(ws.cell(r,8).value)
        if not any([module,module_name,topics,w,session,ppt,code,topic,ppt_label,code_label]):
            continue
        header_only = bool(
            module_name and (
                (not any([w,session,ppt,code,topic,topics]) and str(module) != "1")
                or (topics.lower() in {"sql","basic python","pyspark"} and not any([w,session,ppt,code,topic]))
                or (w.lower() in {"sql syllabous","python syllabous","spark syllabous"} and not any([session,ppt,code,topic]))
            )
        )
        rows.append(dict(row=r,module=module,module_name=module_name,topics=topics,w=w,session=session,ppt=ppt,code=code,topic=topic,pptLabel=ppt_label,codeLabel=code_label,header_only=header_only))
    # Fill down module name / number from the map.
    current_module = None
    current_name = None
    for x in rows:
        if x["module"] and not x["module"].startswith(("🔵","🔴")):
            current_module = x["module"]
            current_name = x["module_name"] or current_name
        elif x["module"] in ("Foundation","🔵 CORE DATA ENGINEERING","🔴 CLOUD + PRODUCTION"):
            current_module = x["module"]
        if x["module_name"]:
            current_name = x["module_name"]
        x["effective_module"] = current_module
        x["effective_name"] = current_name
    return rows

def normalize_modules(rows):
    modules = []
    by = {}
    for x in rows:
        m = x["effective_module"]
        name = x["effective_name"]
        if not m or m in ("Foundation","🔵 CORE DATA ENGINEERING","🔴 CLOUD + PRODUCTION"):
            continue
        if m not in by:
            by[m] = {"module": int(m) if str(m).isdigit() else m, "moduleName": name or f"Module {m}", "lessons": [], "topics": []}
            modules.append(by[m])
        if x.get("header_only"):
            continue
        item = by[m]
        topic = x["topic"] or x["topics"]
        # Rows with W/session are lessons; otherwise a named topic row becomes a lesson.
        topic_for_title = x["topic"] or x["topics"]
        if x["session"] and topic_for_title:
            short_topic = re.sub(r"\s+", " ", topic_for_title).strip()
            title = f"Session {x['session']} — {short_topic[:110]}{'…' if len(short_topic)>110 else ''}"
        elif x["session"]:
            title = f"Session {x['session']}"
        else:
            title = x["topics"] or x["topic"] or x.get("pptLabel") or x.get("codeLabel")
        if not title and x["ppt"]:
            title = x["ppt"].split("/")[-1]
        if not title:
            continue
        item["lessons"].append({
            "title": title,
            "slug": slugify(title),
            "description": x["topic"] or x["topics"] or f"{item['moduleName']} lesson.",
            "week": x["w"],
            "session": x["session"],
            "pptUrl": x["ppt"],
            "codeUrl": x["code"],
            "topic": x["topic"] or x["topics"],
        })
        if topic:
            item["topics"].append(topic)
    # Add a strong standard curriculum for modules whose sheet only has a module label.
    defaults = {
      "1": ["What is Data Engineering?","Types and sources of data","Data pipelines and end-to-end flow","Batch vs streaming processing","Modern Data Engineering ecosystem","E-commerce and IoT pipeline case studies"],
      "4": ["Linux filesystem and shell basics","Files, permissions, users and processes","Git fundamentals and branching","GitHub workflow, pull requests and code review","Python environments, package management and CLI debugging"],
      "5": ["Data modeling fundamentals","Dimensional modeling: facts and dimensions","Star and snowflake schemas","ETL vs ELT architecture","Incremental loads and CDC","SCD Types 0–6","REST APIs and API ingestion","File formats: CSV, JSON, XML, Avro, Parquet"],
      "7": ["Cloud computing and Google Cloud overview","GCP architecture: projects, regions, zones and billing","Cloud SDK / gcloud CLI","IAM and service-account architecture","Production GCP architecture patterns"],
      "8": ["Cloud Storage (GCS) architecture and lifecycle","BigQuery architecture, datasets and tables","BigQuery partitioning, clustering and query performance","File formats and external data","Looker Studio — short BI module"],
      "9": ["Dataproc and managed Spark architecture","Pub/Sub event ingestion","Dataflow and Apache Beam","Streaming windowing, triggers and watermarks","Dataflow Flex Templates","Batch vs streaming architecture on GCP"],
      "10": ["Airflow architecture, DAGs and scheduling","Operators, sensors, XCom and Variables","Dependencies, retries, backfills and SLAs","Cloud Composer production practices","dbt models, tests and documentation","Incremental dbt models and snapshots","Orchestrating Spark, Dataflow and BigQuery","End-to-end Airflow + dbt pipeline"],
      "11": ["Data quality dimensions and failure modes","Unit testing transformation code","SQL and dbt tests","Schema, null, uniqueness and referential checks","Data observability, freshness, volume and incident response"],
      "12": ["Docker for Data Engineering","Cloud Build and Artifact Registry","GitHub Actions CI/CD","Testing, linting and build automation","Terraform fundamentals for GCP","Infrastructure as Code for BigQuery, GCS and IAM","Secrets, environments and deployment promotion"],
      "13": ["IAM, authentication and authorization","Service accounts and least privilege","Secret Manager and credential hygiene","Network and data security","Logging and Monitoring","Production reliability, backups and disaster recovery","Production architecture review"],
      "14": ["Lakehouse architecture and Databricks workspace","Delta Lake and ACID transactions","Bronze, Silver and Gold architecture","Spark SQL and Delta operations","Merge, CDC and SCD in Delta","Performance optimization, Unity Catalog and governance"],
      "15": ["Agile/Scrum for Data Engineering","Jira boards, epics, stories and tasks","Sprint planning and estimation","Code review and engineering standards","Incident management and postmortems"],
      "16": ["Project kickoff and requirements","Project 1: CSV to Cloud Warehouse","Project 2: REST API to Data Lake","Project 3: IoT streaming analytics","Project 4: Data quality and observability","Project 5: Production PySpark + BigQuery pipeline","Final Capstone: Complete Modern Data Platform"],
      "17": ["System design interview framework","Requirements, SLAs and capacity estimation","Batch data platform design","Real-time streaming platform design","Lakehouse architecture at scale","Reliability, cost and performance trade-offs","Security, governance and multi-tenancy","Production data platform design review"],
      "18": ["Data engineering resume and portfolio","SQL interview patterns","Python and PySpark interview patterns","Cloud and architecture interview patterns","Scenario-based pipeline debugging","System design interview practice","Project storytelling with STAR","Mock interview and job-readiness plan"],
    }
    for item in modules:
        key=str(item["module"]).replace('.0','')
        if key == "14" and "Optional" not in item["moduleName"]:
            item["moduleName"] = item["moduleName"] + " (Optional / Advanced)"
        if key in defaults:
            for title in defaults[key]:
                if not any(l["title"] == title for l in item["lessons"]):
                    item["lessons"].append({"title":title,"slug":slugify(title),"description":title,"week":"","session":"","pptUrl":"","codeUrl":"","topic":title})
    return modules

def process_materials(modules, out, download_sources=True):
    materials = out / "materials"
    materials.mkdir(parents=True, exist_ok=True)
    for mod in modules:
        for lesson in mod["lessons"]:
            lesson_dir = materials / f"{int(float(mod['module'])):02d}-{slugify(mod['moduleName'])}" / lesson["slug"]
            lesson_dir.mkdir(parents=True, exist_ok=True)
            lesson["contentHtmlPath"] = ""
            lesson["sourceFiles"] = []
            for kind, url in (("ppt", lesson.get("pptUrl")), ("code", lesson.get("codeUrl"))):
                if not url or url.lower().startswith("http://src/"):
                    continue
                if "github.com/" in url:
                    raw = github_raw(url)
                    name = safe_filename(url, kind)
                    target = lesson_dir / name
                    if download_sources and fetch(raw, target):
                        lesson["sourceFiles"].append(str(target.relative_to(out)).replace("\\","/"))
                        if kind == "ppt" and target.suffix.lower() == ".pdf":
                            html_path = lesson_dir / "lesson.html"
                            try:
                                pages = pdf_to_html(target, html_path, lesson_dir / "images", lesson["title"])
                                lesson["contentHtmlPath"] = str(html_path.relative_to(out)).replace("\\","/")
                                lesson["pdfPages"] = pages
                            except Exception as exc:
                                print(f"[WARN] PDF conversion failed for {target}: {exc}")
                        elif kind == "code":
                            try:
                                lesson["codeText"] = target.read_text(encoding="utf-8", errors="replace")
                            except Exception:
                                pass
                else:
                    # Google Drive folders/pages remain as source links for the learner/admin.
                    pass
            if not lesson["contentHtmlPath"]:
                fallback = lesson_dir / "lesson.html"
                fallback.write_text(generated_topic_html(mod["moduleName"],lesson["title"],lesson["topic"]),encoding="utf-8")
                lesson["contentHtmlPath"] = str(fallback.relative_to(out)).replace("\\","/")
            # Add original source links to every learner-facing HTML artifact.
            html_path = out / lesson["contentHtmlPath"]
            try:
                raw_html = html_path.read_text(encoding="utf-8")
                links = []
                if lesson.get("pptUrl"):
                    links.append(f"<a href='{html.escape(lesson['pptUrl'],quote=True)}' target='_blank' rel='noreferrer'>Open original slides/source</a>")
                if lesson.get("codeUrl"):
                    links.append(f"<a href='{html.escape(lesson['codeUrl'],quote=True)}' target='_blank' rel='noreferrer'>Open original code/source</a>")
                if links:
                    banner = "<div style='margin:0 0 24px;padding:14px 16px;background:#111827;border:1px solid #334155;border-radius:12px'>Source: " + " · ".join(links) + "</div>"
                    raw_html = raw_html.replace("<h1>", banner + "<h1>", 1)
                    html_path.write_text(raw_html,encoding="utf-8")
            except Exception as exc:
                print(f"[WARN] source-link injection failed: {html_path}: {exc}")
    return modules

def sqlq(s): return "'" + str(s).replace("\\","\\\\").replace("'","''") + "'"

def generate_seed(modules, out):
    lines = [
      "-- Generated by scripts/import_syllabus.py",
      "-- Apply COURSE_CMS_MIGRATION.sql + LMS_V1_MIGRATION.sql first.",
      "START TRANSACTION;",
      "SET @course_id = (SELECT id FROM courses WHERE slug='data-engineering' LIMIT 1);",
      "DELETE FROM course_modules WHERE course_id=@course_id;",
      "UPDATE courses SET title='Data Engineering — Industry Ready Program', modules_count=18, updated_at=NOW() WHERE id=@course_id;",
    ]
    module_order=0
    for mod in modules:
        mid=str(uuid4()); lines.append(
          f"INSERT INTO course_modules (id,course_id,module_name,description,display_order) VALUES ({sqlq(mid)},@course_id,{sqlq(mod['moduleName'])},{sqlq('Industry-ready Data Engineering module covering '+mod['moduleName'])},{module_order});")
        for ti,topic in enumerate(dict.fromkeys(mod["topics"])):
            lines.append(f"INSERT INTO course_module_topics (id,module_id,topic,display_order) VALUES ({sqlq(str(uuid4()))},{sqlq(mid)},{sqlq(topic)},{ti});")
        for li,lesson in enumerate(mod["lessons"]):
            lid=str(uuid4())
            lesson_type="SQL" if mod["moduleName"].lower().startswith("sql") else ("PYSPARK" if "spark" in mod["moduleName"].lower() else "THEORY")
            lines.append(f"INSERT INTO course_lessons (id,module_id,title,slug,description,lesson_type,duration_minutes,is_preview,status,display_order) VALUES ({sqlq(lid)},{sqlq(mid)},{sqlq(lesson['title'])},{sqlq(lesson['slug'])},{sqlq(lesson['description'])}, {sqlq(lesson_type)},60,{1 if li==0 and module_order<3 else 0},'published',{li});")
            html_path=lesson["contentHtmlPath"]
            # Runtime path; the generated files are deployed under /generated-syllabus.
            public_path="/generated-syllabus/"+html_path
            source_html=f"<p><strong>Source material:</strong> "
            links=[]
            if lesson.get("pptUrl"): links.append(f"<a href='{html.escape(lesson['pptUrl'],quote=True)}' target='_blank' rel='noreferrer'>PPT / Slides</a>")
            if lesson.get("codeUrl"): links.append(f"<a href='{html.escape(lesson['codeUrl'],quote=True)}' target='_blank' rel='noreferrer'>Code source</a>")
            source_html += " · ".join(links) if links else "Academy-authored material"
            source_html += "</p>"
            lines.append(f"INSERT INTO lesson_content (id,lesson_id,content_type,title,content_url,content_html,display_order) VALUES ({sqlq(str(uuid4()))},{sqlq(lid)},'ARTICLE',{sqlq(lesson['title'])},{sqlq(public_path)},NULL,0);")
            if lesson.get("codeUrl") or lesson.get("codeText"):
                config={"githubPath":lesson.get("codeUrl",""),"codeText":lesson.get("codeText","")}
                lines.append(f"INSERT INTO lesson_labs (id,lesson_id,lab_type,title,external_url,instructions,dataset_url,config_json,display_order) VALUES ({sqlq(str(uuid4()))},{sqlq(lid)},'GITHUB_CODE',{sqlq('Code Lab — '+lesson['title'])},{sqlq('')},{sqlq('Open the source, run it, modify it and commit your solution.')},{sqlq('')},{sqlq(json.dumps(config,separators=(',',':')))},{1});")
            elif mod["moduleName"].lower().startswith("sql"):
                lines.append(f"INSERT INTO lesson_labs (id,lesson_id,lab_type,title,external_url,instructions,dataset_url,config_json,display_order) VALUES ({sqlq(str(uuid4()))},{sqlq(lid)},'SQL',{sqlq('MySQL SQL Practice')},{sqlq('')},{sqlq('Write one or multiple read-only SQL statements. Select a portion of the editor to run only that selection.')},{sqlq('')},{sqlq(json.dumps({'starterSql':'SELECT * FROM employees LIMIT 10;\\n\\nSELECT department_id, COUNT(*) AS employee_count FROM employees GROUP BY department_id;'},separators=(',',':')))},{1});")
        module_order+=1
    lines += ["COMMIT;",""]
    seed=out.parent.parent/"db"/"DATA_ENGINEERING_NEW_SYLLABUS_SEED.sql"
    seed.write_text("\n".join(lines),encoding="utf-8")
    return seed

def main():
    ap=argparse.ArgumentParser()
    ap.add_argument("--xlsx",required=True)
    ap.add_argument("--out",default=str(DEFAULT_OUT))
    ap.add_argument("--no-download",action="store_true",help="Preserve source links and generate fallback HTML without downloading remote files")
    args=ap.parse_args()
    out=Path(args.out)
    if out.exists(): shutil.rmtree(out)
    out.mkdir(parents=True)
    wb=load_workbook(args.xlsx,data_only=False)
    if "New_syllabus" not in wb.sheetnames:
        raise SystemExit("New_syllabus sheet not found")
    rows=build_rows(wb["New_syllabus"])
    modules=normalize_modules(rows)
    modules=process_materials(modules,out,download_sources=not args.no_download)
    manifest={"version":1,"courseSlug":"data-engineering","sourceWorkbook":"New_syllabus","moduleCount":len(modules),"modules":modules}
    (out/"manifest.json").write_text(json.dumps(manifest,indent=2,ensure_ascii=False),encoding="utf-8")
    seed=generate_seed(modules,out)
    print(f"Generated {len(modules)} modules")
    print(f"Manifest: {out/'manifest.json'}")
    print(f"Seed: {seed}")

if __name__=="__main__":
    main()
