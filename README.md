# node-rest
HTTPS secured RESTful API created with node and Express, ready to be run in an ARMv6 (RaspberryPi 1) Docker Container

# Usage 

* `build_run_arm.sh` will build ready docker container and run it for ARM Architecture
* `build_run_amd.sh` will build ready docker container and run it for AMD64 Architecture
  * exposes port 8080 (for http) and 8443 for (https secured) api
  * starts both services
* Cert for SSL not included:
  * run `openssl req -x509 -newkey rsa:2048 -keyout private.pem -out cert.pem -days 365` to create
