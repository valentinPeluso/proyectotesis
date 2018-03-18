var fs = require("fs");
var mime = require("mime");
var _ = require("lodash")

function getFile(req, res){
    
    fs.readFile('../' + req.url, function(err, data) {
        if (err) 
            throw err;
        res.contentType = mime.lookup(getFileName(req));
        res.writeHead(200);
        res.end(data);
    });
}

function getFileName(req) {
    var filename = "";
    var array = _.split(req.url, '/');
    filename = _.last(array);
    return filename;
}

module.exports = {
    getFile: getFile,
};