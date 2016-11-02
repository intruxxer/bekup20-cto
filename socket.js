var http = require('http');
var fs   = require('fs');

//START
var server = http.createServer(function(req, res){
	fs.readFile('./chat_views/chatroom.html', 'utf-8', function(error, content){
		res.writeHead(200, { 'Content-Type': 'text/html' });
		res.end(content);
	});
});

var io 	 = require('socket.io').listen(server);

io.sockets.on('connection', function(socket, username){
	//When clients connect, they are sent a message from server.
	socket.emit('message', 'You are connected!');
	//Other existing clients are notified that someone has joined
	socket.broadcast.emit('message', 'Another client has joined the room!');

	socket.on('add_username', function(username){
		socket.username = username;
	});
	socket.on('message', function(message){
		socket.broadcast.emit('message', message);
	});

});

server.listen(8080);