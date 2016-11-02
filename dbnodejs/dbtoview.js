var express = require('express');
var connection  = require('express-myconnection'); 
var bodyParser  = require('body-parser'); 
var http = require('http');
var mysql = require('mysql');
var path = require('path');

//apps: load route
var route = require('./route'); 
var app = express();
app.set('views', path.join(__dirname, 'viewstable'));
app.set('view engine', 'ejs');

//apps: set parser for input POST from EJS files
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

//apps: set DB Connection
app.use(
    
    connection(mysql,{
        
        host: 'localhost',
        user: 'root',
        password : 'af1988pn',
        port : 3306,
        database:'experiment'
    },'request')
);

//apps: set RESOURCE
app.get('/', function(req, res){
	route.list(req, res);
});
app.get('/index', route.index);
app.get('/edit/:userid', route.edit);
app.get('/delete/:userid', route.delete);

app.post('/save', route.index);

//START
http.createServer(app).listen(8080);
