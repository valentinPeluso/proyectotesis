var Trello = require("node-trello");
var trelloAPIKey = "4542a25c559e28c2ecaaf43c0799106a";

function getMe(req, res, next){
    var trelloAPI = new Trello(trelloAPIKey, req.headers.authorization);   
    trelloAPI.get("/1/members/me", function(err, data) {
        if (err) throw err;  
        res.data = data;      
        next();
    });
}

function membersBoards(req, res, next){
    var trelloAPI = new Trello(trelloAPIKey, req.headers.authorization);
    trelloAPI.get("/1/members/" + req.params.id + '/boards', { filter: "open" }, function(err, data) {
        if (err) throw err;  
        res.data = data;      
        next();
    });
}

function getBoardLists(req, res, next){
    var trelloAPI = new Trello(trelloAPIKey, req.headers.authorization);
    trelloAPI.get("/1/boards/" + req.params.id,{ lists: "open" }, function(err, data) {
        if (err) throw err;  
        res.data = data;      
        next();
    });
}

module.exports = {
    me: getMe,
    membersBoards: membersBoards,
    getBoardLists: getBoardLists
};