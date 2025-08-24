# Use an official Node.js runtime as a parent image
FROM node:20-alpine

# Set workdir & env
WORKDIR /usr/src/app
ENV NODE_ENV=production

# Install deps
COPY package*.json ./
RUN npm ci

# Copy source and build
COPY . .
RUN npm run build

# Expose the web port (Heroku will supply $PORT)
EXPOSE 3000

# Start all services (gateway must bind 0.0.0.0:$PORT)
CMD ["npm", "run", "start:prod:all"]