FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install       # This installs Linux-compatible node_modules
COPY . .
CMD ["node", "index.js"]
