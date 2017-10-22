var express = require('express');
var router = express.Router();
var execFile = require('child_process').execFile;

router.get('/lights', function(req, res, next) {
    console.log("GET /api/lights request received...");

    var what = req.query.what;
    var state = req.query.state;

    if (what === undefined || state === undefined) {
        var err = new Error('Parameter missing');
        err.status = 400;
        return next(err);
    }

    var validWhat = ["a", "b", "c", "d", "light", "music"];
    var validState = ["on", "off"];

    if (validWhat.indexOf(what) === -1 || validState.indexOf(state) === -1) {
        var err = new Error('Wrong parameters');
        err.status = 400;
        return next(err);
    }
    console.log("Params: " + "what="+what + " & " + "state="+state);

    var hardware_path = "./hardware_ctrl/switch";
    console.log("Try execution hardware interface: " + hardware_path + " " + what + " " + state);
    execFile(hardware_path, [what, state], (error, stdout, stderr) => {
        if (error) {
            var err = new Error('Executing hardware interface failed:' + error);
            err.status = 500;
            return next(err);
            return next(err);
        } else {
            console.log("Executed hardware interface" + hardware_path);
            console.log("Stdout: " + stdout.replace(/(\r\n|\n|\r)/gm,""));
            console.log("Hardware Interface called succesfully, Respond 200");
            res.status(200).json({ message: 'Lights' });
            return;
        }
    })
});

module.exports = router;
