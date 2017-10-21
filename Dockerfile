ARG BASE_IMG
FROM $BASE_IMG

#FROM resin/raspberry-pi-alpine-node
#ENV INITSYSTEM on
#FROM node:alpine

RUN mkdir -p node-server
COPY . /node-server
WORKDIR node-server
RUN npm install

EXPOSE 8443
EXPOSE 8080

CMD ./entrypoint.sh
