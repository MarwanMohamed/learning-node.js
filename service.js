const express = require('express');
const app = express();
const hbs = require('hbs');
const fs = require('fs');

app.set('view engine', 'hbs');

app.use((req, res, next) => {
	let now = new Date().toString();
	let log = `${now} : ${req.method}  ${req.url}`;

	console.log(log);
	fs.appendFile('server.log', log + '\n', (error) => {
		if (error) {
			console.log('Cannot add log to the file');
		}
	});
	next();
});

// app.use((req, res, next) => {
// 	res.render('maintenence.hbs', {
// 		pageTitle: 'Mintenence Page',
// 	});
// });

app.use(express.static(__dirname + '/public/'));


hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
});

hbs.registerHelper('upperIt', (text) => {
	return text.toUpperCase();
});

app.get('/', (req, res) => {
	// res.send({
	// 	name: 'Marwan',
	// 	liks: ['coding', 'gym']
	// });

	res.render('home.hbs', {
		pageTitle: 'Home Page',
		welcome: 'Welcome to the website',
		// currentYear: new Date().getFullYear(),
	});
});

app.get('/about', (req, res) => {
	res.render('about.hbs', {
		pageTitle: 'About Page',
		// currentYear: new Date().getFullYear(),
	});
});



app.get('/fortest', (req, res) => {
	res.status(404).send({
		error: 'Page Not Found.',
		name : 'App V1.0.0'
	});

	
});


app.listen(3000, () => {
	console.log('Server is up on port 3000');
});

module.exports.app = app;