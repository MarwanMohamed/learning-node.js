const request = require('request');

let getWeather = (lat, lng, callback) => {
	request({
	  url: `https://api.darksky.net/forecast/42bda1bfcfbeb7bd348dc6254d6cbacb/${lat},${lng}`,
	  json: true
	}, (error, response, body) => {
		if (error) {
			callback('Unable to connect to Forecast.io server.');
		}else if (response.statusCode === 400) {
			callback('Unable to featch weather.');
		}else if (response.statusCode === 200) {
			callback(undefined, {
				temperature: body.currently.temperature,
				apparentTemperature: body.currently.apparentTemperature,
			});
		}
	});
};

module.exports.getWeather = getWeather;
