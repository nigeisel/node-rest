var users = {
    // dev match uid to sha256 for "secret"
    0: "2bb80d537b1da3e38bd30361aa855686bde0eacd7162fef6a25fe97bf527a25b",
}

verifyAuth = function(req, res, next) {

    var uid = req.headers["user"];
    var pw = req.headers["password"];

    if (uid === undefined) {
        var err = new Error('Username missing');
        err.status = 403;
        return next(err);
    }
    if (pw === undefined) {
        var err = new Error('Password missing');
        err.status = 403;
        return next(err);
    }
    if (!(uid in users)) {
        var err = new Error('Username does not exist');
        err.status = 403;
        return next(err);
    }
    if (users[uid] != pw) {
        var err = new Error('Passowrd Wrong');
        err.status = 403;
        return next(err);
    }
    console.log("Auth... OK");

    next();
}

module.exports = verifyAuth;