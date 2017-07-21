var express = require("express");

var router = express.Router();

var request = require("request");
var cheerio = require("cheerio");


var Article = require("../models/Article.js");
var Comment = require("../models/Comment.js");


router.get("/", function(req,res){
  res.redirect("/articles");
});

router.get("/scrape", function(req, res) {

  request("https://arstechnica.com/", function(error, response, html) {

    var $ = cheerio.load(html);

    $("article header h2").each(function(i, element){

      var result = [];

      result.title = $(this).children("a").text();
      result.link = $(this).children("a").attr("href");

      var entry = new Article(result);

      entry.save(function(err, doc){

        if(err) {
          console.log(err);
        }
        else {
          console.log(doc);
        }
      });
    });
  });
  res.redirect("/articles");
});

router.get("/articles", function(req,res) {

  Article.find({}, function(error, found){
    if(error){
      res.send(error);
    }
    else{
      var artObj = {
        articles: found
      };
      res.render("index", artObj);
    }
  });
});

module.exports = router;
