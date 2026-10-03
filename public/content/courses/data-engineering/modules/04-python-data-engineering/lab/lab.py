from pathlib import Path
import csv

input_file = Path("employees.csv")
output_file = Path("employees_clean.csv")

with input_file.open(newline="", encoding="utf-8") as src, output_file.open("w", newline="", encoding="utf-8") as dst:
    reader = csv.DictReader(src)
    rows = []
    for row in reader:
        row["name"] = row["name"].strip().title()
        row["salary"] = float(row["salary"] or 0)
        rows.append(row)
    writer = csv.DictWriter(dst, fieldnames=reader.fieldnames)
    writer.writeheader()
    writer.writerows(rows)

print(f"Wrote {len(rows)} cleaned records to {output_file}")
