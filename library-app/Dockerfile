FROM node:15.5.0-alpine3.10
WORKDIR /app
COPY library-app/package*.json ./
#for proxy ssl certificate
RUN npm config set registry http://registry.npmjs.org/
RUN npm install
COPY library-app/ ./
EXPOSE 3000
CMD ["node", "src/index.js"]