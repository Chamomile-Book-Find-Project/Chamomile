FROM node:12
# 해당 부분은 변경할 예정 
USER root

COPY . /frontend

WORKDIR /frontend 

# 현재 host ip로 되있는 부분 웹서버 구현 이후, 변경 예정 
ENV REACT_APP_HOST_IP_ADDRESS $API_URL 
ENV REACT_APP_BACKEND_URL $REACT_APP_BACKEND_URL 

RUN npm install 

COPY . ./

RUN npm run build 

# 실행 
CMD "npm", "run", "dev"