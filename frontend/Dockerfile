# Use official Node image
FROM node:18

# Create app directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of your app source
COPY . .

# Expose the port React runs on
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
