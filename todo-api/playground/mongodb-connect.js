const {MongoClient} = require('mongodb');
const assert = require('assert');

const url = 'mongodb://localhost:27017';

const dbName = 'TodoApp';

MongoClient.connect(url, (err, db) => {

  	assert.equal(null, err);
  	console.log("Connected successfully to server");

  	const clinet = db.db(dbName);
  	// clinet.collection('Todos').insertOne({
  	// 	text: 'to something',
  	// 	completed: 1
  	// }, (err, result) => {
  	// 	assert.equal(err, null);
	  //   assert.equal(1, result.result.n);
	  //   assert.equal(1, result.ops.length);
	  //   console.log("Inserted 1 documents into the collection");
	  //   console.log(result.ops);
  	// });

  	db.close();
});
