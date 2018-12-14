var express = require('express');
var router = express.Router();

var tasks = [
	{id : 1, name : 'Learn JavaScript', isCompleted : false},
	{id : 2, name : 'Explore Bangalore', isCompleted : true}
];

router.get('/', function(req, res, next){
	res.status(200).json(tasks);
});

router.get('/:id', function(req, res, next){
	var taskId = parseInt(req.params.id);
	var task = tasks.find(function(task){
		return task.id === taskId;
	});
	if (task){
		res.status(200).json(task);	
	} else {
		res.status(404).json({});
	}
});

router.post('/', function(req, res, next){
	var taskData = req.body,
		newTaskId = tasks.reduce(function(result, task){
			return result > task.id ? result : task.id;
		}, 0) + 1;
	taskData.id = newTaskId;
	tasks.push(taskData);
	res.status(201).json(taskData);
});



module.exports = router;