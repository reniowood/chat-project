FROM node:boron
RUN mkdir /myapp
WORKDIR /myapp
COPY package.json /myapp
RUN npm install
COPY . /myapp
CMD ["npm", "start", "$RUN_ENV"]