var path = require('path'),
	fs = require('fs');

var staticResExtns = ['.html', '.css', '.js', '.ico', '.png', '.jpg', '.xml', '.txt', '.json'];

function isStatic(resourceName){
	var resourceExtn = path.extname(resourceName);
	return staticResExtns.indexOf(resourceExtn) >= 0;
}

module.exports = function(staticResourcePath){
	return function(req, res, next){
		var resourceName = req.urlObj.pathname === '/' ? 'index.html' : req.urlObj.pathname;
		if (isStatic(resourceName)){
			var resourceFullName = path.join(staticResourcePath, resourceName);
			fs.stat(resourceFullName, function(err, stats){
				if (err){
					next();
					return;
				}
				var stream = fs.createReadStream(resourceFullName);
				stream.pipe(res);
				stream.on('end', function(){				
					next();
				});
			});
		} else {
			next();
		}
	};
};