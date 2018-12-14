var fs = require('fs'),
	path = require('path');

var dbFile = path.join(__dirname, '../db/taskdata.json');

function load(callback){
	var contents = fs.readFileSync(dbFile, {encoding :'utf8'});
	var tasks = JSON.parse(contents);
	return tasks;
}

function save(tasks){
	return new Promise(function(resolveFn, rejectFn){
		fs.writeFile(dbFile, JSON.stringify(tasks), function(err){
			if (err){
				rejectFn(err);
			} else {
				resolveFn();
			}
		});
	})
	
}
module.exports = {
	load : load,
	save : save
};

