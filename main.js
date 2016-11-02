var express = require('express'), http = require('http');
//load route
var route   = require('./manage'), app = express();

app.get('/', route.index);
app.get('/category', route.category);
app.get('/contact', route.contact);

http.createServer(app).listen(8888);
