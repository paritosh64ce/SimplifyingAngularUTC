var mySvcApp = angular.module('mySvcApp', []);

mySvcApp.service('myHttpSvc', ['$http', function($http){
	this.getServerData = function(){
		return $http.get('myData.json');
	};

	this.addData = function(name){
		return $http.post('postMethod', { 'name': name }, {});
	};
}]);
mySvcApp.service('mySharedDataSvc', [function(){
	var myProperty;

	this.setMyProperty = function(value){
		this.myProperty = value;
	};
	this.getMyProperty = function(value){
		return this.myProperty;
	};
}]);
mySvcApp.service('myMathSvc', [function(){
	this.add = function(a,b){
		if(isNaN(a) || isNaN(b)){
			throw new Error('invalid parameters');
		}
		return a+b;
	}
	this.divide = function(a,b){
		if(isNaN(a) || isNaN(b)){
			throw new Error('invalid parameters');
		}
		if(b == 0){
			throw new Error('divide by zero error');
		}
		return a/b;
	}
}]);