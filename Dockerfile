FROM node:latest
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . .
COPY package*.json ./

RUN npm install
RUN npm install -g nodemon

EXPOSE 3000
CMD npm start
