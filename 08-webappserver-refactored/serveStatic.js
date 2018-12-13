var path = require('path'),
	fs = require('fs');

var staticResExtns = ['.html', '.css', '.js', '.ico', '.png', '.jpg', '.xml', '.txt', '.json'];

function isStatic(resourceName){
	var resourceExtn = path.extname(resourceName);
	return staticResExtns.indexOf(resourceExtn) >= 0;
}

module.exports = function(req, res){
	var resourceName = req.urlObj.pathname === '/' ? 'index.html' : req.urlObj.pathname;
	if (isStatic(resourceName)){
		var resourceFullName = path.join(__dirname, resourceName);
		fs.stat(resourceFullName, function(err, stats){
			if (err){
				console.log('[@serveStatic] - serving 404');
				res.statusCode = 404;
				res.end();
				return;
			}
			var stream = fs.createReadStream(resourceFullName);
			stream.pipe(res);
		});
	}
}