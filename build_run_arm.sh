#!/bin/bash

set -e

echo "BUILDING for ARM architecture"

echo "--- building docker image... ---"
sudo docker build -f Dockerfile_arm --tag nilsg/raspi-node-rest .

echo "--- running docker container... ---"
sudo docker run -it --rm -p 8080:8080 -p 8443:8443 --cap-add SYS_RAWIO --device /dev/mem:/dev/mem --device /dev/gpiomem:/dev/gpiomem nilsg/raspi-node-rest ./entrypoint.sh
