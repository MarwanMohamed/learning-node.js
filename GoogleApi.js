
const yargs = require('yargs');
const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

const argv =  yargs.options({
		a: {
			describe: 'Address to featch weather for',
		    demand: true,
		    alias: 'address',
		    string: true
		}
	}).help().alias('help', 'h').argv;

geocode.geocodeAddress(argv.address, (errorMessage, results) => {
	if (errorMessage) {
		console.log(errorMessage);
	} else {
		console.log(results.address);
		weather.getWeather(results.lat, results.lng, (errorMessage, results) => {
			if (errorMessage) {
				console.log(errorMessage);
			} else {
				console.log(`It's currently ${results.temperature}. It feels like ${results.apparentTemperature}`);
			}
		});
	}
});

