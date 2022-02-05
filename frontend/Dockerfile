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

ADD . /app

CMD [ "npm", "start" ]

# 셀러리 , 레비댐 큐  (비동기 처리를 위해 사용)


# amazon kinesis  ( kafka 기반)

# RabbitMQ 


# sudo docker ps -a  <--- image 확인 