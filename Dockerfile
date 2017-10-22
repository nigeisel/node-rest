ARG BASE_IMG
FROM $BASE_IMG

#FROM resin/raspberry-pi-alpine-node
#ENV INITSYSTEM on
#FROM node:alpine

RUN mkdir -p node-server
COPY package.json /node-server
WORKDIR node-server
RUN npm install
COPY . /node-server
RUN git clone git://git.drogon.net/wiringPi
RUN cd wiringPi && ./build

EXPOSE 8443
EXPOSE 8080

CMD ./entrypoint_bash.sh
