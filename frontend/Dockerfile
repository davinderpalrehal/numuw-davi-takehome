FROM node:22
WORKDIR /app
COPY package.json /app/
RUN npm install
CMD [ "npm", "run", "dev", "--", "--host" ]