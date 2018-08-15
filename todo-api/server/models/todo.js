var mongoose = require('mongoose');

var Todo = mongoose.model('Todo', {
	text: {
		type: String,
		required: true,
		minlength: 10,
		trim: true
	},
	completed: {
		type: Boolean,
		// required: true
	},
	completedAt: {
		type: Number,
		default: null
	},
});

module.exports = { Todo }
