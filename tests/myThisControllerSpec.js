describe('testing myThisController', function(){

	var $controller, $timeout, scope;
	var ctrl, getController;

	beforeEach(function(){
		module('mySvcApp');
		module('myApp');

		inject(function($injector){
			$controller = $injector.get('$controller');
			scope = $injector.get('$rootScope').$new();
			myMathSvc = $injector.get('myMathSvc');
			$timeout = $injector.get('$timeout');

			getController = function(){
				return $controller('myThisController', {
					'$scope': scope,
					'myMathSvc': myMathSvc,
					'$timeout': $timeout
				});
			};

			ctrl = getController();
		});

	});

	it('1. should load controller properly', function(){
		expect(ctrl).not.toBeNull();
		expect(ctrl).not.toBe(undefined);
		
		expect(ctrl.param1).toBe(0);
		expect(ctrl.param2).toBe(0);
	});

	it('2. should call math service to add operands user has provided', function(){
		var op1 = 5, op2 = 2, fakeResult = 7;
		spyOn(myMathSvc, 'add').andReturn(fakeResult);

		ctrl.param1 = op1;
		ctrl.param2 = op2;
		ctrl.addition();
		scope.$digest();

		expect(myMathSvc.add).toHaveBeenCalled();
		expect(myMathSvc.add).toHaveBeenCalledWith(ctrl.param1, ctrl.param2);
		expect(ctrl.result).toBe(fakeResult);
	});

	/*it('3. testing timeout', function(){
		var op1 = 5, op2 = 2, fakeResult = 7;
		spyOn(myMathSvc, 'add').andReturn(fakeResult);

		ctrl.param1 = op1;
		ctrl.param2 = op2;
		ctrl.delayedAddition();
		$timeout.flush();
		scope.$digest();

		expect(myMathSvc.add).toHaveBeenCalled();
		expect(myMathSvc.add).toHaveBeenCalledWith(ctrl.param1, ctrl.param2);
		expect(ctrl.result).toBe(fakeResult);

		$timeout.verifyNoPendingTasks();
	});*/
});