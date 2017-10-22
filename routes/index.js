var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'RaspberryNi Control Interface' });
});

router.get('/lights', function(req, res) {
    console.log("\nGET /api/lights request received...");

    if (auth.verifyAuth(req.headers)) {
        var what = req.param("what");
        var state = req.param("state");

        if (what != undefined && state != undefined) {

            var validWhat = ["a", "b", "c", "d", "light", "music"];
            var validState = ["on", "off"];

            if (validWhat.indexOf(what) > -1 && validState.indexOf(state) > -1) {
                console.log("Params: " + "what="+what + " & " + "state="+state);

                var hardware_path = "./hardware_ctrl/switch";
                console.log("Try execution hardware interface: " + hardware_path + " " + what + " " + state);
                execFile(hardware_path, [what, state], (error, stdout, stderr) => {
                    if (error) {
                        console.log("Error executing hardware interface:" + error);
                        res.status(500).json({ message: 'hardware control failed' });
                    } else {
                        console.log("Executed hardware interface" + hardware_path);
            }
            })
                console.log("Responding 200");
                res.status(200).json({ message: 'Lights' });
            }
            else {
                console.log("Wrong parameter:" + what + " or: " + state);
                res.status(400).json({ message: 'Invalid parameters' });
            }
        } else {
            console.log("Params missing...");
            res.status(400).json({ message: 'Parameter missing' });
        }
    } else {
        console.log("Responding 401");
        res.status(401).json({ message: 'NO!' });
    }
});

router.get('/alive', function(req, res) {
    console.log("Alive...");
    res.status(200).json({ message: 'Im Alive!' });
});


module.exports = router;
