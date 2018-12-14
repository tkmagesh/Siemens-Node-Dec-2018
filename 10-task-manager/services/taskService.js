var tasks = [];

function load(){
	tasks = [
		{id : 1, name : 'Learn JavaScript', isCompleted : false},
		{id : 2, name : 'Explore Bangalore', isCompleted : true}
	];
}

function getAll(){
	return tasks.slice(0);
}

function get(id){
	return tasks.find(function(task){
		return task.id === id;
	});
}

function addNew(taskData){
	var newTaskId = tasks.reduce(function(result, task){
		return result > task.id ? result : task.id;
	}, 0) + 1;
	taskData.id = newTaskId;
	tasks.push(taskData);
	return taskData;
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

