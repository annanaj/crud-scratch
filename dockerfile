# Stage 1: Build the React app
FROM node:alpine as builder
WORKDIR /app
COPY package*.json ./
COPY yarn*.lock ./
RUN yarn install
COPY . .
RUN yarn build

# Stage 2: Nginx to serve the built React app
FROM nginx:1.19.0
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
# Update this line to copy from the dist directory due to Vite defaults
COPY --from=builder /app/dist .

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Set permissions for Nginx to access the files
RUN chmod -R 755 /usr/share/nginx/html

EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]
