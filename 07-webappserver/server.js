var http = require('http'),
	url = require('url'),
	querystring = require('querystring'),
	path = require('path'),
	fs = require('fs');

var calculator = require('./calculator');

var staticResExtns = ['.html', '.css', '.js', '.ico', '.png', '.jpg', '.xml', '.txt', '.json'];

function isStatic(resourceName){
	var resourceExtn = path.extname(resourceName);
	return staticResExtns.indexOf(resourceExtn) >= 0;
}

var server = http.createServer(function(req, res,){
	console.log(req.method + '\t' + req.url);
	var urlObj = url.parse(req.url);
	var resourceName = urlObj.pathname === '/' ? 'index.html' : urlObj.pathname;
	if (isStatic(resourceName)){
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
	}
	else if (urlObj.pathname === '/calculator' && req.method === 'GET'){
		var data = querystring.parse(urlObj.query),
			op = data.op,
			x = parseInt(data.x),
			y = parseInt(data.y);

		var result = calculator[op](x,y);
		res.write(result.toString());
		res.end();
	} else if (urlObj.pathname === '/calculator' && req.method === 'POST'){
		var rawData = '';
		req.on('data', function(chunk){
			rawData += chunk;
		});
		req.on('end', function(){
			var data = querystring.parse(rawData),
				op = data.op,
				x = parseInt(data.x),
				y = parseInt(data.y);

			var result = calculator[op](x,y);
			res.write(result.toString());
			res.end();	
		});
	} else {
		res.statusCode = 404;
		res.end();
	}
});

server.listen(8080);

server.on('listening', function(){
	console.log('app server listening on 8080');
});