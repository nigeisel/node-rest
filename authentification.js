var users = {
    // dev match uid to sha256 for "secret"
    0: "2bb80d537b1da3e38bd30361aa855686bde0eacd7162fef6a25fe97bf527a25b",
}

exports.verifyAuth = function(headers) {
    var uid = headers["user"];
    var pw = headers["password"];

    if (!(uid in users)) {
        return false;
    }
    if (users[uid] != pw) {
        return false;
    }
    return true;
}
