FROM node:lts-alpine

# Set current dir
WORKDIR /usr/src/app

# Install dependencies
COPY yarn.lock .
COPY package.json .
RUN yarn --frozen-lockfile --verbose

# Run vue server
EXPOSE 8080

CMD ["yarn", "serve"]
