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

function createBoard(req, res, next) {
    var trelloAPI = new Trello(trelloAPIKey, req.headers.authorization);
    if (typeof req.params.name == 'undefined')
        throw "Board Name is required";
    
    var board = {
        name: req.params.name,
        defaultLabels: false,
    	defaultLists: false,
    	desc: 'Board'
    };
    
    trelloAPI.post("/1/boards/", board, function(err, data) {
        if (err) throw err;  
        res.data = data;      
        next();
    });
}

function addLabelBlue(req, res, next) {
    var trelloAPI = new Trello(trelloAPIKey, req.headers.authorization);
    if (typeof req.params.value == 'undefined')
        throw "Value attribute is required";
    var label = {
        value: req.params.value
    };     
    
    trelloAPI.put("/1/boards/" + req.params.id + '/labelNames/blue', label, function(err, data) {
        if (err) throw err;  
        res.data = data;      
        next();
    });    
}
function addLabelGreen(req, res, next) {
    var trelloAPI = new Trello(trelloAPIKey, req.headers.authorization);
    if (typeof req.params.value == 'undefined')
        throw "Value attribute is required";
    var label = {
        value: req.params.value
    };
    trelloAPI.put("/1/boards/" + req.params.id + '/labelNames/green', label, function(err, data) {
        if (err) throw err;  
        res.data = data;      
        next();
    });
}
function addLabelOrange(req, res, next) {
    var trelloAPI = new Trello(trelloAPIKey, req.headers.authorization);
    if (typeof req.params.value == 'undefined')
        throw "Value attribute is required";
    var label = {
        value: req.params.value
    };
    trelloAPI.put("/1/boards/" + req.params.id + '/labelNames/orange', label, function(err, data) {
        if (err) throw err;  
        res.data = data;      
        next();
    });
}
function addLabelPurple(req, res, next) {
    var trelloAPI = new Trello(trelloAPIKey, req.headers.authorization);
    if (typeof req.params.value == 'undefined')
        throw "Value attribute is required";
    var label = {
        value: req.params.value
    };
    trelloAPI.put("/1/boards/" + req.params.id + '/labelNames/purple', label, function(err, data) {
        if (err) throw err;  
        res.data = data;      
        next();
    });
}
function addLabelRed(req, res, next) {
    var trelloAPI = new Trello(trelloAPIKey, req.headers.authorization);
    if (typeof req.params.value == 'undefined')
        throw "Value attribute is required";
    var label = {
        value: req.params.value
    };
    trelloAPI.put("/1/boards/" + req.params.id + '/labelNames/red', label, function(err, data) {
        if (err) throw err;  
        res.data = data;      
        next();
    });
}
function addLabelYellow(req, res, next) {
    var trelloAPI = new Trello(trelloAPIKey, req.headers.authorization);
    if (typeof req.params.value == 'undefined')
        throw "Value attribute is required";
    var label = {
        value: req.params.value
    };
    trelloAPI.put("/1/boards/" + req.params.id + '/labelNames/yellow', label, function(err, data) {
        if (err) throw err;  
        res.data = data;      
        next();
    });
}

function addListToBoard(req, res, next){
    var trelloAPI = new Trello(trelloAPIKey, req.headers.authorization);
    if (typeof req.params.name == 'undefined')
        throw "Name attribute is required";
    var list = {
        name: req.params.name
    };
    
    trelloAPI.post("/1/boards/" + req.params.id + '/lists', list, function(err, data) {
        if (err) throw err;  
        res.data = data;      
        next();
    });
}

function addMemberToBoard(req, res, next){
    var trelloAPI = new Trello(trelloAPIKey, req.headers.authorization);
    if (typeof req.params.email == 'undefined')
        throw "Email attribute is required";
    
    var member = {
        email:  req.params.email,
        fullName: req.params.fullName
    }
    trelloAPI.put("/1/boards/" + req.params.id + "/members", member, function(err, data) {
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
    getBoardLists: getBoardLists,
    createBoard: createBoard,
    addMemberToBoard: addMemberToBoard,
    addListToBoard: addListToBoard,
    addLabelBlue: addLabelBlue,
    addLabelGreen: addLabelGreen,
    addLabelOrange: addLabelOrange,
    addLabelPurple: addLabelPurple,
    addLabelRed: addLabelRed,
    addLabelYellow: addLabelYellow
};