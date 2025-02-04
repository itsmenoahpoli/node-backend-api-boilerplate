FROM node:20-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (if available) to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Install TypeScript and tsc-alias globally for build
RUN npm install -g typescript tsc-alias

# Build the TypeScript code
RUN tsc

# Expose the port your app will run on
EXPOSE 3000

# Command to run your app
CMD ["npm", "run", "start"]
