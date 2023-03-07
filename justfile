default:
    just --list

dev:
    npx esbuild src/main.tsx \
        --bundle \
        --outdir=www \
        --watch \
        --servedir=www

build:
    cp www/index.html build/index.html

    npx esbuild src/main.tsx \
        --bundle \
        --outfile=build/main.js
