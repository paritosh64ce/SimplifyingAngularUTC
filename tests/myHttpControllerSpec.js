describe('testing myHttpController', function(){

	var $controller, scope, $compile;
	var ctrl, getController;
	var windowMock, logMock, myHttpSvc;

	beforeEach(function(){
		module('mySvcApp');
		module('myApp');

		inject(function($injector){
			$compile = $injector.get('$compile');
			$controller = $injector.get('$controller');
			scope = $injector.get('$rootScope').$new();
			myHttpSvc = $injector.get('myHttpSvc');

			logMock = {
				log:  function(msg){}
			};

			getController = function(){
				return $controller('myHttpController', {
					'$scope': scope,
					'$log': logMock,
					'myHttpSvc': myHttpSvc
				});
			};

			ctrl = getController();
		});

	});

	it('1. should load controller properly', function(){
		expect(ctrl).not.toBeNull();
		expect(ctrl).not.toBe(undefined);

		expect(angular.equals(scope.myData, [])).toBe(true);
	});

	it('2. should call getServerData and update scope.myData when scope.getData is called', function(){
		var fakeResult = ['one', 'two', 'three'];
		spyOn(myHttpSvc, 'getServerData').andCallFake(function(){
			return {
				then: function(callback){ callback(fakeResult); return this; },
				finally: function(callback){ return callback(this); }
			};
		});
		//// understand why we need to return the object 'this' in 'then' part.
		//// as you can see that the same object is needed to call 'finally' (in the controller)
		
		//// in the controller, if we had the async function called without finally,
		//// we would have set the spy as per below 
		//spyOn(myHttpSvc, 'getServerData').andCallFake(function(){
		//	return {
		//		then: function(callback){ return callback(fakeResult); }
		//	};
		//});

		scope.getData();
		scope.$digest();
		expect(myHttpSvc.getServerData).toHaveBeenCalled();
		expect(angular.equals(scope.myData, fakeResult)).toBe(true);
	});

	it('3. should call getData when view is loaded', function(){
		var fakeResult = ['one', 'two', 'three'];
		spyOn(scope, 'getData');
		spyOn(myHttpSvc, 'getServerData').andCallFake(function(){
			return {
				then: function(callback){ callback(fakeResult); return this; },
				finally: function(callback){ return callback(this); }
			};
		});

		var viewTemplate = '<div ng-controller="myHttpController"></div>';
		$compile(viewTemplate)(scope);
		scope.$digest();
		expect(scope.getData);
	});

	it('4. should do logging when name property gets changed - $watch', function(){
		expect(scope.name).toBe('');
		spyOn(logMock, 'log');

		scope.name = 'Updated name';
		scope.$digest();

		expect(logMock.log).toHaveBeenCalledWith('Updated name');

	});

});