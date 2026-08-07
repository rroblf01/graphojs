# Stage 1: Build the GraphoJS documentation site
FROM ghcr.io/pnpm/pnpm:11.20.0 AS builder

# The pnpm image has no node in PATH by default; add Node 22 for the build
# (esbuild postinstall and tsc need it).
RUN pnpm runtime set node 22 -g

WORKDIR /app

# Root config needed by the TypeScript build (tsconfig.base.json) and pnpm
COPY .npmrc package.json pnpm-lock.yaml pnpm-workspace.yaml tsconfig.base.json ./

# Install workspace dependencies (core + docs)
COPY packages/core/package.json packages/core/package.json
COPY packages/docs/package.json packages/docs/package.json
RUN pnpm install --frozen-lockfile

# Copy sources
COPY packages packages

# Build core (the docs vendor the core dist), then the docs site
RUN pnpm -C packages/core build
RUN pnpm -C packages/docs build

# Precompress text assets so gofly serves .gz directly (precompressed: true)
RUN find /app/packages/docs/dist -type f \( -name "*.js" -o -name "*.css" -o -name "*.html" -o -name "*.json" -o -name "*.svg" -o -name "*.xml" -o -name "*.txt" -o -name "*.webmanifest" \) \
    -exec gzip -9 -k {} \;

# Stage 2: Production — serve the static site with gofly (serves from /www)
FROM ghcr.io/rroblf01/gofly:1.1.2

COPY --from=builder /app/packages/docs/dist/ /www/

EXPOSE 80
