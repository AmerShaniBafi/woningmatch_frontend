# =========================
# Build stage
# =========================
FROM node:24-alpine AS build

WORKDIR /app

# Eerst dependencies kopiëren en installeren
COPY package*.json ./
RUN npm ci

# Daarna de rest van het project kopiëren
COPY . .

# React/Vite productie-build maken
RUN npm run build


# =========================
# Production stage
# =========================
FROM nginx:alpine

# Onze Nginx-configuratie gebruiken
COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# De door Vite gemaakte dist-map naar Nginx kopiëren
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]