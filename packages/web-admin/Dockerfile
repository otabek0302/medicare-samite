
# Stage 2: Serve with Nginx
FROM nginx:alpine

RUN mkdir -p /usr/share/nginx/html/admin
# Copy the build output to Nginx's html directorys
COPY ./dist/ /usr/share/nginx/html/admin


COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
