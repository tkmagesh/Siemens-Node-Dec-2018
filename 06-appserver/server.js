var http = require('http'),
	url = require('url'),
	querystring = require('querystring');

var calculator = require('./calculator');

var server = http.createServer(function(req, res,){
	var urlObj = url.parse(req.url);
	if (urlObj.pathname === '/calculator'){
		var data = querystring.parse(urlObj.query),
			op = data.op,
			x = parseInt(data.x),
			y = parseInt(data.y);

		var result = calculator[op](x,y);
		res.write(result.toString());
		res.end();
	} else {
		res.statusCode = 404;
		res.end();
	}
});

server.listen(8080);

server.on('listening', function(){
	console.log('server listening on 8080');
});