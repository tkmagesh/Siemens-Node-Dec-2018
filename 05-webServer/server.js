var http = require('http'),
	fs = require('fs'),
	path = require('path');

var server = http.createServer(function(req /* ReadableStream */, res /* WritableStream*/){
	console.log(req.method + '\t' + req.url);
	var resourceName = req.url === '/' ? 'index.html' : req.url;
	var resourceFullName = path.join(__dirname, resourceName);
	fs.stat(resourceFullName, function(err, stats){
		if (err){
			res.statusCode = 404;
			res.end();
			return;
		}
		var stream = fs.createReadStream(resourceFullName);
		stream.pipe(res);
	});
});

server.listen(8080);

server.on('listening', function(){
	console.log('web server listening on 8080!!');
});

console.log('starting server...');