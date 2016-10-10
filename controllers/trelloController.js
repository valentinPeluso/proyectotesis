function me(req, res){
   console.log(res.locals.data);
}

function getBoardLists(req, res) {
    console.log(res.locals.data);
}

module.exports = {
    me: me,
    getBoardLists: getBoardLists
};