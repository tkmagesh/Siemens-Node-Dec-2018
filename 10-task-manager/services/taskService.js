var taskDb = require('./taskDb');
var tasks = [];

function load(callback){
	tasks = taskDb.load();
}

function getAll(){
	return tasks.slice(0);
}

function get(id){
	return tasks.find(function(task){
		return task.id === id;
	});
}

async function addNew(taskData){
	
	var newTaskId = tasks.reduce(function(result, task){
		return result > task.id ? result : task.id;
	}, 0) + 1;
	taskData.id = newTaskId;
	tasks.push(taskData);
	await taskDb.save(tasks);
	return taskData;
}

async function update(taskId, updatedTask){
	var taskToReplace = tasks.find(function(task){
		return task.id === taskId;
	});
	if (taskToReplace){
		tasks = tasks.map(function(task){
			return task.id === taskId ? updatedTask : task;
		});
		await taskDb.save(tasks)
		return updatedTask;		
	} else {
		/*return new Promise(function(resolveFn, rejectFn){
			rejectFn(new Error('Task do not exist'));	
		});*/
		//return Promise.reject(new Error('Task do not exist'));

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
		return taskDb
			.save(tasks);
		
	} else {
		return Promise.reject(new Error('Task do not exist'));
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

