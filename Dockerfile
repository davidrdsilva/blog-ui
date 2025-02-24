# Stage 1: Build the application
FROM node:20-alpine AS builder

# Create app directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy the rest of the application code
COPY . .

# Disable Next.js telemetry
ENV NEXT_TELEMETRY_DISABLED=1

# Build the application
RUN npm run build

# Stage 2: Run the application
FROM node:20-alpine

# Create a non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Create app directory
WORKDIR /app

# Copy built files from the builder stage
COPY --from=builder /app ./

# Install only production dependencies and change ownership of the app directory
RUN npm ci --omit=dev \
    && chown -R appuser:appgroup /app

# Switch to the non-root user
USER appuser

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
