# Use official Node LTS image
FROM node:20-alpine

# Create app directory
WORKDIR /usr/src/app

# Only copy package files first for caching
COPY package*.json ./

# Install dependencies (production)
RUN npm ci --only=production

# Copy application source
COPY . .

# Expose the port that your server listens on (README suggests 5000)
EXPOSE 5000

# Start the server (use node or a process manager)
CMD ["npm", "start"]