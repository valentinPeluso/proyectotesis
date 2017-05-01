var GitHubApi = require("github");
var Client = require("./../../node_modules/github/lib/index");
var https = require('https');
var username = '';
var password = '';

function get(req, res, next) {

    var github = new Client();

    debugger;

    https.get(req.params.url, function(err, response) {
        if (err) throw err;
        res.data = response.data;
        res.send(res.data);
    });

    // github.authenticate({
    //     type: "basic",
    //     username: username,
    //     password: password
    // });

    // github.repos.getAll({
    //     "affiliation": "owner,organization_member"
    // }, function(err, response) {
    //     if (err) throw err;
    //     res.data = response.data;
    //     res.send(res.data);
    // });
}

function authenticate(req, res, next) {
    if (typeof req.params.username == 'undefined')
        throw "Username is required";
    if (typeof req.params.password == 'undefined')
        throw "Password is required";

    username = req.params.username;
    password = req.params.password;

    var github = new Client();

    github.authenticate({
        type: "basic",
        username: username,
        password: password
    });

    github.users.get({}, function(err, response) {
        if (err) throw err;
        res.data = response.data;
        res.send(res.data);
    });
}

module.exports = {
    authenticate: authenticate,
    get: get
}
