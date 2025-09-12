FROM node:22-alpine

# create group and user "dev-utils" to avoid the use of root inside the container
RUN addgroup -S dev-utils && adduser -S dev-utils -G dev-utils

# create the directory where the application will be installed
RUN mkdir -p /opt/dev-utils

# copy all the application files in the directory previously created
COPY . /opt/dev-utils

# change the owner of the application to the user previously created
RUN chown -R dev-utils:dev-utils /opt/dev-utils

# change the work directory to the application directory
WORKDIR /opt/dev-utils

# expose the port 3000 that is the one where the application will run
EXPOSE 3000

# install all the dependencies in the environment
RUN npm install

# run the command that starts the application
ENTRYPOINT [ "node", "server.js" ]