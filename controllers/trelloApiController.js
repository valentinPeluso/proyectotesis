var Trello = require("node-trello");
var trelloAPI = new Trello("4542a25c559e28c2ecaaf43c0799106a", "8a3e27483eca57ae934cc8b7aa9f06e74929886abc34f8b2d0dedd45cb29cd49");

function getMe(req, res, next){
     trelloAPI.get("/1/members/me", function(err, data) {
        if (err) throw err;  
        res.locals.data = data;      
        next();
    });
}

function getBoardLists(req, res, next){
    trelloAPI.get("/1/boards/" + req.params.id,{ lists: "open" }, function(err, data) {
        if (err) throw err;  
        res.locals.data = data;      
        next();
    });
}

module.exports = {
    me: getMe,
    getBoardLists: getBoardLists
};