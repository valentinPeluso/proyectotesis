var Trello = require("node-trello");
var trelloAPIKey = "4542a25c559e28c2ecaaf43c0799106a";

function getMe(req, res, next) {
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

function addListToBoard(req, res, next) {
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

function getListsFromBoard(req, res, next) {
    var trelloAPI = new Trello(trelloAPIKey, req.headers.authorization);
    if (typeof req.params.id == 'undefined')
        throw "The ID of the board is required";

    trelloAPI.get("/1/boards/" + req.params.id + '/lists', {
        cards: "all"
    }, function(err, data) {
        if (err) throw err;
        res.data = data;
        next();
    });
}

function getLabelsFromBoard(req, res, next) {
    var trelloAPI = new Trello(trelloAPIKey, req.headers.authorization);
    if (typeof req.params.id == 'undefined')
        throw "The ID of the board is required";

    trelloAPI.get("/1/boards/" + req.params.id + '/labels', function(err, data) {
        if (err) throw err;
        res.data = data;
        next();
    });
}

function getMembersFromBoard(req, res, next) {
    var trelloAPI = new Trello(trelloAPIKey, req.headers.authorization);
    if (typeof req.params.id == 'undefined')
        throw "The ID of the board is required";

    trelloAPI.get("/1/boards/" + req.params.id + '/members', function(err, data) {
        if (err) throw err;
        res.data = data;
        next();
    });
}

function getCardsFromBoard(req, res, next) {
    var trelloAPI = new Trello(trelloAPIKey, req.headers.authorization);
    if (typeof req.params.id == 'undefined')
        throw "The ID of the board is required";

    trelloAPI.get("/1/boards/" + req.params.id + '/cards', function(err, data) {
        if (err) throw err;
        res.data = data;
        next();
    });
}

function getListById(req, res, next) {
    var trelloAPI = new Trello(trelloAPIKey, req.headers.authorization);
    if (typeof req.params.id == 'undefined')
        throw "The ID of the list is required";

    trelloAPI.get("/1/lists/" + req.params.id, {
        cards: "all",
        card_fields: "name,desc"
    }, function(err, data) {
        if (err) throw err;
        res.data = data;
        next();
    });
}

function getCardById(req, res, next) {
    var trelloAPI = new Trello(trelloAPIKey, req.headers.authorization);
    if (typeof req.params.id == 'undefined')
        throw "The ID of the card is required";

    trelloAPI.get("/1/cards/" + req.params.id, function(err, data) {
        if (err) throw err;
        res.data = data;
        next();
    });
}



function addMemberToBoard(req, res, next) {
    var trelloAPI = new Trello(trelloAPIKey, req.headers.authorization);
    if (typeof req.params.email == 'undefined')
        throw "Email attribute is required";

    var member = {
        email: req.params.email,
        fullName: req.params.fullName
    }
    trelloAPI.put("/1/boards/" + req.params.id + "/members", member, function(err, data) {
        if (err) throw err;
        res.data = data;
        next();
    });
}

function membersBoards(req, res, next) {
    var trelloAPI = new Trello(trelloAPIKey, req.headers.authorization);
    trelloAPI.get("/1/members/" + req.params.id + '/boards', {
        filter: "open"
    }, function(err, data) {
        if (err) throw err;
        res.data = data;
        next();
    });
}

function createCard(req, res, next) {
    var trelloAPI = new Trello(trelloAPIKey, req.headers.authorization);
    if (typeof req.params.id == 'undefined')
        throw "List id is required";

    var card = {
        name: req.params.name,
        desc: req.params.desc
    };

    if (req.params.idMembers) {
        card.idMembers = req.params.idMembers;
    }

    trelloAPI.post("/1/lists/" + req.params.id + "/cards", card, function(err, data) {
        if (err) throw err;
        res.data = data;
        next();
    });
}

function createComent(req, res, next) {
    var trelloAPI = new Trello(trelloAPIKey, req.headers.authorization);
    if (typeof req.params.id == 'undefined')
        throw "Card id is required";

    var comment = {
        text: req.params.text
    };

    trelloAPI.post("/1/cards/" + req.params.id + "/actions/comments", comment, function(err, data) {
        if (err) throw err;
        res.data = data;
        next();
    });
}

function removeState(req, res, next) {
    var trelloAPI = new Trello(trelloAPIKey, req.headers.authorization);
    if (typeof req.params.idCard == 'undefined')
        throw "Card id is required";
    if (typeof req.params.idLabel == 'undefined')
        throw "State id is required";

    var card = {
        value: req.params.value
    };

    trelloAPI.del(
        "/1/cards/" + req.params.idCard + "/idLabels/" + req.params.idLabel,
        card,
        function(err, data) {
            if (err) throw err;
            res.data = data;
            next();
        }
    );
}

function assigneeState(req, res, next) {
    var trelloAPI = new Trello(trelloAPIKey, req.headers.authorization);
    if (typeof req.params.idCard == 'undefined')
        throw "Card id is required";

    var card = {
        value: req.params.value
    };

    trelloAPI.put(
        "/1/cards/" + req.params.idCard + "/idLabels",
        card,
        function(err, data) {
            if (err) throw err;
            res.data = data;
            next();
        }
    );
}

function moveCard(req, res, next) {
    var trelloAPI = new Trello(trelloAPIKey, req.headers.authorization);
    if (typeof req.params.idCard == 'undefined')
        throw "Card id is required";

    var card = {
        value: req.params.value
    };

    trelloAPI.put(
        "/1/cards/" + req.params.idCard + "/idList",
        card,
        function(err, data) {
            if (err) throw err;
            res.data = data;
            next();
        }
    );
}

function updateCard(req, res, next) {
    var trelloAPI = new Trello(trelloAPIKey, req.headers.authorization);
    if (typeof req.params.id == 'undefined')
        throw "Card id is required";

    var card = {
        name: req.params.name,
        desc: req.params.desc
    };

    trelloAPI.put("/1/cards/" + req.params.id, card, function(err, data) {
        if (err) throw err;
        res.data = data;
        next();
    });
}


module.exports = {
    me: getMe,
    membersBoards: membersBoards,
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
    getListById: getListById,
    getCardById: getCardById,
    getMembersFromBoard: getMembersFromBoard,
    createCard: createCard,
    createComent: createComent,
    updateCard: updateCard,
    moveCard: moveCard,
    assigneeState: assigneeState,
    getCardsFromBoard: getCardsFromBoard,
    removeState: removeState
};
