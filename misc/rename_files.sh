#!/usr/bin/env bash
for f in ./{*.pdf,*.sib}; do
    CORRECTED=`python /Users/gregorychen3/personal-website/misc/correct_filename.py "$f"`
    echo "$CORRECTED";
    mv "$f" "$CORRECTED"
done

