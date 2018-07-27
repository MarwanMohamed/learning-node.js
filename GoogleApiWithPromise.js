
const yargs = require('yargs');
const axios = require('axios');

const argv =  yargs.options({
	a: {
		describe: 'Address to featch weather for',
	    demand: true,
	    alias: 'address',
	    string: true
	}
}).help().alias('help', 'h').argv;

var encodedAddress = encodeURIComponent(argv.address);
var GoogleUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

axios.get(GoogleUrl).then((response) => {

	if (response.data.status === 'ZERO_RESULTS') {
		throw new Error('Unable to find that address.');
	} else if (response.data.status === 'OVER_QUERY_LIMIT') {
		throw new Error('You have exceeded your daily requests.');
	}

	var lat = response.data.results[0].geometry.location.lat;
	var lng = response.data.results[0].geometry.location.lng;
	var WeatherUrl = `https://api.darksky.net/forecast/42bda1bfcfbeb7bd348dc6254d6cbacb/${lat},${lng}`;
	var address = response.data.results[0].formatted_address;

	console.log( 'Address:', address);

	return axios.get(WeatherUrl);

}).then((results) => {
	var temperature = results.data.currently.temperature;
	var apparentTemperature = results.data.currently.apparentTemperature;

	console.log(`It's currently ${temperature}. It feels like ${apparentTemperature}`);

}).catch((e) => {
	if (e.code === 'ENOTFOUND') {
		console.log('Unable to connect to Google serves.');
	} else {
		console.log(e.message);
	}
});