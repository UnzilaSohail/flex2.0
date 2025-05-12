FROM node:18


WORKDIR /app


COPY flex2.0/backend/package*.json ./


RUN npm install


COPY flex2.0/backend .


RUN npm rebuild bcrypt --build-from-source


EXPOSE 4000


CMD ["node", "index.js"]

