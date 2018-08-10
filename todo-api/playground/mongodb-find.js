const {MongoClient} = require('mongodb');
const assert = require('assert');

const url = 'mongodb://localhost:27017';

const dbName = 'TodoApp';

MongoClient.connect(url, (err, db) => {

  	assert.equal(null, err);
  	console.log("Connected successfully to server");

  	const clinet = db.db(dbName);

  	clinet.collection('Todos').find({text: 'therd documentt'}).toArray((err, docs) =>  {
        assert.equal(err, null);
        console.log("Found the following records");
        console.log(docs);
    });

  	db.close();
});
