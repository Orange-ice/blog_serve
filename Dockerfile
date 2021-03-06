FROM node:12
# Create app directory
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install
COPY . .
EXPOSE 7001
CMD [ "npm", "run", "dev" ]
