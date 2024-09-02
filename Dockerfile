FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm cache clean --force && npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]
