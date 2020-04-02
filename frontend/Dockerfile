FROM node:10.9.0 as front_dev_image
LABEL maintainer="christopher bekos"
WORKDIR /app
COPY . ./
RUN yarn install
RUN yarn run build:prod

FROM node:10.9.0 as front_prod_image
WORKDIR /
COPY --from=front_dev_image /app/public public/
COPY --from=front_dev_image /app/server server/
RUN yarn init --yes && yarn add express@4.17.0 && yarn add serve-favicon@2.5.0
EXPOSE 8080
CMD ["node", "server/server.js"]