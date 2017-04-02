var Trello = require("node-trello");
var trelloAPIController = require('./trelloApiController');

function getCardAttachments(req, res, next) {
    var trelloAPI = new Trello(
        trelloAPIController.applicationKey,
        req.headers.authorization
    );

    if (typeof req.params.id == 'undefined')
        throw "The ID of the card is required";

    trelloAPI.get(
        "/1/cards/" + req.params.id + '/attachments',
        function(err, data) {
            if (err) throw err;
            res.data = data;
            next();
        }
    );
}

function getCardById(req, res, next) {
    var trelloAPI = new Trello(
        trelloAPIController.applicationKey,
        req.headers.authorization
    );

    if (typeof req.params.id == 'undefined')
        throw "The ID of the card is required";

    trelloAPI.get("/1/cards/" + req.params.id, function(err, data) {
        if (err) throw err;
        res.data = data;
        next();
    });
}

function createComent(req, res, next) {
    var trelloAPI = new Trello(
        trelloAPIController.applicationKey,
        req.headers.authorization
    );

    if (typeof req.params.id == 'undefined')
        throw "Card id is required";

    var comment = {
        text: req.params.text
    };

    trelloAPI.post(
        "/1/cards/" + req.params.id + "/actions/comments",
        comment,
        function(err, data) {
            if (err) throw err;
            res.data = data;
            next();
        }
    );
}

function removeState(req, res, next) {
    var trelloAPI = new Trello(
        trelloAPIController.applicationKey,
        req.headers.authorization
    );

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

function addAttachment(req, res, next) {
    var trelloAPI = new Trello(
        trelloAPIController.applicationKey,
        req.headers.authorization
    );
    if (typeof req.params.idCard == 'undefined')
        throw "Card id is required";

    var card = {
        file: req.params.file
    };

    trelloAPI.post(
        "/1/cards/" + req.params.idCard + "/attachments",
        card,
        function(err, data) {
            if (err) throw err;
            res.data = data;
            next();
        }
    );
}

function assigneeState(req, res, next) {
    var trelloAPI = new Trello(
        trelloAPIController.applicationKey,
        req.headers.authorization
    );

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
    var trelloAPI = new Trello(
        trelloAPIController.applicationKey,
        req.headers.authorization
    );

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
    var trelloAPI = new Trello(
        trelloAPIController.applicationKey,
        req.headers.authorization
    );

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
    getCardById: getCardById,
    createComent: createComent,
    updateCard: updateCard,
    moveCard: moveCard,
    assigneeState: assigneeState,
    removeState: removeState,
    getCardAttachments: getCardAttachments,
    addAttachment: addAttachment
}
