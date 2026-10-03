#!/usr/bin/env bash
set -euo pipefail

INPUT="${1:-employees.csv}"
echo "Rows: $(tail -n +2 "$INPUT" | wc -l)"
echo "Top cities:"
tail -n +2 "$INPUT" | cut -d, -f6 | sort | uniq -c | sort -nr | head
