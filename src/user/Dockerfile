# Use Node.js LTS as base image
FROM node:18

# Set working directory
WORKDIR /..

# Copy package files and install dependencies then remove unneccessary dependencies
COPY /../package*.json ./
RUN rm -rf node_modules
RUN npm install
RUN npm prune  

# Copy user service source code
COPY . .

# Build the NestJS project (if using TypeScript)
RUN npm run build

# Expose the port your service listens on (e.g., 3000 for HTTP, 5051 for gRPC)
EXPOSE 3000
EXPOSE 5051

# Start the service
CMD ["npm", "run", "start:prod"]