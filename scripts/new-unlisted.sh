#!/usr/bin/env bash
# Creates a case study that lives at a secret, unguessable URL, e.g. https://dumonjic.com/u/3f9c…/
# Usage: scripts/new-unlisted.sh "Title of the case study" [discipline]
set -euo pipefail
title="${1:?Usage: scripts/new-unlisted.sh \"Case study title\" [discipline]}"
discipline="${2:-Content design}"
cd "$(dirname "$0")/.."

slug="$(printf '%s' "$title" | tr '[:upper:]' '[:lower:]' | sed -E 's/[^a-z0-9]+/-/g; s/^-+|-+$//g')"
token="$(openssl rand -hex 10)"          # 80 bits of randomness: not guessable
dir="content/unlisted/$slug"
[ -e "$dir" ] && { echo "Already exists: $dir" >&2; exit 1; }
mkdir -p "$dir"

cat > "$dir/index.md" <<EOT
---
title: "$title"
url: "/u/$token/"
draft: true
placeholder: true
discipline: "$discipline"
summary: "Placeholder summary: one or two sentences on the project and its outcome."
snapshot:
  problem: "Placeholder: one sentence on what wasn't working."
  did: "Placeholder: one sentence on what you did."
  result: ""        # a short headline number, e.g. "40%"
  resultLabel: ""   # what it measures, e.g. "fewer support tickets"
# Anonymize by default: describe the company instead of naming it (for example
# "Series B education-technology company"). Details in the README.
org: ""
role: ""
team: ""
timeline: ""
tools: []
confidential: true
# downloads:
#   - title: "Full case study (PDF)"
#     file: "case-study.pdf"    # put the file next to this index.md
---
## Problem

*Placeholder: what wasn't working, who it affected, and how you knew.*

## My role

*Placeholder: what you owned, who you worked with, and the constraints.*

## Process

*Placeholder: research, drafts, testing, and the decisions you made along the way.*

## Solution

*Placeholder: what you shipped.*

## Results

*Placeholder: what changed.*
EOT

echo
echo "Created $dir/index.md"
echo "Private link (once published): https://dumonjic.com/u/$token/"
echo
echo "Preview it:   hugo server -D   then open http://localhost:1313/u/$token/"
echo "Publish it:   set draft: false and remove placeholder: true, then push."
echo "Note: the source file is in the public GitHub repo. Keep everything in it anonymized."
