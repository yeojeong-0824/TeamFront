FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm install @swc/helpers

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]
