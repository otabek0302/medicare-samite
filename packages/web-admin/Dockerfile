# Stage 1: Build the React app
FROM node:lts AS build

# Set the working directory
WORKDIR /var/www/admin-build

# Copy the rest of the application code
COPY . .

# Install dependencies
RUN npm install --legacy-peer-deps

# Build the application
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Copy the build output to Nginx's html directory
COPY --from=build /var/www/admin-build/dist /usr/share/nginx/html



# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]