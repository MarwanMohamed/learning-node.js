const request = require('supertest');
const expect = require('expect');

var app = require('../../service.js').app;

describe('Service', () => {
	it('should return response from get url', (done) => {
		request(app).get('/fortest')
		.expect((res) => {
			expect(res.body).toInclude({
				error: 'Page Not Found.'
			});
		})
		.expect(404)
		.end(done);
	});
});
