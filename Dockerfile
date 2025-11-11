# Build stage - Multi-stage build to minimize final image size
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm

# Copy package.json and pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# Install dependencies with pnpm (only production dependencies)
RUN pnpm install --frozen-lockfile

# Copy application source code
COPY . .

# Build the application
RUN pnpm build

# Production stage - Lightweight runtime using Node.js
FROM node:20-alpine

# Set environment to production
ENV NODE_ENV=production

# Install pnpm and a lightweight web server
RUN npm install -g pnpm serve

# Set working directory
WORKDIR /app

# Copy built assets from builder stage
COPY --from=builder /app/dist ./dist

# Expose the port (3000 is default for serve)
EXPOSE 3000

# Add health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

# Start the application with serve
CMD ["serve", "-s", "dist", "-l", "3000"]
