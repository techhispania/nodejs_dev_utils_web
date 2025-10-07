#!/bin/bash
set -e  # Exit immediately if any command fails

CONTAINER_NAME="mongodb"
VOLUME_NAME="mongodb_data"
MONGO_PORT=27017
MONGO_IMAGE="mongo:latest"
MONGO_USER=$1
MONGO_PASS=$2

echo "======= Deploy DEV-Utils ======="
echo

if [ -z "$MONGO_USER" ] || [ -z "$MONGO_PASS" ]; then
  echo "Error. Missing parameters. Usage: $0 <mongo_root_user> <mongo_root_password>"
  exit 1
fi

echo "- Clean docker environment"
docker container stop mongodb || true
docker container rm mongodb || true
docker container stop dev-utils || true
docker container rm dev-utils || true
docker image rm dev-utils:latest || true

echo "- Create network"
if ! docker network inspect dev-utils >/dev/null 2>&1; then
    echo "Creating Docker network 'dev-utils'..."
    docker network create dev-utils
else
    echo "Docker network 'dev-utils' already exists."
fi

echo "- Install Mongodb"
if ! docker volume inspect "${VOLUME_NAME}" >/dev/null 2>&1; then
    echo "Creating new volume for Mongodb"
    docker volume create "${VOLUME_NAME}"
else
    echo "Docker volume '${VOLUME_NAME}' already exists. Keeping existing data."
fi

docker run -d \
  --name "${CONTAINER_NAME}" \
  -p ${MONGO_PORT}:27017 \
  -e MONGO_INITDB_ROOT_USERNAME="${MONGO_USER}" \
  -e MONGO_INITDB_ROOT_PASSWORD="${MONGO_PASS}" \
  -v "${VOLUME_NAME}":/data/db \
  --network dev-utils \
  "${MONGO_IMAGE}"


echo "- Install application"
docker build -t dev-utils .
docker run -d --name dev-utils -p 3000:3000 --network dev-utils dev-utils:latest

echo
echo "Application deployed ;)"