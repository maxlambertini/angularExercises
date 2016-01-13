//microframwework
var express = require("express");
var bodyParser = require ("body-parser");
console.log ("Express started");

//library
var diaspora = require("./js/diaspora.js")
console.log ("Diaspora lib loaded");

//couchdb
var nodeCouchDB = require("node-couchdb");
var couch = new nodeCouchDB("localhost", 5984);
console.log ("Couchdb Loaded");
console.log(couch);
console.log ("Couchdb Launched");

//body parser
var bodyParser = require('body-parser')
var app = express();

console.log ("Body parser installed");

var router = express.Router();

router.get("/diaspora/:id",function(req,res) {
	var id = req.params.id;
	console.log ("READ " + id);
	res.json ({"id" : id})	
});

router	
	.route("/diaspora")
	.get(function (req,res) {
		console.log ("GET /diaspora");
		var d = new diaspora.Diaspora();
		res.json(d);
		//console.log(res.json(d));
	})
	.post (function (req,res) {
		console.log ("POST /diaspora");
		//console.log ("Calling postme");
		var d = new diaspora.Diaspora();
		//console.log (req.body);
		var p = req.body;
		//console.log (p);
		console.log (p);
		couch.insert ("diaspora", p, function (err, resData) {
			console.log ("Tried insert, result is:");
			console.log (resData);
			res.type("application/json");
			if (err) {
				console.log ("Got error ")
				console.log (err)
				res.json ({
					status: "KO",
					error : err
				})
			} else {
				res.json ({
					status: "OK",
					resData : resData
				});					
			}
			console.log("Done");			
		})	
		console.log(p);
		//res.json(d);
		
	});

console.log ("Routes created");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use ('/',router);


app.listen (41459);