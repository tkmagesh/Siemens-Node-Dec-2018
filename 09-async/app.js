/*function add(x,y, callback){
	console.log('add triggered');
	setTimeout(function(){
		var result = x + y;
		callback(result);
	}, 3000);
}*/

function add(x,y){
	console.log('add triggered');
	var promise = new Promise(function(resolveFn, rejectFn){
		setTimeout(function(){
			var result = x + y;
			console.log('add completed');
			resolveFn(result);
		}, 3000);
	});
	return promise;
}
module.exports = {
	add : add
};