# Stage 1: build the app
FROM node:20-alpine AS builder

# Set working directory inside the container
WORKDIR /app

# Copy package files first (leverages Docker layer cache)
COPY package*.json ./

# Install dependencies (production + dev needed for build)
RUN npm ci

# Copy source code
COPY . .

ARG VITE_BACKEND_URL
ENV VITE_BACKEND_URL=${VITE_BACKEND_URL}

# Build the production bundle (Vite)
RUN npm run build

# Stage 2: serve with nginx
FROM nginx:stable-alpine

# Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

# Copy built files from builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom nginx config (optional) to improve SPA routing
# If you want history mode routing to work for client-side routing:
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port nginx will serve
EXPOSE 80

# Start nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
