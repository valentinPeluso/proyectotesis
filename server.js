// Cargamos el modulo de HTTP
var http = require("http");
var url = require("url");
var saludador = require("./models/saludador");

// Creamos un servidor hola mundo
var server = http.createServer(function (req, res) {
    var query = url.parse(req.url, true).query;
    res.writeHead(200, {"Content-Type": "text/html"});
    res.end("<h1>" + saludador.saludar(query.nombre) + "</h1>");
});

// Decimos en que puerto queremos escuchar (el 8000)
server.listen(8000);

// Indicamos por consola que estamos escuchando
console.log("Esperando requests en el puerto 8000");