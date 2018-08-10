const {MongoClient} = require('mongodb');
const assert = require('assert');

const url = 'mongodb://localhost:27017';

const dbName = 'TodoApp';

MongoClient.connect(url, (err, db) => {

  	assert.equal(null, err);
  	console.log("Connected successfully to server");

  	const clinet = db.db(dbName);

	// clinet.collection('Todos').deleteMany({text : "therd document"}).then((result) => {
	//     console.log(result);
	//     console.log("Removed the document successfully");
	// });    


	// clinet.collection('Todos').deleteOne({text : "new things"}).then((result) => {
	//     console.log(result);
	//     console.log("Removed the document successfully");
	// });


	clinet.collection('Todos').findOneAndDelete({text : "to something"}).then((result) => {
	    console.log(result);
	    console.log("Removed the document successfully");
	});


  	db.close();
});
