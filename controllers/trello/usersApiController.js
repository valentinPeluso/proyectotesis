var Trello = require("node-trello");
var trelloAPIController = require('./trelloApiController');

function getRoles(req, res, next) {

    var roles = [{
        id: 'Scrum_Master',
        name: 'Scrum Mastar',
        label: 'label-warning'
    }, {
        id: 'Team_Member',
        name: 'Team Member',
        label: 'label-primary'
    }, {
        id: 'Product_Owner',
        name: 'Product Owner',
        label: 'label-danger'
    }, {
        id: 'Other',
        name: 'Other',
        label: 'label-info'
    }];

    res.data = roles;
    next();
}

module.exports = {
    roles: getRoles
};
