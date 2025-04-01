# Stage 1: Build the React app
FROM node:lts AS build

# Set the working directory
WORKDIR /var/www/front-build

# Copy the rest of the application code
COPY . .

# Install dependencies
RUN npm install --legacy-peer-deps

# Build the application
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Copy the build output to Nginx's html directory
COPY --from=build /var/www/front-build/dist /usr/share/nginx/html

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]