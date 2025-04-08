# Build stage
FROM node:20-alpine AS build

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copy all files and build
COPY . .

# 👉 Increase memory limit when building
RUN NODE_OPTIONS="--max-old-space-size=2048" npm run build

# Production stage
FROM nginx:alpine

# Clean nginx default files
RUN rm -rf /usr/share/nginx/html/*

# Copy built frontend files
COPY --from=build /app/dist /usr/share/nginx/html

# Copy your nginx.conf
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]