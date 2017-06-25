describe('testing myMathController', function(){

	var $controller, scope;
	var ctrl, getController;
	var windowMock, logMock, myMathSvc;

	beforeEach(function(){
		// Step 1. load the modules we need
		module('mySvcApp');
		module('myApp');

		inject(function($injector){
			$controller = $injector.get('$controller');
			
			// Step 2. load/create external dependencies to inject
			scope = $injector.get('$rootScope').$new();
			myMathSvc = $injector.get('myMathSvc');

			windowMock = {
				alert: function(msg){}
			};
			logMock = {
				log:  function(msg){}
			};

    		// Step 3. inject the dependencies
			getController = function(){
				return $controller('myMathController', {
					'$scope': scope,
					'$window': windowMock,
					'$log': logMock,
					'myMathSvc': myMathSvc
				});
			};

			ctrl = getController();
		});

	});

	it('1. should load controller properly', function(){
		expect(ctrl).not.toBeNull();
		expect(ctrl).not.toBe(undefined);

		expect(scope.param1).toBe(0);
		expect(scope.param2).toBe(0);
	});

	it('2. should call math service to add operands user has provided', function(){
		
		// Step 4. prepare the data / set spies
		var op1 = 5, op2 = 2, fakeResult = 7;
		spyOn(myMathSvc, 'add').andReturn(fakeResult);

		scope.param1 = op1;
		scope.param2 = op2;
		scope.addition();
		scope.$digest();

    	// Step 5. now test the result we are expecting
		expect(myMathSvc.add).toHaveBeenCalled();
		expect(myMathSvc.add).toHaveBeenCalledWith(scope.param1, scope.param2);
		expect(scope.result).toBe(fakeResult);

		//other way to get call details
		expect(myMathSvc.add.calls.length).toBe(1);
		expect(myMathSvc.add.calls[0].args[0]).toBe(scope.param1);
		expect(myMathSvc.add.calls[0].args[1]).toBe(scope.param2);
		expect(myMathSvc.add.mostRecentCall.args[0]).toBe(scope.param1);
		expect(myMathSvc.add.mostRecentCall.args[1]).toBe(scope.param2);

		//ok, call it once more - want to see few more stuff
		scope.param1 = 123;
		scope.param2 = 234;
		scope.addition();
		scope.$digest();
		expect(myMathSvc.add.mostRecentCall.args[0]).toBe(123);
		expect(myMathSvc.add.mostRecentCall.args[1]).toBe(234);
		
		//do you want to change the fake call result to anything else??
		//no problem. We have got it covered
		myMathSvc.add.isSpy = false;
		spyOn(myMathSvc, 'add').andReturn(5000);
		
		expect(myMathSvc.add.calls.length).toBe(0);
		scope.addition();
		scope.$digest();
		expect(myMathSvc.add).toHaveBeenCalled();
		expect(myMathSvc.add.calls.length).toBe(1);
		expect(scope.result).toBe(5000);
	});

	describe('testing division operation', function(){

		it('3. should call math service to divide operands use has provided', function(){
			var op1 = 5, op2 = 2, fakeResult = 7;
			spyOn(myMathSvc, 'divide').andReturn(fakeResult);

			scope.param1 = op1;
			scope.param2 = op2;
			scope.division();
			scope.$digest();

			expect(myMathSvc.divide).toHaveBeenCalledWith(scope.param1, scope.param2);
			expect(scope.result).toBe(fakeResult);
		});

		it('4. should alert/log if operands are not provided properly', function(){
			var errorMsg = 'Fake Error Message';
			spyOn(myMathSvc, 'divide').andThrow(new Error(errorMsg));
			spyOn(windowMock, 'alert');
			spyOn(logMock, 'log');

			scope.param1 = 10;
			scope.param2 = 'abc';
			scope.division();
			scope.$digest();

			expect(myMathSvc.divide).toHaveBeenCalledWith(scope.param1, scope.param2);
			expect(windowMock.alert).toHaveBeenCalledWith(errorMsg);
			expect(logMock.log).toHaveBeenCalled();
		});
	});

});