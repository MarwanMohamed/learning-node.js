const users = [{
	id: 1,
	name: 'Marwan',
	schoolId: 100	
}, {
	id: 2,
	name: 'Ahmed',
	schoolId: 150	
}];

const grades = [{
	id: 1,
	schoolId:100,
	grade: 86	
}, {
	id: 2,
	schoolId:150,
	grade: 100	
}, {
	id: 3,
	schoolId:100,
	grade: 80	
}];


const getUser = (id) => {
	return new Promise((res, rej) => {
		const user = users.find((user) => user.id === id);
		if (user) {
			res(user);
		} else {
			rej(`unable to find user with id ${id}`);
		}
	});
};

const getGrades = (schoolId) => {
	return new Promise((res, rej) => {
		res(grades.filter((grade) =>  grade.schoolId === schoolId));
	});
};

// const getStatus = (userId) => {
// 	let user;
// 	return getUser(userId).then((tempUser) => {
// 		user = tempUser;
// 		return getGrades(user.schoolId).then((grades) => {
// 			let average = 0;
// 			if (grades.length > 0) {
// 				average = grades.map((grade) => grade.grade).reduce((a, b) => a +b ) / grades.length
// 			}
// 			return `${user.name} has a ${average}% in the class.`
// 		});
// 	});
// }

const getAllStatus = async (userId) => {
	let user =  await getUser(userId);
	console.log(user);
	let grades = await getGrades(user.schoolId);
	let average = 0;
	if (grades.length > 0) {
		average = grades.map((grade) => grade.grade).reduce((a, b) => a +b ) / grades.length
	}
	return `${user.name} has a ${average}% in the class.`
}

// getUser(1).then((user) => { console.log(user) }).catch((e) => { console.log(e) });
// getGrades(100).then((grade) => { console.log(grade) }).catch((e) => { console.log(e) });
// getStatus(1).then((status) => { console.log(status) }).catch((e) => { console.log(e) });
getAllStatus(1).then((status) => { console.log(status) }).catch((e) => { console.log(e) });