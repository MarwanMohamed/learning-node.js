const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');

// var a = 'as';
// var hash = SHA256(a).toString();


var data = { id: 4 };

var token = jwt.sign(data, '123456');
console.log(token);

var decoded = jwt.verify(token, '123456');

console.log(decoded);

// var token = { data , hash: SHA256(JSON.stringify(data) + 'somesecret').toString()};


// resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();

// if (resultHash === token.hash) {
// 	console.log('Data was not changed');
// } else {
// 	console.log('Data was changed. do not trust!');
// }