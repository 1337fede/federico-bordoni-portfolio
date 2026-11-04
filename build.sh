#!/bin/bash

CONFIG="$HOME/.pandoc-paths"

ASSETS=""

[ -f "$CONFIG" ] && source "$CONFIG"

read -r -p "Please specify assets folder, saved one is: [$ASSETS]: " A

ASSETS="${A:-$ASSETS}"

printf 'ASSETS=%q\n' \
  "$ASSETS" > "$CONFIG"

docker build \
  --build-context external-assets="$ASSETS" \
  --target production \
  -t federico-bordoni-portfolio . \
&& docker run --rm \
  --name federico-bordoni-portfolio \
  -p 3000:80 \
  federico-bordoni-portfolio
