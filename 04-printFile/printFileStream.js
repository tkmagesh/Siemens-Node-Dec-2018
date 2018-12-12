var fs = require('fs');

var stream = fs.createReadStream('./sample.txt', { encoding : 'utf8'});



/*
var counter = 0;

stream.on('data', function(chunk){
	++counter;
	console.log(chunk);
});

stream.on('error', function(err){
	console.log(err.message);
});

stream.on('end', function(){
	console.log('Thats all folks!!');
	console.log('readCount = ', counter);
});
*/

stream.pipe(process.stdout);

var counter = 0;

stream.on('data', function(chunk){
	++counter;
});

stream.on('end', function(){
	console.log('Thats all folks!!');
	console.log('readCount = ', counter);
});

