# Node.js 18 LTS 버전 기반의 이미지 사용
FROM node:18

# 작업 디렉토리 설정
WORKDIR /app

# package.json과 package-lock.json 복사
COPY package*.json ./

# 프로젝트의 의존성 설치
RUN npm install --production

# 애플리케이션 코드 복사
COPY . .

# 애플리케이션이 3000번 포트에서 수신 대기하도록 설정
EXPOSE 3000

# Node.js 애플리케이션을 실행
CMD ["node", "server.js"]
