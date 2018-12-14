var express = require('express');
var router = express.Router();
var taskService = require('../services/taskService');

router['init'] = function(callback){
	taskService.load(callback);
}

router.get('/', function(req, res, next){
	var tasks = taskService.getAll();
	res.status(200).json(tasks);
});

router.get('/:id', function(req, res, next){
	var taskId = parseInt(req.params.id);
	var task = taskService.get(taskId);
	if (task){
		res.status(200).json(task);	
	} else {
		res.status(404).json({});
	}
});

router.post('/', function(req, res, next){
	var taskData = req.body;
	taskService.addNew(taskData, function(err, newTask){
		if (!err){
			res.status(201).json(newTask);
		} else {
			res.status(404).end();
		}
	});
	
});

router.put('/:id', function(req, res, next){
	var taskId = parseInt(req.params.id);
	var updatedTaskData = req.body;
	try{
		var updatedTask = taskService.update(taskId, updatedTaskData);
		res.status(200).json(updatedTask);	
	} catch(err) {
		res.status(404).end();
	}
});

router.delete('/:id', function(req, res, next){
	var taskId = parseInt(req.params.id);
	try{
		taskService.remove(taskId);
		res.status(200).json({});
	} catch(err) {
		res.status(404).end();
	}
});


module.exports = router;