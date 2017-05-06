var GitHubApi = require("github");
var Client = require("./../../node_modules/github/lib/index");
var github = new Client();

function reqAuthenticate(username, password) {
    github.authenticate({
        type: "basic",
        username: username,
        password: password
    });
}

function getAllRepos(req, res, next) {

    reqAuthenticate(req.params.username, req.params.password);

    github.repos.getAll({
        "affiliation": "owner,organization_member"
    }, function(err, response) {
        if (err) throw err;
        res.data = response.data;
        res.send(res.data);
    });
}

function getAllPullRequest(req, res, next) {
    if (typeof req.params.owner == 'undefined')
        throw "Owner is required";
    if (typeof req.params.repo == 'undefined')
        throw "Repositry is required";

    reqAuthenticate(req.params.username, req.params.password);

    github.pullRequests.getAll({
            "owner": req.params.owner,
            "repo": req.params.repo,
            "state": "all"
        },
        function(err, response) {
            if (err) throw err;
            res.data = response.data;
            res.send(res.data);
        }
    );
}

function commentPullRequestBody(req, res, next) {
    if (typeof req.params.owner == 'undefined')
        throw "Owner is required";
    if (typeof req.params.repo == 'undefined')
        throw "Repositry is required";
    if (typeof req.params.number == 'undefined')
        throw "Pull request id is required";

    reqAuthenticate(req.params.username, req.params.password);

    var body = {
        owner: req.params.owner,
        repo: req.params.repo,
        number: parseInt(req.params.number),
        state: 'open',
        body: req.params.description || '',
        title: req.params.title || ''
    };

    github.pullRequests.update(
        body,
        function(err, response) {
            if (err) throw err;
            res.data = response.data;
            res.send(res.data);
        }
    );
}

function authenticate(req, res, next) {
    if (typeof req.params.username == 'undefined')
        throw "Username is required";
    if (typeof req.params.password == 'undefined')
        throw "Password is required";

    var username = req.params.username,
        password = req.params.password;

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
    repos: {
        getAll: getAllRepos
    },
    pullRequests: {
        getAll: getAllPullRequest,
        commentBody: commentPullRequestBody
    }
}
