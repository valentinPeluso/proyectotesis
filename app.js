// Cargamos express en vez de http
var restify = require('restify');
var routes = require('./config/routes');

var server = restify.createServer({
    name: 'Proyecto Tesis App',
    version: '1.0.0'
});
server.use(
    function crossOrigin(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        return next();
    }
);
server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

routes(server);

server.listen(process.env.PORT, process.env.IP);
