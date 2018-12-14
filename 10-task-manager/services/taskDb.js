var fs = require('fs'),
	path = require('path');

var dbFile = path.join(__dirname, '../db/taskdata.json');

function load(callback){
	fs.readFile(dbFile, {encoding :'utf8'}, function(err, contents){
		if (err){
			return callback(err);
		}
		var tasks = JSON.parse(contents);
		callback(null, tasks);
	});
}

function save(tasks, callback){
	fs.writeFile(dbFile, JSON.stringify(tasks), callback);
}
module.exports = {
	load : load,
	save : save
};

