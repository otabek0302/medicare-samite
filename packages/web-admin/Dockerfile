# Build stage
FROM node:20 as builder

WORKDIR /app

COPY package*.json ./

# Install with a timeout workaround
RUN npm install --legacy-peer-deps --verbose

COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]