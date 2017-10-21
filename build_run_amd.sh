#!/bin/sh

echo "BUILDING for AMD64 architecture"

echo "--- building docker image... ---"
docker build --build-arg BASE_IMG=node:alpine --tag nilsg/raspi-node-rest .

echo "--- running docker container... ---"
docker run -it --rm -p 8080:8080 -p 8443:8443 nilsg/raspi-node-rest ./entrypoint.sh
