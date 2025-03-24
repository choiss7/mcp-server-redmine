# Node.js 공식 이미지를 기반으로 합니다.
FROM node:18-alpine

# 작업 디렉토리를 설정합니다.
WORKDIR /app

# 패키지 파일을 복사하고 의존성을 설치합니다.
COPY package*.json ./
RUN npm install --legacy-peer-deps

# 소스 코드를 복사합니다.
COPY . .

# 미리 컴파일된 TypeScript 코드를 사용합니다.
COPY dist/ /app/dist/

# 환경 변수 설정
ENV NODE_ENV=production

# 기본 포트를 노출합니다.
EXPOSE 3003

# 애플리케이션을 실행합니다.
CMD ["node", "dist/index.js"] 