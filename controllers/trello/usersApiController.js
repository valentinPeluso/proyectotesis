var Trello = require("node-trello");
var trelloAPIController = require('./trelloApiController');

function getRoles(req, res, next) {

    var roles = [{
        id: 'Verification_Validation',
        name: 'Verification and Validation'
    }, {
        id: 'Requeriment',
        name: 'Requeriment'
    }, {
        id: 'Admin',
        name: 'Administrator'
    }, {
        id: 'Analysis',
        name: 'Analysis'
    }, {
        id: 'Developmen',
        name: 'Developmen'
    }];

    res.data = roles;
    next();
}

module.exports = {
    roles: getRoles
};
