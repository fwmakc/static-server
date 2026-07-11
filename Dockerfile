FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build && npm run scss

FROM node:20-alpine AS production
WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/static ./static
COPY --from=builder /app/view ./view
COPY --from=builder /app/i18n ./i18n
COPY --from=builder /app/.env.example ./.env

EXPOSE 8080
CMD ["node", "dist/server.js"]
