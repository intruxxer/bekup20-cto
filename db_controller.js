var express    = require('express');
var connection = require('express-myconnection');
var http       = require('http');
var mysql      = require('mysql');
var path       = require('path');

//load route
var route      = require('./db_route');
var app	       = express();
app.set('views', path.join(__dirname, 'db_views')); 
app.set('view engine', 'ejs'); 

app.use(
	connection(mysql, {
		host: 'localhost',
		user: 'root',
		password: 'af1988pn',
		port: 3306,
		database: 'experiment'
	}, 'request')
);

//app.get('./list', route.list);

app.get('/category', function(req, res){
	route.list(req, res);
});


http.createServer(app).listen(8888);
