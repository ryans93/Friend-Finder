var express = require("express");
var bodyParser = require("body-parser");

var app = express();
//port initialized
var PORT = process.env.PORT || 3000; 

// configure bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

//routes
require('./app/routing/apiRoutes.js')(app);
require('./app/routing/htmlRoutes.js')(app);

//port started
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
