FROM node:22-alpine

# create group and user "tessera-idp" to avoid the use of root inside the container
RUN addgroup -S dev-utils && adduser -S dev-utils -G dev-utils

RUN mkdir -p /opt/dev-utils

COPY . /opt/dev-utils

RUN chown -R dev-utils:dev-utils /opt/dev-utils

WORKDIR /opt/dev-utils

EXPOSE 3000

RUN npm install

ENTRYPOINT [ "node", "server.js" ]