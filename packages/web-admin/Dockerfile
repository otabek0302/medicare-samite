# Stage 1: Build the React app
FROM node:lts AS build

# Set the working directory
WORKDIR /var/www/admin-build

# Copy the rest of the application code
COPY . .




# Build the application
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

RUN mkdir -p /usr/share/nginx/html/admin
# Copy the build output to Nginx's html directorys
COPY --from=build /var/www/admin-build/dist /usr/share/nginx/html/admin


COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
