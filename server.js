var express = require("express");
var mongoose = require("mongoose");

var bodyParser = require("body-parser");

var exphbs = require("express-handlebars");

mongoose.Promise = Promise;

var port = process.env.PORT || 3000;

var app = express();

app.use(bodyParser.urlencoded({
  extended: false
}));


app.use(express.static("public"));

app.engine("handlebars", exphbs({defaultLayout: "Main"}));
app.set("view engine", "handlebars");

var routes = require("./controllers/articleController.js");

app.use("/", routes);

mongoose.connect("mongodb://localhost/newsScraper");

var db = mongoose.connection;

db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

db.once("open", function() {
  console.log("Mongoose connection successful.");

});

app.listen(port, function() {
  console.log("App running on port 3000!");
});
