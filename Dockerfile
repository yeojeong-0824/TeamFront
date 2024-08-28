FROM node:18

WORKDIR /app

COPY package*.json ./

ARG NPM_CACHE_DIR=/app/.npm
RUN npm config set cache $NPM_CACHE_DIR --global

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]
