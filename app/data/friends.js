//DATA////////////////
var friends = {
	friendsArray: [{
			name: 'Agree-able Person', 
			link: 'https://pbs.twimg.com/profile_images/3439323223/a4167927b491d857dac9d8b27f50b983.jpeg',
			answers: ['5', '5', '5', '5', '5', '5', '5', '5', '5', '5']
		}, {
			name: 'Disagree-able Person',
			link: 'http://pbs.twimg.com/profile_images/2959341443/0d8728a5fe41e23bb3287451ecaf25f0.png',
			answers: ['1', '1', '1', '1', '1', '1', '1', '1', '1', '1']
		}],
	friendFinder: function (diffs) {
		//initialize lowestDiff
		var bestFriendIndex = 0;
		if (diffs[0] === 'self') {
			bestFriendIndex = 1;
		}
		var lowestDiff = diffs[bestFriendIndex];

		//if the total difference is lower than the current one, set the 
		//lowest diff index to this one
		diffs.forEach(function (diff, i) {
			// console.log(i, diff)
			if (diff !== 'self') {
				if (diff < lowestDiff) {
					lowestDiff = diff;
					bestFriendIndex = i;
				}
			}
		});

		//because the indexes of the diffs array and the friends object line up,
		//this returns the index of the friends array that is the best friend
		return bestFriendIndex; 
	},		
	getDiff: function (lonelyArray, arrOfAnswerArrays) {
		var totalDiff = 0;

		//loops through and gets the difference in absolute values, then adds to total difference
		lonelyArray.forEach(function(object, k) {
			var diff = Math.abs(lonelyArray[k] - arrOfAnswerArrays[k]);
			totalDiff += diff;
		});
		return totalDiff;
	},						
	createDiffsArray: function (i) {				//returns an array that looks like this	
		var lonely = this.friendsArray[i].answers;		//[[1,1,1,2,4,2...], [3,2,4,2...],...,'self']
														//the indexes line up with the friends object
		var diffs = [];									//even if a friend besides the last one is passed in
		this.friendsArray.forEach(function(object, j) {
			if (i !== j) {
				var arrOfAnswerArrays = object.answers;
				console.log('wooooooo');
				diffs.push(friends.getDiff(lonely, arrOfAnswerArrays));
			} else {
				diffs.push('self');
			}
		});
		return diffs;
	}
};



module.exports.friends = friends;