# Use official Node.js runtime as base image
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy application files
COPY . .

# Compile language files
RUN npm run compile-lang

# Expose port
EXPOSE 3000

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S staystrong -u 1001

# Change ownership of app directory
RUN chown -R staystrong:nodejs /app
USER staystrong

# Start the application
CMD ["npm", "start"]