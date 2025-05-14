# Use node v18 base image
FROM node:18-alpine3.19

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json .
COPY yarn.lock .

# Install dependencies
RUN yarn install

# Copy the rest of the application code to the working directory
COPY . .

# Build TypeScript files
RUN yarn build
COPY src/environment/.dev.env /app/build/.env 
# Expose port 5000
EXPOSE 5000

# Command to run the application
CMD ["node", "build/src"]