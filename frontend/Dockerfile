FROM node:latest

# ports 
EXPOSE 3000
EXPOSE 35729

# Set working directory 
WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH 

COPY package.json /app/package.json 
COPY package-lock.json /app/package-lock.json
 
RUN npm install 
RUN npm install react-scripts -g 
RUN npm install react-router-dom 
RUN npm install -g serve
RUN npm install axios 

ADD . /app

# CMD [ "serve", "-s" , "build" ]
RUN npm run build 

# 셀러리 , 레비댐 큐  (비동기 처리를 위해 사용)


# amazon kinesis  ( kafka 기반)

# RabbitMQ 


# sudo docker ps -a  <--- image 확인 


# 빌드 파일 저장 공간 생성해줘야함 