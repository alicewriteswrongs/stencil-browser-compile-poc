default:
    just --list

dev:
    node devserver.js

build:
    cp www/index.html build/index.html

    npx esbuild src/main.tsx \
        --bundle \
        --outfile=build/main.js

fmt:
    npx prettier --write \
        src/**/*.ts \
        src/**/*.tsx \
        *.js
