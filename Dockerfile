FROM node:24-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build && npm run scss

FROM node:24-alpine AS production
ENV NODE_ENV=production
WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/static ./static
COPY --from=builder /app/view ./view
COPY --from=builder /app/i18n ./i18n
COPY --from=builder /app/.env.example ./.env

USER node
EXPOSE 8080
CMD ["node", "dist/server.js"]
