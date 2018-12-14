var taskDb = require('./taskDb');
var tasks = [];

function load(callback){
	taskDb.load(function(err, taskList){
		if (err){
			return callback(err);
		} else {
			tasks = taskList;
			return callback(null);
		}
	});
}

function getAll(){
	return tasks.slice(0);
}

function get(id){
	return tasks.find(function(task){
		return task.id === id;
	});
}

function addNew(taskData, callback){
	var newTaskId = tasks.reduce(function(result, task){
		return result > task.id ? result : task.id;
	}, 0) + 1;
	taskData.id = newTaskId;
	tasks.push(taskData);
	taskDb.save(tasks, function(err){
		if (!err){
			callback(null, taskData)
		} else {
			callback(err);
		}
	});
}

function update(taskId, updatedTask){
	var taskToReplace = tasks.find(function(task){
		return task.id === taskId;
	});
	if (taskToReplace){
		tasks = tasks.map(function(task){
			return task.id === taskId ? updatedTask : task;
		});
		return updatedTask;
	} else {
		throw new Error('Task do not exist');
	}
}

function remove(taskId){
	var taskToRemove = tasks.find(function(task){
		return task.id === taskId;
	});
	if (taskToRemove){
		tasks = tasks.filter(function(task){
			return task.id !== taskId;
		});
	} else {
		throw new Error('Task do not exist');
	}
}

module.exports = {
	load : load,
	getAll : getAll,
	get : get,
	addNew : addNew,
	update : update,
	remove : remove
};

