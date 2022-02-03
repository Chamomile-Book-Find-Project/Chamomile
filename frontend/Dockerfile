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