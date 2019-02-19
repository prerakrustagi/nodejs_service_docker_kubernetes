FROM node:5.6.0
WORKDIR /dockerapp
COPY package.json /dockerapp
RUN npm install
COPY . /dockerapp
CMD npm start
EXPOSE 5001