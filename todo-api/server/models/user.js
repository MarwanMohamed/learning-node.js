const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const _ = require('lodash');

var userSchema = mongoose.Schema({
	email: {
		type: String,
		required: true,
		trim: true,
		minlength: 1,
		unique: true,
		validate: {
			validator: validator.isEmail,
			message: '{VALUE} is not valid email'
		}
	},
	password: {
		type: String,
		required: true,
		minlength: 6
	},
	tokens: [{
		access: {
			type: String,
			required: true,
		},
		token:{
			type: String,
			required: true,
		}
	}]
});

//return id and email only
userSchema.methods.toJSON = function() {
	return _.pick(this.toObject(), ['_id', 'email']);
}

userSchema.methods.generateAuthToken = function() {
	var user = this;
	var access = 'access';
	var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();
	user.tokens.push({access, token});

	return user.save().then(() => {
		return token;
	});
}

userSchema.statics.findByToken = function(token) {
	var decoded;

	try {
		decoded = jwt.verify(token, 'abc123');
	} catch(e) {
		return Promise.reject();
	}

	return this.findOne({
		'_id': decoded._id,
		'tokens.token': token,
		'tokens.access': 'access'
	});
}

userSchema.methods.removeToken = function(token) {
	var user = this;
	return user.update({
		$pull: {
			tokens: { token }
		}
	})
}

userSchema.statics.findByCredentials = function(email, password) {
	var User = this;
	return User.findOne({email}).then((user) => {
		if (! user) {
			return Promise.reject();
		}

		return new Promise((resolve, reject) => {
			bcrypt.compare(password, user.password, (err, res) => {
				if (res) {
					resolve(user);
				} else {
					reject();
				}
			});
		});
	});
}

userSchema.pre('save', function(next) {
	if (this.isModified('password')) {
		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(this.password, salt, (err, hash) => {
				this.password = hash;
				next();
			});
		});
	} else {
		next();
	}

});



var User = mongoose.model('User', userSchema);

module.exports = { User }