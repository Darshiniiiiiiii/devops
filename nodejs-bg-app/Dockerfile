# -----------------------------------------------------------------------
# Stage 1: Build Stage (Not strictly needed for a simple app, but good practice)
# We use node:18-alpine for a small, efficient base image.
# -----------------------------------------------------------------------
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json first to leverage Docker layer caching
COPY package*.json ./

# Install application dependencies. 
# We use 'npm ci' and '--production' for fast, reliable installs in CI/CD.
RUN npm ci --production

# Copy the rest of the application source code (server.js, etc.)
COPY . .

# Inform Docker that the container listens on the specified network port (3000)
# Note: The app uses the PORT environment variable, which defaults to 3000.
EXPOSE 3000

# Command to run the application when the container starts.
# We run 'npm start', which executes 'node server.js' based on package.json
CMD [ "npm", "start" ]
