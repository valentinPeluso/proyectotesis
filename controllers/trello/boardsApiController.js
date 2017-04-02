var Trello = require("node-trello");
var trelloAPIController = require('./trelloApiController');

function createBoard(req, res, next) {
    var trelloAPI = new Trello(
        trelloAPIController.applicationKey,
        req.headers.authorization
    );
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
    var trelloAPI = new Trello(
        trelloAPIController.applicationKey,
        req.headers.authorization
    );

    if (typeof req.params.value == 'undefined')
        throw "Value attribute is required";
    var label = {
        value: req.params.value
    };

    trelloAPI.put(
        "/1/boards/" + req.params.id + '/labelNames/blue',
        label,
        function(err, data) {
            if (err) throw err;
            res.data = data;
            next();
        }
    );
}

function addLabelGreen(req, res, next) {
    var trelloAPI = new Trello(
        trelloAPIController.applicationKey,
        req.headers.authorization
    );

    if (typeof req.params.value == 'undefined')
        throw "Value attribute is required";

    var label = {
        value: req.params.value
    };

    trelloAPI.put(
        "/1/boards/" + req.params.id + '/labelNames/green',
        label,
        function(err, data) {
            if (err) throw err;
            res.data = data;
            next();
        }
    );
}

function addLabelOrange(req, res, next) {
    var trelloAPI = new Trello(
        trelloAPIController.applicationKey,
        req.headers.authorization
    );

    if (typeof req.params.value == 'undefined')
        throw "Value attribute is required";

    var label = {
        value: req.params.value
    };

    trelloAPI.put(
        "/1/boards/" + req.params.id + '/labelNames/orange',
        label,
        function(err, data) {
            if (err) throw err;
            res.data = data;
            next();
        }
    );
}

function addLabelPurple(req, res, next) {
    var trelloAPI = new Trello(
        trelloAPIController.applicationKey,
        req.headers.authorization
    );

    if (typeof req.params.value == 'undefined')
        throw "Value attribute is required";

    var label = {
        value: req.params.value
    };

    trelloAPI.put(
        "/1/boards/" + req.params.id + '/labelNames/purple',
        label,
        function(err, data) {
            if (err) throw err;
            res.data = data;
            next();
        }
    );
}

function addLabelRed(req, res, next) {
    var trelloAPI = new Trello(
        trelloAPIController.applicationKey,
        req.headers.authorization
    );

    if (typeof req.params.value == 'undefined')
        throw "Value attribute is required";

    var label = {
        value: req.params.value
    };

    trelloAPI.put(
        "/1/boards/" + req.params.id + '/labelNames/red',
        label,
        function(err, data) {
            if (err) throw err;
            res.data = data;
            next();
        }
    );
}

function addLabelYellow(req, res, next) {
    var trelloAPI = new Trello(
        trelloAPIController.applicationKey,
        req.headers.authorization
    );

    if (typeof req.params.value == 'undefined')
        throw "Value attribute is required";

    var label = {
        value: req.params.value
    };

    trelloAPI.put(
        "/1/boards/" + req.params.id + '/labelNames/yellow',
        label,
        function(err, data) {
            if (err) throw err;
            res.data = data;
            next();
        }
    );
}

function addListToBoard(req, res, next) {
    var trelloAPI = new Trello(
        trelloAPIController.applicationKey,
        req.headers.authorization
    );

    if (typeof req.params.name == 'undefined')
        throw "Name attribute is required";

    var list = {
        name: req.params.name
    };

    trelloAPI.post(
        "/1/boards/" + req.params.id + '/lists',
        list,
        function(err, data) {
            if (err) throw err;
            res.data = data;
            next();
        }
    );
}

function getListsFromBoard(req, res, next) {
    var trelloAPI = new Trello(
        trelloAPIController.applicationKey,
        req.headers.authorization
    );

    if (typeof req.params.id == 'undefined')
        throw "The ID of the board is required";

    var cards = {
        cards: "all"
    };

    trelloAPI.get(
        "/1/boards/" + req.params.id + '/lists',
        cards,
        function(err, data) {
            if (err) throw err;
            res.data = data;
            next();
        }
    );
}

function getLabelsFromBoard(req, res, next) {
    var trelloAPI = new Trello(
        trelloAPIController.applicationKey,
        req.headers.authorization
    );

    if (typeof req.params.id == 'undefined')
        throw "The ID of the board is required";

    trelloAPI.get(
        "/1/boards/" + req.params.id + '/labels',
        function(err, data) {
            if (err) throw err;
            res.data = data;
            next();
        }
    );
}

function getMembersFromBoard(req, res, next) {
    var trelloAPI = new Trello(
        trelloAPIController.applicationKey,
        req.headers.authorization
    );
    if (typeof req.params.id == 'undefined')
        throw "The ID of the board is required";

    trelloAPI.get(
        "/1/boards/" + req.params.id + '/members',
        function(err, data) {
            if (err) throw err;
            res.data = data;
            next();
        }
    );
}

function getCardsFromBoard(req, res, next) {
    var trelloAPI = new Trello(
        trelloAPIController.applicationKey,
        req.headers.authorization
    );

    if (typeof req.params.id == 'undefined')
        throw "The ID of the board is required";

    trelloAPI.get(
        "/1/boards/" + req.params.id + '/cards',
        function(err, data) {
            if (err) throw err;
            res.data = data;
            next();
        }
    );
}

function addMemberToBoard(req, res, next) {
    var trelloAPI = new Trello(
        trelloAPIController.applicationKey,
        req.headers.authorization
    );
    if (typeof req.params.email == 'undefined')
        throw "Email attribute is required";

    var member = {
        email: req.params.email,
        fullName: req.params.fullName
    };

    trelloAPI.put(
        "/1/boards/" + req.params.id + "/members",
        member,
        function(err, data) {
            if (err) throw err;
            res.data = data;
            next();
        }
    );
}

module.exports = {
    createBoard: createBoard,
    addMemberToBoard: addMemberToBoard,
    addListToBoard: addListToBoard,
    addLabelBlue: addLabelBlue,
    addLabelGreen: addLabelGreen,
    addLabelOrange: addLabelOrange,
    addLabelPurple: addLabelPurple,
    addLabelRed: addLabelRed,
    addLabelYellow: addLabelYellow,
    getLabelsFromBoard: getLabelsFromBoard,
    getListsFromBoard: getListsFromBoard,
    getMembersFromBoard: getMembersFromBoard,
    getCardsFromBoard: getCardsFromBoard
}
