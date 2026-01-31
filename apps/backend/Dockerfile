# ---------- Stage 1: builder ----------
FROM node:22 AS builder
WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
    python3 build-essential ca-certificates \
 && rm -rf /var/lib/apt/lists/*

COPY package.json package-lock.json nx.json ./
COPY apps ./apps

RUN npm ci
RUN npx nx build backend

RUN npm prune --production

# ---------- Stage 2: runtime ----------
FROM node:22-slim AS runtime
WORKDIR /app

RUN useradd --user-group --create-home --shell /bin/false appuser

COPY --from=builder /app/apps/backend/dist ./dist
COPY --from=builder /app/apps/backend/uploads ./uploads

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

ENV NODE_ENV=production
EXPOSE 1338

RUN chown -R appuser:appuser /app
USER appuser

CMD ["node", "dist/server.js"]
