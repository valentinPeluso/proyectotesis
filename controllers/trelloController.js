function me(req, res) {
    res.send(res.data);
}

function membersBoards(req, res) {
    res.send(res.data);
}

function createBoard(req, res) {
    res.send(res.data);
}

function addMemberToBoard(req, res) {
    res.send(res.data);
}

function addListToBoard(req, res) {
    res.send(res.data);
}

function addLabelBlue(req, res) {
    res.send(res.data);
}

function addLabelGreen(req, res) {
    res.send(res.data);
}

function addLabelOrange(req, res) {
    res.send(res.data);
}

function addLabelPurple(req, res) {
    res.send(res.data);
}

function addLabelRed(req, res) {
    res.send(res.data);
}

function addLabelYellow(req, res) {
    res.send(res.data);
}

function getListsFromBoard(req, res) {
    res.send(res.data);
}

function getMembersFromBoard(req, res) {
    res.send(res.data);
}

function createCard(req, res) {
    res.send(res.data);
}

function createComent(req, res) {
    res.send(res.data);
}

function updateCard(req, res) {
    res.send(res.data);
}

function getListById(req, res) {
    res.send(res.data);
}

function getCardById(req, res) {
    res.send(res.data);
}

function getCardsFromBoard(req, res) {
    res.send(res.data);
}

function moveCard(req, res) {
    res.send(res.data);
}

function getLabelsFromBoard(req, res) {
    res.send(res.data);
}

function assigneeState(req, res) {
    res.send(res.data);
}

function removeState(req, res) {
    res.send(res.data);
}

function getCardAttachments(req, res) {
    res.send(res.data);
}

function addAttachment(req, res) {
    res.send(res.data);
}

function getRoles(req, res) {
    res.send(res.data);
}

function searchUser(req, res) {
    res.send(res.data);
}

module.exports = {
    me: me,
    membersBoards: membersBoards,
    createBoard: createBoard,
    addMemberToBoard: addMemberToBoard,
    addListToBoard: addListToBoard,
    addLabelBlue: addLabelBlue,
    addLabelGreen: addLabelGreen,
    addLabelOrange: addLabelOrange,
    addLabelPurple: addLabelPurple,
    addLabelRed: addLabelRed,
    getLabelsFromBoard: getLabelsFromBoard,
    addLabelYellow: addLabelYellow,
    getListsFromBoard: getListsFromBoard,
    getListById: getListById,
    getCardById: getCardById,
    getMembersFromBoard: getMembersFromBoard,
    createCard: createCard,
    createComent: createComent,
    updateCard: updateCard,
    getCardsFromBoard: getCardsFromBoard,
    moveCard: moveCard,
    assigneeState: assigneeState,
    removeState: removeState,
    getCardAttachments: getCardAttachments,
    addAttachment: addAttachment,
    roles: getRoles,
    search: searchUser
};
