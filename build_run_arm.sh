#!/bin/sh

echo "BUILDING for ARM architecture"

echo "--- building docker image... ---"
sudo docker build --build-arg BASE_IMG=resin/raspberry-pi-alpine-node --tag nilsg/raspi-node-rest .

echo "--- running docker container... ---"
sudo docker run -it --rm -p 8080:8080 -p 8443:8443 nilsg/raspi-node-rest ./entrypoint.sh
