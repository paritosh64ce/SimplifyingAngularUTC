var myApp = angular.module('myApp');

myApp.controller('myHttpController',
	['$scope', 'myHttpSvc', '$log',
	function($scope, myHttpSvc, $log){

		// add plunk in the blog - as inline plunk in the blog
		$scope.myData = [];
		$scope.showLoader = false;
		$scope.name = '';

		$scope.getData = function(){
			$scope.showLoader = true;

			myHttpSvc.getServerData().then(function(result){
				$scope.myData = result;
			}, errorCallback).finally(function(){
				$scope.showLoader = false;
			});
		};

		$scope.addData = function(){
			$scope.showLoader = true;

			myHttpSvc.addData($scope.name).then(function(result){
				if(result == true){
					$scope.name = '';
					$scope.getData();
				} else{
					errorCallback(result);
				}
			}, errorCallback).finally(function(){
				$scope.showLoader = false;
			});
		};

		$scope.$on('$viewContentLoaded', function(){
			$scope.getData();
		});

		$scope.$watch('name', function(newVal, oldVal){
			$log.log(newVal);
		})

		function errorCallback(errorData){
			$log.log(errorData);			
		}
	}]
);