FROM node:lts-alpine

# Set current dir
WORKDIR /usr/src/app

RUN chown 1000:1000 -R /usr/src/app

USER 1000

# Install dependencies
RUN yarn install

# Run server
EXPOSE 3000

CMD ["yarn", "start"]
