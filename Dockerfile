# Dockerfile for running Expo dev server (web) for this project
# Note: This is intended for local development (mounting the project directory).

FROM node:18-alpine

# Install bash and git for compatibility
RUN apk add --no-cache bash git python3 make g++

# Install expo-cli globally
RUN npm install -g expo-cli

WORKDIR /app

# Copy package files and install deps (will be skipped when using volumes in dev, but useful for image build)
COPY package.json package-lock.json* ./
RUN npm install --no-audit --prefer-offline || true

# Expose common Expo ports
EXPOSE 19000 19001 19002 8081

# Default command — start expo in web mode (use tunnel if connecting from device)
CMD ["sh", "-c", "expo start --tunnel"]
