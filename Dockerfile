# Use an official Node.js runtime as a parent image
FROM node:20-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of your monorepo into the container
COPY . .

# Expose the ports that your apps use
EXPOSE 3001

# Start all services in development mode
CMD ["npm", "run", "start:debug:all"]