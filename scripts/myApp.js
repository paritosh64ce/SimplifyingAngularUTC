var myApp = angular.module('myApp', ['mySvcApp']);
myApp.controller('myMathController', 
	['$scope', '$window', '$log', 'myMathSvc', 
	function($scope, $window, $log, myMathSvc){

		$scope.param1 = 0;
		$scope.param2 = 0;
		$scope.result = 0;

		$scope.addition = function(){
			$scope.result = myMathSvc.add($scope.param1, $scope.param2);
		};

		$scope.division = function(){
			try{
				$scope.result = myMathSvc.divide($scope.param1, $scope.param2);
			}
			catch(e){
				$window.alert(e.message);
				$log.log(e);
				$scope.result = '';
			}
		};
	}]
);
myApp.controller('myThisController', 
	['$scope', '$timeout', 'myMathSvc', 
	function($scope, $timeout, myMathSvc){

		this.param1 = 0;
		this.param2 = 0;
		this.result = 0;

		this.addition = function(){
			this.result = myMathSvc.add(this.param1, this.param2);
		};

		this.delayedAddition = function(){
			var tempResult = myMathSvc.add(this.param1, this.param2);
			$timeout(function(){
				this.result = tempResult;
			});
		};

	}]
);