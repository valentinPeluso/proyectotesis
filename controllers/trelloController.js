function me(req, res){
   res.send(res.data);
}
function membersBoards(req, res){
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
function getBoardLists(req, res) {
    console.log(res.locals.data);
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

module.exports = {
    me: me,
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