#!/bin/bash

echo "BUILDING for ARM architecture"

echo "--- building docker image... ---"
sudo docker build --build-arg BASE_IMG=resin/raspberry-pi-node:8.0.0 --tag nilsg/raspi-node-rest .

echo "--- running docker container... ---"
sudo docker run -it --rm -p 8080:8080 -p 8443:8443 --volume /dev/mem:/dev/mem --volume /dev/gpiomem:/dev/gpiomem nilsg/raspi-node-rest ./entrypoint_bash.sh
