# ---------- Stage 1: builder ----------
FROM node:22 AS builder
WORKDIR /app

COPY package.json package-lock.json nx.json ./
COPY apps ./apps

RUN npm ci
RUN npx nx build frontend

# ---------- Stage 2: nginx ----------
FROM nginx:stable-alpine

# مسیر واقعی خروجی build frontend
COPY --from=builder /app/apps/frontend/dist /usr/share/nginx/html

# custom nginx config
COPY apps/frontend/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
