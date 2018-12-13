module.exports = function(req, res, next){
	var startTime = new Date();
	res.on('finish', function(){
		var endTime = new Date();
		var delta = endTime - startTime;
		console.log(req.method + '\t' + req.urlObj.pathname + '\t' + delta + 'ms' + '\t' + res.statusCode);
	});
	next();
};