#!/bin/bash

SRC_SHEETMUSIC="/Users/gregorychen3/google_drive/music_docs/sheetmusic"
DEST_SHEETMUSIC="/Users/gregorychen3/google_drive/music_docs/website_sheetmusic"

# Start with clean slate
rm -rf $DEST_SHEETMUSIC/*

# Copy over all sheetmusic dirs that have a score in them
for path in $SRC_SHEETMUSIC/*; do
    if ls "$path/"*[Ss]"core"* 1> /dev/null 2>&1; then
        cp -r "$path" $DEST_SHEETMUSIC
        rm -rf $DEST_SHEETMUSIC/*/*.sib
    fi
done
