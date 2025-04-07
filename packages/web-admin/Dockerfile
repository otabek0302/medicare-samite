# Build stage
FROM node:20 as builder

WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .

# Increase memory limit here during build
RUN NODE_OPTIONS="--max-old-space-size=2048" npm run build

# Production stage
FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]