FROM node:lts-alpine

# Set current dir
WORKDIR /usr/src/app

# Install dependencies
COPY yarn.lock .
COPY package.json .
RUN yarn --frozen-lockfile --verbose

# Run server
EXPOSE 3000

CMD ["yarn", "start"]
