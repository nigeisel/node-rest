var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'RaspberryNi Control Interface' });
    return;
});

router.get('/alive', function(req, res, next) {
    console.log("Im Alive...");
    res.status(200).json({ message: 'Im Alive, baby!' });
    return;
});

module.exports = router;
