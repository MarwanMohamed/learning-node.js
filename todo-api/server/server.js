const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose.js');
var {Todo} = require('./models/todo.js');

var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {

	var newTodo = new Todo({text: req.body.text});

	newTodo.save().then((docs) => {
		res.send(docs);
	}, (e) => {
		res.status(400).send(e);
	});
});

app.get('/todos', (req, res) => {
	Todo.find().then((todos) => {
		res.send({todos})
	}, (e) => {
		res.status(404).send(e);
	});
});

app.get('/todos/:id/', (req, res) => {
	let id = req.params.id;

	if (! ObjectID.isValid(id)) {
		res.status(404).send();
	}

	Todo.findById(id).then((todo) => {
		if (! todo) {
			res.status(404).send();
		}
		res.send({todo});
	}).catch((e) => {
		res.status(404).send();
	});
});

app.delete('/todos/:id', (req, res) => {
  	var id = req.params.id;

  	if (!ObjectID.isValid(id)) {
    	return res.status(404).send();
  	}

  	Todo.findByIdAndRemove(id).then((todo) => {
    	if (!todo) {
      		return res.status(404).send();
    	}

    	res.send(todo);
  	}).catch((e) => {
    	res.status(400).send();
  	});
});



app.patch('/todos/:id', (req, res) => {
  	var id = req.params.id;
  	var body = _.pick(req.body, ['text', 'completed']);

  	if (!ObjectID.isValid(id)) {
    	return res.status(404).send();
  	}

  	if (_.isBoolean(body.completed) && body.completed) {
    	body.completedAt = new Date().getTime();
  	} else {
    	body.completed = false;
    	body.completedAt = null;
  	}		

  	Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
    	if (!todo) {
      		return res.send('no');
    	}

    	res.send({todo});
  	}).catch((e) => {
    	res.send('eee');
  	});
});


app.listen(600, () => {
	console.log('Server is up on port 600');
});

module.exports = { app }
