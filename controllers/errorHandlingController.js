function checkauth(req, res, next){
    if (!req.headers.authorization) {
        throw "Unauthorized";
    }
    next();
}

module.exports = {
    checkauth: checkauth,
};