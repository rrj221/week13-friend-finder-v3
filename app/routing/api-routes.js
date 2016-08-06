//ROUTES///////////////
exports.runRoutes = function (app, path, friends) {
	//show all friends
	app.get('/friends', function (req, res) {
		res.json(friends.friendsArray);
	});

	//new friend
	app.post('/friends', function (req, res) {
		var newFriend = req.body;
		friends.friendsArray.push(newFriend);

		//convert array to numbers
		friends.friendsArray.forEach(function (friend, i) {
			answersToNum(friend);
		});

		//FIND FRIEND and serve to browser
		res.json(friends.friendsArray[friends.friendFinder(friends.createDiffsArray(friends.friendsArray.length - 1))]);
	});
};

function answersToNum(obj) {
	for (var key in obj) {
		if (key === 'answers') {
			obj[key].forEach(function (answer, i) {
				obj[key][i] = parseInt(answer);
			});
		}
	}
}