const {MongoClient, ObjectId} = require('mongodb');
const assert = require('assert');

const url = 'mongodb://localhost:27017';

const dbName = 'TodoApp';

MongoClient.connect(url, (err, db) => {

  	assert.equal(null, err);
  	console.log("Connected successfully to server");

  	const clinet = db.db(dbName);

  	// clinet.collection('Todos').findOneAndUpdate({"_id" : new ObjectId("5b6cb499d26a004cf62b322a")}, {$set: {text: 'oneee'}}, () => {
   //     	assert.equal(err, null);
   //      console.log("Done updated");
   //  });

    clinet.collection('Todos').updateOne({text: 'oneee'}, {$set: {text: 'updated'}}, () => {
       	assert.equal(err, null);
        console.log("Done updated");
    });
  	db.close();
});
