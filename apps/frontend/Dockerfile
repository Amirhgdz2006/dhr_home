# ---------- Stage 1: builder ----------
FROM node:22 AS builder
WORKDIR /app

COPY package.json package-lock.json nx.json ./
COPY apps ./apps

RUN npm ci

ARG VITE_BACKEND_URL=http://localhost:1338
ARG VITE_TEST_API_URL=http://localhost:1338/api/data
ARG VITE_PORT=3000
ARG VITE_HOST=0.0.0.0

ENV VITE_BACKEND_URL=$VITE_BACKEND_URL
ENV VITE_TEST_API_URL=$VITE_TEST_API_URL
ENV VITE_PORT=$VITE_PORT
ENV VITE_HOST=$VITE_HOST

RUN npx nx build frontend

# ---------- Stage 2: nginx ----------
FROM nginx:stable-alpine

COPY --from=builder /app/apps/frontend/dist /usr/share/nginx/html

COPY apps/frontend/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]