describe('testing myMathSvc', function(){

	var svcInstance;

	beforeEach(function(){

		module('mySvcApp');

		// do injection in the argument of this 'function'
		inject(function($injector){
			svcInstance = $injector.get('myMathSvc');
		});
	});

	it('1. should add two values', function(){
		var x = 5, y = 7;
		var result = svcInstance.add(x, y);
		expect(result).toEqual(x+y);
	});

	it('2. should throw error when any of the operands isNaN', function(){
		var x = 5, y = 'FOO';
		
		expect(function(){ svcInstance.add(x, y)}).toThrow(new Error('invalid parameters'));
	});

	describe('testing divide method', function(){

		it('3. should throw error if operators are isNaN', function(){

			//ref: https://stackoverflow.com/a/27876020
			expect(function(){ svcInstance.divide('foo', 'bar')}).toThrow(new Error('invalid parameters'));

			expect(function(){ svcInstance.divide('foo', 5)}).toThrow(new Error('invalid parameters'));

			expect(function(){ svcInstance.divide(5, 'bar')}).toThrow(new Error('invalid parameters'));
		});

		it('4. should throw error if divisor is zero', function(){
			expect(function(){ svcInstance.divide(5, 0)}).toThrow(new Error('divide by zero error'));
		});

		it('5. should give me proper result when both operands are proper', function(){
			var op1 = 10, op2 = 2;

			var result = svcInstance.divide(op1, op2);
			expect(result).toEqual(5);
		});
	});

});