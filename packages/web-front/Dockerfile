FROM node:lts-alpine AS build

WORKDIR /var/www/front-build

COPY . .
RUN npm install --legacy-peer-deps
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Copy the build output to Nginx's html directory
COPY --from=build /var/www/front-build/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]