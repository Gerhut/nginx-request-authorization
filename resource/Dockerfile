FROM node

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json package-lock.json /usr/src/app/
RUN npm install --production && npm cache clean --force

COPY . /usr/src/app/

ENV PORT 80
EXPOSE 80

CMD [ "npm", "start", "--production" ]
