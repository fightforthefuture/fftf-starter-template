#!/bin/sh

MAX_WIDTH=400

for f in static/logos/*.{jpg,gif,png}
do
    width=$(identify -format "%w" "$f")
    if [ "$width" -gt "$MAX_WIDTH" ]; then
      echo "Resizing $f"
      convert -resize $MAX_WIDTH -quality 75 -density 72 "$f" "$f"
    fi
done
