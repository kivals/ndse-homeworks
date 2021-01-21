FROM node:15.6.0-alpine3.10
WORKDIR /home/node/app
COPY package*.json ./
#for proxy ssl certificate
RUN npm config set registry http://registry.npmjs.org/
RUN npm install
COPY . .
EXPOSE 8001
CMD [ "node", "app.js" ]
