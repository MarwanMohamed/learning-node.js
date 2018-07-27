var newPromise = new Promise((resolve, reject) => {

	setTimeout(() => {
		resolve('yes its working now :)');
	}, 4000);
});

newPromise.then((message) => {
	console.log('success: ', message);
}, (errorMessage) => {
	console.log('failed: ', errorMessage);
});