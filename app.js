// Cargamos express en vez de http
var express = require('express');
var routes =  require('./config/routes');


// Lo iniciamos
var app = express();

routes(app);

// Decimos en que puerto queremos escuchar (el 8000)
app.listen(8000, function () {
  console.log("Esperando requests en el puerto 8000");
});
