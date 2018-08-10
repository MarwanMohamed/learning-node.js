const expect = require('expect');
const utils = require('./utils');

describe('Utils', () => {

	describe('#add', () => {
		it('should add two numbers', () => {
			let result = utils.add(33, 11);

			expect(result).toBe(44).toBeA('number');
		});

	});
	

	it('should multiply two numbers', () => {
		let result = utils.square(5);
		expect(result).toBe(25).toBeA('number');
		// if (result !== 25) {
		// 	throw new Error('value not correct');
		// }
	});


	it('should set firstname and lastname', () => {
		var user = {age : 24, city: 'Alexandria'}
		let result = utils.setName(user, 'Marwan Mohamed');
		expect(result).toInclude({
			firstname: 'Marwan',
			lastname: 'Mohamed',
		});
	});


	it('should async add two numbers', (done) => {
		let result = utils.asyncAdd(3, 4, (sum) => {
			expect(sum).toBe(7).toBeA('number');
			done();
		});
	});


	it('should async multiply two numbers', (done) => {
		let result = utils.asyncSquare(4, (sum) => {
			expect(sum).toBe(16).toBeA('number');
			done();
		});
	});


});