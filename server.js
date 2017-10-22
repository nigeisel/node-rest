var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');
var https = require('https');
var http = require('http');
var auth = require('./authentification');
var execFile = require('child_process').execFile;
var cors = require('cors');

var key = fs.readFileSync('encryption/private.key');
var cert = fs.readFileSync('encryption/server.crt');

var credentials = {
  key: key,
  cert: cert
};

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

var portHttps = 8443;
var portHttp = 8080;

var router = express.Router();

router.get('/alive', function(req, res) {
    console.log("Alive...");
    res.status(200).json({ message: 'Im Alive!' });
});

router.get('/lights', function(req, res) {
    console.log("\nGET /api/lights request received...");

    if (auth.verifyAuth(req.headers)) {
        var what = req.param("what");
        var state = req.param("state");

        if (what === undefined || state == undefined) {
            console.log("Params: " + "what="+what + " & " + "state="+state);

            var hardware_path = "./hardware_ctrl/switch";
            console.log("Try execution hardware interface: " + hardware_path + " " + what + " " + state);
            execFile(hardware_path, [what, state], (error, stdout, stderr) => {
                if (error) {
                    console.log("Error executing hardware interface:" + error);
                    res.status(500).json({ message: 'hardware control failed' });
                } else {
                    log("Executed hardware interface" + hardware_path);
                }
            })
            console.log("Responding 200");
            res.status(200).json({ message: 'Lights' });
        } else {
            console.log("Params missing...");
            res.status(400).json({ message: 'Parameter missing' });
        }

    } else {
        console.log("Responding 401");
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
