# Build stage
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
# Setting this env variable so vite builds our API fetch URL as relative paths
ENV VITE_USE_RELATIVE_API=true
RUN npm run build

# Serve stage using Nginx
FROM nginx:alpine
# Replace default config with our proxy-enabled config
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Copy built static files from previous stage
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
