var Trello = require("node-trello");
var trelloAPIController = require('./trelloApiController');

function searchUser(req, res, next) {
    var trelloAPI = new Trello(
        trelloAPIController.applicationKey,
        req.headers.authorization
    );
    if (typeof req.params.email === 'undefined' || req.params.email === '') {
        throw 'Email is required!';
    }
    trelloAPI.get("/1/search/members/?query=" + req.params.email + "&onlyOrgMembers=false", function(err, data) {
        if (err) throw err;
        res.data = data;
        next();
    });
}

module.exports = {
    user: searchUser
};
