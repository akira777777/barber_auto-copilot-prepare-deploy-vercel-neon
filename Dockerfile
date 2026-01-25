FROM node:18-alpine AS builder

WORKDIR /app

# Build-time configuration (Vite inlines these during build)
ARG GEMINI_API_KEY
ARG API_KEY
ARG VITE_API_URL
ENV GEMINI_API_KEY=$GEMINI_API_KEY
ENV API_KEY=$API_KEY
ENV VITE_API_URL=$VITE_API_URL

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built files from builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
