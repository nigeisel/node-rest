var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');
var https = require('https');
var http = require('http');

var key = fs.readFileSync('encryption/private.key');
var cert = fs.readFileSync( 'encryption/server.crt' );

var credentials = {
  key: key,
  cert: cert
};

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var portHttps = 8443;
var portHttp = 8080;

var router = express.Router();

router.get('/', function(req, res) {
    console.log("Request received:" + req);
    res.json({ message: 'Hello World!' });
});

app.use('/api/helloworld', router);

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);
httpsServer.listen(portHttps);
httpServer.listen(portHttp);

console.log('Starting HTTPS on port ' + portHttps);
console.log('Starting HTTP on port ' + portHttp);
