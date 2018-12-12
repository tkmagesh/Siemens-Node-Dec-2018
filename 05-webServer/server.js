var http = require('http');

var server = http.createServer(function(req /* ReadableStream */, res /* WritableStream*/){
	console.log(req.method + '\t' + req.url);
	res.write('<h1>Welcome to Node.js!</h1>');
	res.end();
});

server.listen(8080);

server.on('listening', function(){
	console.log('server listening on 8080!!');
});

console.log('starting server...');