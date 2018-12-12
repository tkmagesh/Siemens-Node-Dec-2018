var fs = require('fs');

fs.readFile('./sample1.txt', { encoding : 'utf8'}, function(err, fileContents){
	if (err){
		console.log(err.message);
		return;
	}
	console.log(fileContents);
	console.log('Thats all folks!!');
});