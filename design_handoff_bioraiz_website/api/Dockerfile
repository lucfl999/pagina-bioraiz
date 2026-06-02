# Dockerfile para Railway backend

FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./
COPY api/package.json api/

# Install dependencies
RUN npm ci --workspaces

# Copy source code
COPY api ./api

# Build if necessary
RUN npm run build -w api

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/health', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

# Start server
CMD ["npm", "start", "-w", "api"]
