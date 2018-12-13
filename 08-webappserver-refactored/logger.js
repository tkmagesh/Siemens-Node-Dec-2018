var chalk = require('chalk');

module.exports = function(req, res, next){
	var startTime = new Date();
	res.on('finish', function(){
		var endTime = new Date();
		var delta = endTime - startTime;
		console.log(chalk.red(req.method) + '\t' + chalk.blue(req.urlObj.pathname) + '\t' + chalk.bgGreen(delta + 'ms') + '\t' + chalk.cyan(res.statusCode));
	});
	next();
};