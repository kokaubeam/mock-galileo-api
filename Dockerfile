FROM node:10.9-alpine as dependencies
WORKDIR /app
COPY package*.json ./
RUN npm set progress=false && npm config set depth 0
RUN npm install --only=production
RUN cp -R node_modules prod_node_modules
RUN npm install

FROM node:10.9-alpine as base
WORKDIR /app
COPY . .

FROM base as dev
COPY --from=dependencies /app/node_modules /app/node_modules
CMD npm run start:dev

FROM dev as test
CMD npm run unit

FROM base as build
COPY --from=dependencies /app/prod_node_modules /app/node_modules
EXPOSE 3000
CMD npm start
