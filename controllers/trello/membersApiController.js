var Trello = require("node-trello");
var trelloAPIController = require('./trelloApiController');

function getMe(req, res, next) {
    var trelloAPI = new Trello(
        trelloAPIController.applicationKey,
        req.headers.authorization
    );
    trelloAPI.get("/1/members/me", function(err, data) {
        if (err) throw err;
        res.data = data;
        next();
    });
}

function membersBoards(req, res, next) {
    var trelloAPI = new Trello(
        trelloAPIController.applicationKey,
        req.headers.authorization
    );
    trelloAPI.get("/1/members/" + req.params.id + '/boards', {
        filter: "open"
    }, function(err, data) {
        if (err) throw err;
        res.data = data;
        next();
    });
}

module.exports = {
    me: getMe,
    membersBoards: membersBoards
};
