# syntax=docker/dockerfile:1

FROM node:22-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY build/ ./build/
COPY src/ ./src/

RUN --mount=type=bind,from=external-assets,source=.,target=/external-assets \
    ASSETS_DIR=/external-assets npm run build


# Local website
FROM nginx:alpine AS production

COPY --from=builder /app/dist/ /usr/share/nginx/html/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]


# GitHub Pages deployment
FROM builder AS deploy

CMD ["npx", "gh-pages", "-d", "dist"]