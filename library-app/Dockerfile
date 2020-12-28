FROM node
WORKDIR /app
COPY package*.json ./
#for proxy ssl certificate
RUN npm config set registry http://registry.npmjs.org/
RUN npm install
COPY public ./
COPY src ./src/
EXPOSE 4000
CMD ["node", "src/index.js"]