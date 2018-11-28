FROM nginx

COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY nginx/conf /etc/nginx
COPY nginx/entrypoint /entrypoint

EXPOSE 3000

# Start the server
CMD ["nginx", "-g", "daemon off;"]
