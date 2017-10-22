#!/bin/sh

set -e

echo "BUILDING for AMD64 architecture"

echo "--- building docker image... ---"
docker build --build-arg BASE_IMG=node:8.7.0 --tag nilsg/node-rest .

echo "--- running docker container... ---"
docker run -it --rm -p 8080:8080 -p 8443:8443 nilsg/node-rest ./entrypoint.sh
