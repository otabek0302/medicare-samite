# Build stage
FROM node:20 as builder

WORKDIR /app

# Copy only web-admin package files
COPY packages/web-admin/package*.json ./
RUN npm install --legacy-peer-deps

COPY packages/web-admin .

RUN NODE_OPTIONS="--max-old-space-size=2048" npm run build

# Production stage
FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*

# Copy build output
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx config
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]