#!/bin/bash
set -x

SRC_SHEETMUSIC="/Users/gregorychen3/Documents/music_docs/sheetmusic"
DEST_SHEETMUSIC="/Users/gregorychen3/Documents/music_docs/website_sheetmusic"

# Start with clean slate
rm -rf ../sheetmusic/*

# Copy over all sheetmusic dirs that have a score in them
for path in $SRC_SHEETMUSIC/*; do
    if ls "$path/"*[Ss]"core"* 1> /dev/null 2>&1; then
        cp -r "$path" $DEST_SHEETMUSIC
        rm -rf $DEST_SHEETMUSIC/*/*.sib
    fi
done

