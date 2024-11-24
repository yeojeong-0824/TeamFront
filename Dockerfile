FROM node:18

WORKDIR /app

COPY package*.json ./

# 추가한 부분
RUN npm cache clean --force
RUN npm ci

# RUN npm install

# 추가한 부분
COPY tsconfig.json ./
COPY src ./src
COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]
