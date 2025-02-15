FROM node:20
WORKDIR /app
COPY package*.json ./
RUN npm ci
RUN npm i -g serve
COPY . .
RUN npm run build
EXPOSE 3000
CMD [ "serve", "-s", "dist" ]