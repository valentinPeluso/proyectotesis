var Trello = require("node-trello");
var trelloAPIController = require('./trelloApiController');

function getRoles(req, res, next) {

    var roles = [{
        id: 'Scrum_Master',
        name: 'Scrum Mastar'
    }, {
        id: 'Team_Member',
        name: 'Team Member'
    }, {
        id: 'Product_Owner',
        name: 'Product Owner'
    }, {
        id: 'Other',
        name: 'Other'
    }];

    res.data = roles;
    next();
}

module.exports = {
    roles: getRoles
};
