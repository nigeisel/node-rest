var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');
var https = require('https');
var http = require('http');
var auth = require('./authentification');
var execFile = require('child_process').execFile;

var key = fs.readFileSync('encryption/private.key');
var cert = fs.readFileSync('encryption/server.crt');

var credentials = {
  key: key,
  cert: cert
};

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var portHttps = 8443;
var portHttp = 8080;

var router = express.Router();

router.get('/helloworld', function(req, res) {
    console.log("Request received:" + req);
    res.status(200).res.json({ message: 'Hello World!' });
});

router.get('/lights', function(req, res) {
    if (auth.verifyAuth(req.headers)) {
        execFile('./hardware_ctrl/switch', ['light', 'on'], (error, stdout, stderr) => {
            if (error) {
                res.status(500).json({ message: 'hardware control failed' });
            }
        });
        res.status(200).json({ message: 'Lights' });
    } else {
        res.status(401).json({ message: 'NO!' });
    }
});

app.use('/api', router);

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);
httpsServer.listen(portHttps);
httpServer.listen(portHttp);

console.log('Starting HTTPS on port ' + portHttps);
console.log('Starting HTTP on port ' + portHttp);
