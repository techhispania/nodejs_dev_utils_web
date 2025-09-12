#!/bin/bash

echo "Start deploy process in Local environment"
echo

docker container stop dev-utils

docker container rm dev-utils

docker build -t dev-utils .

docker run -d --name dev-utils -p 3000:3000 --network dev-utils dev-utils:latest

echo
echo "Application deployed ;)"