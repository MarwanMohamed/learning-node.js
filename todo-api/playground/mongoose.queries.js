const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');

var id = '5b70c84b0d0fae2004798cdf';

Todo.find({
	'_id': id
}).then((todos) => {
	console.log('Todos:' , todos);
});

Todo.findOne({
	'_id': id
}).then((todo) => {
	console.log('Todo:' , todo);
});

Todo.findById(id).then((todo) => {
	console.log('Todo By ID:' , todo);
});