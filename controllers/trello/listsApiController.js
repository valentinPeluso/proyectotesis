var Trello = require("node-trello");
var trelloAPIController = require('./trelloApiController');

function getListById(req, res, next) {
    var trelloAPI = new Trello(
        trelloAPIController.applicationKey,
        req.headers.authorization
    );

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

function createCard(req, res, next) {
    var trelloAPI = new Trello(
        trelloAPIController.applicationKey,
        req.headers.authorization);
    if (typeof req.params.id == 'undefined')
        throw "List id is required";

    var card = {
        name: req.params.name,
        desc: req.params.desc
    };

    if (req.params.idMembers) {
        card.idMembers = req.params.idMembers;
    }

    trelloAPI.post(
        "/1/lists/" + req.params.id + "/cards",
        card,
        function(err, data) {
            if (err) throw err;
            res.data = data;
            next();
        }
    );
}

module.exports = {
    getListById: getListById,
    createCard: createCard
}
