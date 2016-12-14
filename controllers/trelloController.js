function me(req, res){
   res.send(res.data);
}

function getBoardLists(req, res) {
    console.log(res.locals.data);
}

module.exports = {
    me: me,
    getBoardLists: getBoardLists
};