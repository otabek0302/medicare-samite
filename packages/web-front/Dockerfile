FROM node:lts-alpine AS build

WORKDIR /var/www/front-build

COPY packages/web-front/package*.json ./
RUN npm install --legacy-peer-deps

COPY packages/web-front .

RUN npm run build

# Production Stage
FROM nginx:alpine

COPY --from=build /var/www/front-build/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]