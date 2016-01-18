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

router.get ("/diaspora/clusterNames",function(req,res) {
	var view = "_design/clusters/_view/clusterNames";
	var db = "diaspora";
	var options = {
		startKey : [],
		endKey : []
	};
	couch.get (db, view, options, function(err,resData) {
		if (err) {
			console.log ("KO")
			console.log (err);
			console.log (resData);
			res.json ({status: "ERROR", value: err, code: resData});
		}
		else {
			console.log ("OK");
			console.log (resData);
			if (resData.data && resData.data.rows) {
				res.json (resData.data.rows);
			} else {
				res.json ({status: "ERROR", value: "Error fetching rows"});
			}
		}
	});
}),

router.route('/diaspora/:id/:rev')
	.get(function(req,res) {
		var id = req.params.id;
		console.log ("READ " + id);
		couch.get ("diaspora",id, function (err,resData) {
			if (err) {
				console.log ("KO")
				console.log (err);
				console.log (resData);
				res.json ({status: "ERROR", value: err, code: resData});
			}
			else {
				console.log ("OK");
				console.log (resData);
				res.json(resData.data);
			}

		})
	})
	.delete (function (req,res) {
		console.log ("DELETE /diaspora");
		var d = new diaspora.Diaspora();
		var p = req.params;
		//console.log (p);
		console.log (req.params);
		couch.del ("diaspora", p.id, p.rev, function (err, resData) {
			console.log ("Tried update, result is:");
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
		
	})
	.put (function (req,res) {
		console.log ("PUT /diaspora");
		//console.log ("Calling postme");
		var d = new diaspora.Diaspora();
		//console.log (req.body);
		var p = req.body;
		//console.log (p);
		console.log (p);
		couch.update ("diaspora", p, function (err, resData) {
			console.log ("Tried update, result is:");
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
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use ('/',router);


app.listen (41459);