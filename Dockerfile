FROM ubuntu

ENV NODE_ENV production

RUN apt-get update && apt-get install -y nodejs npm

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
RUN npm install
COPY . /usr/src/app

EXPOSE 8080 8082
CMD ["nodejs", "server.js"]
