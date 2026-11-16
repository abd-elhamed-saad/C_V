#!/usr/bin/env bash
# Builds Abd_Elhamed_Saad_CV.pdf (the website's "Download CV" file) from cv-paper.html.
# Headless Chrome keeps real text (readable by ATS) and clickable links.
# Run it after every change to cv-paper.html, then commit both files.
set -euo pipefail
cd "$(dirname "$0")"

CHROME="${CHROME:-}"
if [ -z "$CHROME" ]; then
    for c in google-chrome google-chrome-stable chromium chromium-browser \
             "$HOME"/.cache/ms-playwright/chromium-*/chrome-linux64/chrome; do
        if command -v "$c" >/dev/null 2>&1 || [ -x "$c" ]; then CHROME="$c"; break; fi
    done
fi
[ -n "$CHROME" ] || { echo "Chrome not found - set CHROME=/path/to/chrome" >&2; exit 1; }

"$CHROME" --headless=new --disable-gpu --no-sandbox --no-pdf-header-footer \
    --run-all-compositor-stages-before-draw --virtual-time-budget=10000 \
    --print-to-pdf=Abd_Elhamed_Saad_CV.pdf "file://$PWD/cv-paper.html" 2>/dev/null

echo "Built Abd_Elhamed_Saad_CV.pdf"
