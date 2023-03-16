#!/bin/bash

set -euxo pipefail

mkdir -p build

cp www/index.html build/index.html

npx esbuild src/main.tsx \
    --bundle \
    --minify \
    --outfile=build/main.js
