var express = require('express');
var router = express.Router();
var taskService = require('../services/taskService');

router['init'] = function(){
	taskService.load();
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
	taskService
		.addNew(taskData)
			.then(function(newTask){
				res.status(201).json(newTask);	
			})
			.catch(function(err){
				res.status(404).end();	
			});	
});

/*
router.put('/:id', function(req, res, next){
	var taskId = parseInt(req.params.id);
	var updatedTaskData = req.body;
	taskService
		.update(taskId, updatedTaskData)
		.then(function(updatedTask){
			res.status(200).json(updatedTask);		
		})
		.catch(function(err){
			res.status(404).end();	
		})
});*/

router.put('/:id', async function(req, res, next){
	var taskId = parseInt(req.params.id);
	var updatedTaskData = req.body;
	try { 
		var updatedTask = await taskService.update(taskId, updatedTaskData);
		res.status(200).json(updatedTask);		
	} catch (err){
		res.status(404).end();	
	}

});

router.delete('/:id', function(req, res, next){
	var taskId = parseInt(req.params.id);
	
	taskService
		.remove(taskId)
		.then(function(){
			res.status(200).json({});	
		})
		.catch(function(){
			res.status(404).end();	
		})
});


module.exports = router;