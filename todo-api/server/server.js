const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {authanticate} = require('./middleware/authanticate.js');
var {mongoose} = require('./db/mongoose.js');
var {Todo} = require('./models/todo.js');
var {User} = require('./models/user.js');

var app = express();

app.use(bodyParser.json());

app.get('/todos', authanticate, (req, res) => {
	Todo.find({_creator: req.user._id}).then((todos) => {
		res.send({todos})
	}, (e) => {
		res.status(404).send(e);
	});
});

app.post('/todos', authanticate, (req, res) => {

  var newTodo = new Todo({text: req.body.text, _creator: req.user._id});

  newTodo.save().then((docs) => {
    res.send(docs);
  }, (e) => {
    res.status(400).send(e);
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


// POST /users
app.post('/users', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);
    var user = new User(body);

    user.save().then(() => {
        return user.generateAuthToken();
    }).then((token) => {
        res.header('x-auth', token).send(user);
    }).catch((e) => {
        res.status(400).send(e);
    });
});

app.post('/users/login', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);

    User.findByCredentials(body.email, body.password).then((user) => {
        user.generateAuthToken().then((token) => {
            res.header('x-auth', token).send(user);
        });
    }).catch((e) => {
        res.status(400).send(e);
    });
});

app.delete('/users/me/token', authanticate, (req, res) => {
   req.user.removeToken(req.token).then(() => {
    console.log(1111111111111111);
        res.status(200).send();
   }, () => {
    console.log(2222222222222);
        res.status(400).send();
   });
});


app.get('/users/me', authanticate, (req, res) => {
   res.send(req.user);
});


app.listen(500, () => {
	console.log('Server is up on port 500');
});

module.exports = { app }
