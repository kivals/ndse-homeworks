FROM node:15.5.0-alpine3.10
WORKDIR /app
COPY package*.json ./
#for proxy ssl certificate
RUN npm config set registry http://registry.npmjs.org/
RUN npm install
COPY common/ ./common/
COPY views-counter-app/ ./views-counter-app/
EXPOSE 4000
CMD ["node", "views-counter-app/src/index.js"]